
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
    console.log(dataset);


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
		    	console.log(bar.emotion);
		        var barColor = bar.emotion;
		        switch(barColor){
		        	case "happy":
		        		return "yellow";
		        		break;
		        	case "sad":
		        		return "blue";
		        		break;	
		        }
	    });



});


