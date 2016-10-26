'use strict';

// Your first function handler
module.exports.hello = (event, context, cb) => {
  cb(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// You can add more handlers here, and reference them in serverless.yml

var config = require('./config')

var Pusher = require('pusher')

var pusher = new Pusher(config.pusher)

module.exports.auth = (event, context, cb) => {

  const socket_id  = event.body.socket_id
  const channel_name = event.body.channel_name

  if(!(socket_id && channel_name))
    return cb(new Error('[500] socket and channel not provided'))

  cb(null, pusher.authenticate(socket_id, channel_name))

}
