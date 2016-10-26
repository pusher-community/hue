'use strict';

const Pusher = require('pusher')
const pusher = new Pusher(require('./config').pusher)

module.exports.auth = (event, context, cb) => {

  const socket_id  = event.body.socket_id
  const channel_name = event.body.channel_name

  if(!(socket_id && channel_name))
    return cb(new Error('[500] socket and channel not provided'))

  cb(null, pusher.authenticate(socket_id, channel_name))

}
