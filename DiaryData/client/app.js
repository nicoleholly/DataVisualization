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

Template.visualization.helpers({
	visualization: function(){	
		return Transactions.find({userID:Meteor.userId()});
	}
	
})

Template.visualization.onRendered(function(){
	console.log('rendered');
	var emotion = $('.colorEmotion');
	for (i=0;i<emotion.length; i++){
		console.log(emotion[i].innerHTML);
	
	}
})