Meteor.publish('transactions', function() {
	return Transactions.find({});
})

Meteor.methods({
	'colorEmotions': function(emotion) {
		console.log(emotion);
	}
})