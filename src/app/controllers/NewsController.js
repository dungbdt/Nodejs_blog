class NewsController {
    
    // [GET] /new
    index(req, res) {
        res.render('news')
    }
    // [GET] /new/:slug
    show(req, res, next) {
        res.send('New details')
    }

}


module.exports = new NewsController


