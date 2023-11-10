const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./module/reqplaceTemplate');
const slugify = require('slugify');
// blocking synchronous
// const output = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(output)

// const input = `What we know about avocado ${output} \n Created on: ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', input)
// console.log('file written')

// non blocking
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   console.log(data1)
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3)
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => console.log('file has been written'))
//     })
//   })
// })

//////////////////////////////
// server


const overviewTemplat = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const cardTemplat = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const productTemplat = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const productData = JSON.parse(data)
const slugs = productData.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview'){
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    
    const cards = productData.map(el => replaceTemplate(cardTemplat, el)).join('')
    const output = overviewTemplat.replace(/{%PRODUCT_CARDS%}/g, cards)
    res.end(output)
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    const product = productData[query.id]
    const output = replaceTemplate(productTemplat, product)
    res.end(output)
  } else if (pathname === '/api'){
    res.writeHead(200, {
      'Content-type': 'application/json'
    })
    res.end(data)
  } else {
    res.writeHead(404, {
      'Contenet-type': 'text/html'
    })
    res.end('<h1>Not Found</h1>')
  }
});

server.listen(3000, '127.0.0.1', () => console.log('Running'))