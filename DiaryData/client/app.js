initialized = 0;
D3initialized = 0;

function init(dataset){
	console.log('initializing');
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 800;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff, 1);

	template = document.getElementById("canvas");
	template.appendChild( renderer.domElement ); 

	var group = new THREE.Group();
	for ( var i = 0; i < dataset.length; i++) {
		var size = (dataset[i].intensity/95)
		var geometry = new THREE.DodecahedronGeometry( size, 0);
		var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion), wireframe: false, transparent: true, opacity: 0.5} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.random() * 10 - 5;
		mesh.position.y = Math.random() * 10 - 5;
		mesh.position.z = Math.random() * 10 - 5;

		mesh.rotation.x = Math.random() * 2 * Math.PI;
		mesh.rotation.y = Math.random() * 2 * Math.PI;

		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();

		group.add( mesh );
	}

	scene.add( group );

	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true, transparent: true, opacity: 0.8} );
	var cubeGeometry = new THREE.DodecahedronGeometry( 1,0);
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	scene.add( cube );

}

function three(dataset){
	var container, stats;
	var geometry, group;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	if (initialized == 0) {
		init( dataset );
		initialized += 1;
	}
	else {
		for( var i = this.scene.children.length - 1; i >= 0; i--) {
			obj = scene.children[i];
			scene.remove(obj); 
		}

		var group = new THREE.Group();
		for ( var i = 0; i < dataset.length; i++) {
			var size = (dataset[i].intensity/95)
			var geometry = new THREE.DodecahedronGeometry( size, 0);
			var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion), wireframe: false, transparent: true, opacity: 0.5} );
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 10 - 5;
			mesh.position.y = Math.random() * 10 - 5;
			mesh.position.z = Math.random() * 10 - 5;

			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();

			group.add( mesh );
		}

		scene.add( group );

		var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true, transparent: true, opacity: 0.8} );
		var cubeGeometry = new THREE.DodecahedronGeometry( 1,0);
		cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
		scene.add( cube );
	}

	camera.position.z = 5;

	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) * .1;
		mouseY = ( event.clientY - windowHalfY ) * .1;
	}

	function render() {
		requestAnimationFrame( render );
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02; 

		//cube.rotation.z += 0.02;

		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
		camera.position.z = 5;

		camera.lookAt( scene.position );
		
		renderer.render( scene, camera );
	}
	render();
	
}


function D3chart ( dataset ) {
	var svg = d3.select("#viz")
	.append("svg")
	.attr("width", 1000)
	.attr("height", 1000);

	svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")

	.attr("cx", function(d) {
		
		return d.createdAt.getSeconds();
	})
	.attr("cy", function(d) {
		return d.createdAt.getMilliseconds();
	})
	.attr("r", function(d){
		return d.intensity/2;
	})
	.style("fill", function(d){
		return switchEmotionColor(d.emotion);
	});
	svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	.text(function(d) {
		console.log(d.notes);
		return d.notes;
	})
	.attr("x", function(d) {
		return d.createdAt.getSeconds();
	})
	.attr("y", function(d) {
		return d.createdAt.getMilliseconds();
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "#c97874");
}


function getData(dataset){ 

	if (D3initialized == 0) {
		 D3chart (dataset);
		D3initialized += 1;
	}

	else {
	  	// Clears the SVG canvas.
    	d3.select('svg').remove();
    	D3chart ( dataset );
	}

	/**d3.select("#viz").selectAll("div")
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
**/
};

function switchEmotionColor(switchEmotion) {
	switch(switchEmotion) {
		case 'happy':
		return '#ebd0e9'
		break;
		case 'sad': 
		return '#5949e8'
		break;
		case 'angry':
		return '#ef94b1'
		break;
		case 'excited':
		return '#43fc7c'
		break;
		case 'guilt':
		return '#e9f5a3'
		break;
		case 'relaxed':
		return '#bb7fe9'
		break;
		case 'fear':
		return '#eef970'
		break;
		case 'tired':
		return '#78fcc1'
		break;
		case 'apathetic':
		return '#eefcf1'
		break;
	}
}

Template.form.events({
	"submit form" : function(e) {
		e.preventDefault();
		var emotion = $('#emotion').val();
		var intensity = $('#intensity').val();
		var notes = $('.notes').val();

		Transactions.insert({
			userID: Meteor.userId(),
			emotion: emotion,
			intensity: intensity,
			notes: notes,
			createdAt: new Date()
		})

	//	getData();
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
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
});

