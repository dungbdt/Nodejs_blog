const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const sortMiddware = require('./app/middleware/SortMiddleware')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

const route = require('./routes')
const db = require('./config/db')

//connect to db
db.connect()

//http logger
app.use(morgan('combined'))
//applie middleware
app.use(express.urlencoded({ extended: true }))
//applie json
app.use(express.json())

app.use(methodOverride('_method'))

// custom middleware
app.use(sortMiddware)

//template engine
app.engine(
    '.hbs', 
    engine({ 
            defaultLayout: 'main', 
            extname: '.hbs',
            helpers: require('./helpers/handlebar'),
        }),
    )
app.set('views', path.join(__dirname, 'resouces', 'views'))
app.set('view engine', '.hbs')


// routes init
route(app)




app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})



