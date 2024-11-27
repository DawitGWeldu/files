const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false

const hostname = 'ittihadagency.com'

const port = 443

const app = next({ dev })

const handle = app.getRequestHandler()



app.prepare().then(() => {

  createServer(async (req, res) => {

    try {

      const parsedUrl = parse(req.url, true)
      console.log("Parsed URL: ", parsedUrl)
      await handle(req, res, parsedUrl)

    } catch (err) {

      console.error('Error occurred handling', req.url, err)

      res.statusCode = 400

      res.end('internal server errooor')

    }

  }).listen(port, (err) => {

    if (err) throw err

    console.log(`> Ready on http://${hostname}`)

  })

})