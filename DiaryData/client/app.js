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
	console.log("render");
    var dataset = Transactions.find().fetch();
    console.log(dataset);
});