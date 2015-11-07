Template.form.events({
	"submit form" : function(e,tmpl) {
		e.preventDefault();
		console.log("submit event");
		var emotion = $('#emotion').val();
		 console.log(emotion);
		 var intensity = $('#intensity').val();

		 console.log(intensity);
		 console.log(Meteor.user().emails.address);

		Transactions.insert({
			user: Meteor.user().emails[0].address,
			emotion: emotion,
			intensity: intensity,
			createdAt: new Date()
		})
	}
})

