function getData(){ //to turn this into a method, have to run d3 on server side.
	var dataset = Transactions.find({userID:Meteor.userId()}).fetch(); //FIND TRANSACTIONS BY USER

	d3.select("#viz").selectAll("div")
	    .data(dataset)
		    .enter()
		    .append("div")
		    .attr("class", "bar")
		    .style("height", function(bar) {
		    	console.log(bar);
		        var barHeight = bar.intensity;
		        return barHeight + "px";
	    })
		    .style("background-color", function(bar) {
		    	var barColor = bar.emotion;
		    	switch(barColor) {
		    		case 'happy':
		    			return 'brown'
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
		    	}
		    })
	
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
})
Template.visualization.onRendered(function(){
	getData();
})



Template.canvas.onRendered(function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	var template = document.getElementById("canvas");
	template.appendChild( renderer.domElement ); 
	console.log(renderer.domElement); 

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;
	function render() {
		requestAnimationFrame( render );
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1; 
		renderer.render( scene, camera );
	}
	render();
})

