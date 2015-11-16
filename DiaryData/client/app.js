function three(dataset){
	var container, stats;
	var geometry, group;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 135, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 800;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff, 1);

	var template = document.getElementById("canvas");
	template.appendChild( renderer.domElement ); 
	console.log(renderer.domElement); 
	console.log(dataset.length);

	var group = new THREE.Group();
	for ( var i = 0; i < dataset.length; i++) {
		var size = (dataset[i].intensity/12)
		var geometry = new THREE.DodecahedronGeometry( size, 0);
		var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion)['name'], wireframe: false, transparent: true, opacity: 0.5} );
		var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 18 + 5;
			mesh.position.y = Math.random() * 18 + 5;
			mesh.position.z = Math.random() * 18 + 5;

			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();

			group.add( mesh );
		}

	scene.add( group );
/*		
	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true, transparent: true, opacity: 0.8} );
	var cubeGeometry = new THREE.DodecahedronGeometry( 1,0);
	var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	scene.add( cube );
*/

	var centerGeometry = new THREE.TorusKnotGeometry(1, 20, 50, 10);

	// vertex colors
  	var colors = [];
  	for (var j = 0; j < centerGeometry.vertices.length; j++) {
    	// blue color
    	colors[j] = new THREE.Color();
    //	var currentHSL = (switchEmotionColor(dataset[i].emotion)['hsl']);
    	colors[j].setHSL(0.5, Math.random(), Math.random()); //to change to white:set third value to 1,random color:set first value to random
  		
  		centerGeometry.colors = colors;
	}	
		//var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion),  transparent: true, opacity: 0.5} );
		
	// material
  	var centerMaterial = new THREE.PointCloudMaterial({
    	size: .1,
    	vertexColors: THREE.VertexColors
  	});

	var center = new THREE.PointCloud( centerGeometry, centerMaterial );

	scene.add(center);

		//mesh.size(size);
/*			mesh.position.x = Math.random() * 25 - 15;
			mesh.position.y = Math.random() * 25 - 15;
		//	mesh.position.z = Math.random() * 10 - 5;

		//	mesh.rotation.x = Math.random() * 2 * Math.PI;
		//	mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			group.add( mesh );
		}

		console.log(group.children.length)
*/


	scene.add( new THREE.AmbientLight( 0x404040 ) );

	camera.position.z = 5;

	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) * .04;
		mouseY = ( event.clientY - windowHalfY ) * .04;
	}

	function render() {
		requestAnimationFrame( render );
		center.rotation.x += 0.02;
		center.rotation.y += 0.02; 

		//cube.rotation.z += 0.02;

		camera.position.x += ( mouseX - camera.position.x ) * .05 + 1.75;
		camera.position.y += ( - mouseY - camera.position.y ) * .05 + 1.75;
		camera.position.z = 5;

		camera.lookAt( scene.position );
		
		renderer.render( scene, camera );
	}
	render();
	
}



function getData(dataset){ 
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
		    	return barColor = switchEmotionColor(barColor)['name'];
		    })
	
};

function switchEmotionColor(switchEmotion) {
	    switch(switchEmotion) {
			case 'happy':
				return ({
					'name': 'yellow', 
					'hsl': [0.5, Math.random(), Math.random()]
				})
				break;
			case 'sad': 
				return ({
					'name': 'blue',
					'hsl': [1.64, Math.random(), Math.random()]
				})
				break;
			case 'angry':
				return ({
					'name': 'red', 
					'hsl': [0, Math.random(), Math.random()]
				})
				break;
			case 'excited':
				return ({
					'name': 'orange', 
					'hsl': [.3, Math.random(), Math.random()]
				})
				break;
			case 'guilt':
				return ({
					'name':'grey', 
					'hsl': [Math.random(), 0, .48]
				})
				break;
			case 'relaxed':
				return ({
					'name': 'purple', 
					'hsl': [3.08, Math.random(), Math.random()]
				})
				break;
			case 'fear':
				return ({
					'name': 'black', 
					'hsl': [3.6, Math.random(), Math.random()]
				})
				break;
			case 'tired':
				return ({
					'name': 'green', 
					'hsl': [.92, Math.random(), Math.random()]
				})
				break;
			case 'apathetic':
				return ({
					'name':'dark-blue', 
					'hsl': [0, 0, 0]
				})
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
	this.autorun(function() { 
		var dataset = Template.currentData();
		getData(dataset);
	})
})


Template.canvas.onRendered(function(){
	this.autorun(function() { 
	var dataset = Template.currentData();
	three(dataset);
	})
})

 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

