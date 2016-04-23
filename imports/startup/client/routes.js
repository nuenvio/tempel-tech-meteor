import { Router } from 'meteor/iron:router';
import {Projects} from '/imports/api/projects/projects.js';

import '/imports/ui/pages/index/index.js'
import '/imports/ui/pages/users/signin/signin.js'
import '/imports/ui/pages/users/signup/signup.js'
import '/imports/ui/pages/users/home/home.js'
import '/imports/ui/pages/users/edit/edit.js'
import '/imports/ui/pages/projects/list/list.js'
import '/imports/ui/pages/projects/new/new.js'
import '/imports/ui/pages/projects/page/page.js'
import '/imports/ui/pages/projects/edit/edit.js'
import '/imports/ui/pages/projects/messages/messages.js'
import '/imports/ui/pages/users/page/page.js'


import '/imports/ui/pages/messages/pm/pm.js'
import '/imports/ui/pages/messages/pms-list/pms-list.js'

import '/imports/ui/layouts/main/main.js'


Router.route('/', function () {
  this.render('index');
}, {
  name: 'index'
});

Router.route('/signup', function () {
  if (Meteor.user()) {
    Router.go('home');
  }
  this.layout('main');
  this.render('signup');
}, {
  name: 'signup'
});

Router.route('/signin', function () {
  if (Meteor.user()) {
    Router.go('home');
  }
  this.layout('main');
  this.render('signin');
}, {
  name: 'signin'
});


Router.route('/user/:_id', function () {
  this.layout('main');
  this.render('userPage');
}, {
  name: 'userPage',
  waitOn: function () {
    return Meteor.subscribe('users',[this.params._id]);
  },
  data: function () {
    return Meteor.users.findOne({_id:this.params._id});
  }
});

Router.route('/messages', function () {
  this.layout('main');
  this.render('privateMessagesList');
}, {
  name: 'privateMessagesList',
  data: function () {
    return Meteor.users.findOne({_id:this.params._id});
  }
});

Router.route('/messages/:_id', function () {
  this.layout('main');
  this.render('privateMessage');
}, {
  name: 'privateMessage',
  data: function () {
    return Meteor.users.findOne({_id:this.params._id});
  }
});

Router.route('/home', function () {
  this.layout('main');
  this.render('home');
}, {
  name: 'home'
});

Router.route('/edit', function () {
  this.layout('main');
  this.render('editPage');
}, {
  name: 'editPage'
});


Router.route('/projects', function () {
  this.layout('main');
  this.render('projectsList');
}, {
  name: 'projectList',
  waitOn: function () {
    return Meteor.subscribe('projects');
  }
});

Router.route('/projects/new', function () {
  this.layout('main');
  this.render('projectsNew');
}, {
  name: 'projectsNew'
});

Router.route('/projects/:_id', function () {
  this.layout('main');
  this.render('projectsPage');
}, {
  name: 'projectsPage',
  waitOn: function () {
    return Meteor.subscribe('project', this.params._id);
  },
  data: function () {
    return Projects.findOne(this.params._id);
  }
});

Router.route('/projects/:_id/edit', function () {
  this.layout('main');
  this.render('projectEdit');
}, {
  name: 'projectEdit',
  waitOn: function () {
    return Meteor.subscribe('project', this.params._id);
  },
  data: function () {
    return Projects.findOne(this.params._id);
  }
});


Router.route('/projects/:_id/messages', function () {
  this.render('projectMessages');
}, {
  name: 'projectMessages',
  waitOn: function () {
    return [Meteor.subscribe('messages', this.params._id, 300),
      Meteor.subscribe('project', this.params._id)]
  },
  data: function () {
    return Projects.findOne(this.params._id);
  }
});