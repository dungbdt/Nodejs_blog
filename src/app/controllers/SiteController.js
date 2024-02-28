const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')


class SiteController {
    
    // [GET] /
    index(req, res, next) {

        // try {
        //     const courses =  await Course.find({})
        //         res.json(courses); 
        // } catch (error) {
        //     res.status(400).json({ error: 'Error!!!' });
        // }
        //Dùng promises sẽ thay thế cho await, lúc đó không cần async try nữa 
        //Dùng lean() thay cho mutipleMongooseToObject(courses)
        Course.find({}).lean()
            .then(courses => {
                res.render('home', { 
                    courses
                })
            })
            .catch(next)



        //
    }
    // [GET] /search
    search(req, res, next) {
        res.render('search')
    }

}


module.exports = new SiteController


