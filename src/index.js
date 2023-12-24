const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')

//http logger
app.use(morgan('combined'))

//template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resouces/views'))


// routes init
route(app)



app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})