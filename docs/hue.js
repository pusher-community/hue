/*
  TODO:
   * Throttle rather than debounce for quicker updates
   * Persistance
   * Storage (backend)
*/

var hue = (function(){

  var pusher = new Pusher('58bc4d61a110f2e2f5be', {
    cluster: 'eu',
    encrypted: true,
    authEndpoint: 'https://7msnbzsc3e.execute-api.eu-west-1.amazonaws.com/dev/auth'
  })


  // functions listening for colour change
  var listeners = []


  var channel = pusher.subscribe('private-hue')

  channel.bind('client-change', function(data) {

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](data.color)
    }

  })

  function debounce(fn, time, timer) {
    time = time || 150
    return function(arg){
      clearTimeout(timer)
      timer = setTimeout(fn, time, arg)
    }
  }

  var trigger = debounce(function(value){
    channel.trigger('client-change', {
      color: value
    })
  })

  return {
    listen: function(fn){
      listeners.push(fn)
    },

    set: function(color){
      trigger(color)

      // update listeners
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](color)
      }
    }
  }
})()
