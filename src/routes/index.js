const newRouter = require('./news')


function route(app){
    
    app.use('/news', newRouter)
    
    app.get('/', (req, res) => {
        res.render('home')   
    })
    
    
}

module.exports = route
