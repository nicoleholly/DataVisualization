

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true, transparent: true, opacity: 0.8} );
var cubeGeometry = new THREE.DodecahedronGeometry( 1,0);
var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );


function three(){

	var template = document.getElementById("canvas");
	template.appendChild( renderer.domElement ); 

	
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
		return barColor = switchEmotionColor(barColor);
	})
	
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
	console.log("rendered");
	three();

	this.autorun(function() { 
		console.log("rerun");
		var dataset = Template.currentData();
		var geometry, group;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		


		
		var group = new THREE.Group();
		console.log(dataset.length);
		for ( var i = 0; i < dataset.length; i++) {
			console.log(dataset[i].intensity);
			var lastEmotion = dataset[dataset.length-1];
			var size = lastEmotion.intensity/95;
			var geometry = new THREE.DodecahedronGeometry( size,0);
			var material = new THREE.MeshBasicMaterial( { color: switchEmotionColor(dataset[i].emotion),  transparent: true, opacity: 0.5} );
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 10 - 5;
			mesh.position.y = Math.random() * 10 - 5;
			mesh.position.z = Math.random() * 10 - 5;

			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			
			scene.add(mesh);

			}

			scene.add( group );


	camera.position.z = 5;




	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) * .1;
		mouseY = ( event.clientY - windowHalfY ) * .1;
	}

	function render() {
		requestAnimationFrame( render );
		cube.rotation.x = 0.02;
		cube.rotation.y = 0.02; 
		//cube.rotation.z += 0.02;


		camera.position.x += ( mouseX - camera.position.x ) * .01;
		camera.position.y += ( - mouseY - camera.position.y ) * .01;

		camera.lookAt( scene.position );
		
		renderer.render( scene, camera );
	}
	render();
	

	})
})
Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
