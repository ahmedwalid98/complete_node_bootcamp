const EventEmitter = require('events')

class Sales extends EventEmitter {
  constructor() {
    super()
  }
}

const myEmitter = new Sales()

myEmitter.on('newSale', () => console.log('new sale here'))
myEmitter.on('newSale', stock => console.log(`${stock} items left in stock`))

myEmitter.emit('newSale', 9)