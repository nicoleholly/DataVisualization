Router.configure({
	layoutTemplate: 'applicationLayout',
	yieldRegions:{
		'nav':{to:'nav'}
	},

});

Router.route('/', {
    // options for the route
    name:'home',
    layout:'applicationLayout',
    template:'home',
    waitOn:function(){
		return Meteor.subscribe('transactions');
	},
	data: function(){
		return Transactions.find().fetch();
	},
});


Router.route('/visualization',{

	name:'visualization',
	path: '/visualization',
	layout:'applicationLayout',
	waitOn:function(){
		return Meteor.subscribe('transactions');
	},
	data: function(){
		return Transactions.find().fetch();
	},
	template:'visualization'
})

Router.route('/canvas',{

	name:'canvas',
	path: '/canvas',
	layout:'applicationLayout',
	waitOn:function(){
		return Meteor.subscribe('transactions');
	},
	data: function(){
		return Transactions.find().fetch();
	},
	template:'canvas'
})