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

		var dataset = Transactions.find().fetch(); //FIND TRANSACTIONS BY USER

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
		    	}
		    })
	}

})

Template.visualization.onRendered( function(){ //MAKE THIS TEMPLATE REACTIVE
    
});
/*
Template.canvas.onRendered(function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;
	function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	render();
})
*/
