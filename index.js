'use strict'
const Trailpack = require('trailpack')
const SocketIO = require('socket.io')
const _ = require('lodash')

module.exports = class Realtime extends Trailpack {
  validate() {
    return Promise.resolve()
  }

  configure() {
    return Promise.resolve()
  }

  initialize() {
    return new Promise((res, rej) => {
      this.app.once('webserver:http:ready', (httpServer) => {
        if (Array.isArray(httpServer)) {
          httpServer = httpServer[0]
        }
        const config = _.get(this.app.config, 'realtime', { options: {} })
        this.app.sockets = new SocketIO(httpServer, Object.assign({}, config.options))
        res()
      })
    })
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}
