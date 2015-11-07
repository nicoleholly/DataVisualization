Meteor.publish('transaction', function() {
	return Transaction.find({})
})
