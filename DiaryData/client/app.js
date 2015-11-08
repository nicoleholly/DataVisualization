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
	}
})

Template.visualization.onRendered( function(){
    var dataset = Transactions.find().fetch();

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
		    	}
		    })
});

Template.canvas.onRendered( function(){


})

