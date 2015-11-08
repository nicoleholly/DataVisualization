
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
    for (i=0; i<dataset.length; i++) {
    	var data = dataset[i]
    	console.log(data.intensity);
    }
});


