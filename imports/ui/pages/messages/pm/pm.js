import './pm.html';
import { PrivateMessages } from  '/imports/api/privateMessages/pms';

Template.privateMessage.helpers({
  messages: function(){
    return PrivateMessages.find({$or: [{authorId: this._id}, {recipientId: this._id}]},{sort:{createdAt:1}})
  },
  mine: function () {
    return this.authorId == Meteor.userId();
  },
  authorName: function () {
    return Meteor.users.findOne({_id: this.authorId}).profile.name
  },
  userpic: function () {
    return Meteor.users.findOne({_id: this.authorId}).profile.photo;
  }
});


Meteor.autosubscribe(function() {
  PrivateMessages.find().observe({
    added: function(item){
      $('.messages-list').animate({scrollTop: $(".messages-list")[0].scrollHeight});
    }
  });
});

Template.privateMessage.onRendered(function () {
  $('.messages-list').animate({scrollTop: $(".messages-list")[0].scrollHeight});
});


Template.privateMessage.events({
  'click #send': function () {
    var message = $('[name=message]').val();
    console.log(this._id);
    Meteor.call('sendPrivateMessage', this._id, message);
    $('[name=message]').val('');
  }
});