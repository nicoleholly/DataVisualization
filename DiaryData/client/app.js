function getData(){ //to turn this into a method, have to run d3 on server side.
	var dataset = Transactions.find({userID:Meteor.userId()}).fetch(); //FIND TRANSACTIONS BY USER

	d3.select("#viz").selectAll("div")
	    .data(dataset)
		    .enter()
		    .append("div")
		    .attr("class", "bar")
		    .style("height", function(bar) {
		  
		        var barHeight = bar.intensity;
		        return barHeight + "px";
	    })
		    .style("background-color", function(bar) {
		    	var barColor = bar.emotion;
		    	return barColor = switchEmotionColor(barColor);
		    })
};

function switchEmotionColor(switchEmotion) {
	    switch(switchEmotion) {
			case 'happy':
				return 'yellow'
				break;
			case 'sad': 
				return 'blue'
				break;
			case 'angry':
				return 'red'
				break;
			case 'excited':
				return 'orange'
				break;
			case 'guilt':
				return 'grey'
				break;
			case 'relaxed':
				return 'purple'
				break;
			case 'fear':
				return 'black'
				break;
			case 'tired':
				return 'green'
				break;
			case 'apathetic':
				return 'dark-blue'
				break;
		}
}

function switchColorHSL(switchEmotion) {
	switch(switchEmotion){
			case 'happy':
				return '.59'
				break;
			case 'sad': 
				return '1.64'
				break;
			case 'angry':
				return '0'
				break;
			case 'excited':
				return '.3'
				break;
			case 'guilt':
				return 'grey'
				break;
			case 'relaxed':
				return '3.08'
				break;
			case 'fear':
				return '3.60'
				break;
			case 'tired':
				return '92'
				break;
			case 'apathetic':
				return '2.51'
				break;
	}
}

Template.form.events({
	"submit form" : function(e) {
		e.preventDefault();
		var emotion = $('#emotion').val();
		var intensity = $('#intensity').val();

		Transactions.insert({
			userID: Meteor.userId(),
			emotion: emotion,
			intensity: intensity,
			createdAt: new Date()
		})

		getData();
		
	}
});

Template.visualization.onRendered(function(){
	getData();
})

Template.canvas.onRendered(function(){
	var dataset = Transactions.find({userID:Meteor.userId()}).fetch(); //FIND TRANSACTIONS BY USER

	var container, stats;
	var geometry, group;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	 


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 700;


	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff, 1);

	var template = document.getElementById("canvas");
	template.appendChild( renderer.domElement ); 
	console.log(renderer.domElement); 

	var group = new THREE.Group();
	for ( var i = 0; i < dataset.length; i++) {
		var size = (dataset[i].intensity/95)
	//	var geometry = new THREE.DodecahedronGeometry( size, 0);
 		// material
  		material = new THREE.ParticleBasicMaterial({
    		size: 2,
    		vertexColors: THREE.VertexColors
  		})

  		// geometry
  		var geometry = new THREE.TorusKnotGeometry(10, 200, 500, 100);

  		// vertex colors
  		var colors = [];
  		for (var i = 0; i < geometry.vertices.length; i++) {
    		// blue color
    		colors[i] = new THREE.Color();
    		colors[i].setHSL(0.5, Math.random(), Math.random()); //to change to white:set third value to 1,random color:set first value to random
  		}

  		geometry.colors = colors;

	//	var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion), wireframe: false, transparent: true, opacity: 0.6} );
		var mesh = new THREE.PointCloud( geometry, material );
			mesh.position.x = Math.random() * 10 - 5;
			mesh.position.y = Math.random() * 10 - 5;
			mesh.position.z = Math.random() * 10 - 5;

	//		mesh.rotation.x = Math.random() * 2 * Math.PI;
	//		mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			group.add( mesh );
		}

	scene.add( group );

	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true, transparent: true, opacity: 0.4} );
	var cubeGeometry = new THREE.DodecahedronGeometry( 1, 1);
	var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	scene.add( cube );

	scene.add( new THREE.AmbientLight( 0x404040 ) );

	camera.position.z = 5;

	function render() {
		requestAnimationFrame( render );
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02; 
		//cube.rotation.z += 0.02;

	//	group.rotation.x += 0.02;
	//	group.rotation.y += 0.02;
	//	group.rotation.z += 0.02;

		camera.position.x += ( mouseX - camera.position.x ) * .005;
		camera.position.y += ( - mouseY - camera.position.y ) * .005;

		camera.lookAt( scene.position );
		
		renderer.render( scene, camera );
	}


	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) * .1;
		mouseY = ( event.clientY - windowHalfY ) * .1;
	}

	render();
})
