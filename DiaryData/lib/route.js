
Router.route('/', {
    // options for the route
    template: 'home',
    waitOn:function(){
		return Meteor.subscribe('transactions');
	},
	data: function(){
		return Transactions.find({userID:Meteor.userId()}).fetch();
	},
});

