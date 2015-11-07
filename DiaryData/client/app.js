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
	},

	colorEmotion: function() {
		var emotion = $('.currentEmotion').val();
		console.log(emotion);
		console.log(this.find("[currentEmotion]"));
		switch(emotion) {
			case 'happy':
				return 'tangerine'
				break;
			case 'sad':
				return 'grey'
				break;
			case 'angry':
				return 'red'
				break;
			case 'relaxed':
				return 'blue'
				break;
			case 'fear':
				return 'black'
				break;
			case 'excited':
				return 'yellow'
				break;
			case 'guilt':
				return 'white'
				break;
		}
	}
})

