
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

    for (i=0; i<dataset.length; i++) {
    	var data = dataset[i]
    	console.log(data.intensity);
    	var bar = data.intensity;
		d3.select("#viz").selectAll("div")

		    .data(dataset)
		    .enter()
		    .append("div")
		    .attr("class", "bar")
		    .style("height", function(bar) {
		        var barHeight = bar;
		        return barHeight + "px";
	    });
	}

});


