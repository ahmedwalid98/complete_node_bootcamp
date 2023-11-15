const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  // solution 1
  // fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //   if (err) console.log(err)
  //   res.end(data)
  // })
  
  // solution 2
  // const readable = fs.createReadStream('./test-file.txt')
  // readable.on('data', chunk => {
  //   res.write(chunk)
  // })
  // readable.on('end', () => res.end())
  // readable.on('error', () => {
  //   res.statusCode = 500
  //   res.end("not found")
  // })
  
  // solution 3
  const readable = fs.createReadStream('./test-file.txt')
  readable.pipe(res)
})

server.listen(3000, '127.0.0.1', () => console.log('app is running'))