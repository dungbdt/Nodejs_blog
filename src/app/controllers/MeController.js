const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')


class MeController {

    // [GET] me/stored/coures
    storedCourses(req, res, next) {
        
        Promise.all([Course.find({}).sortable(req).lean(), 
            Course.countDocumentsWithDeleted({deleted:true})]) // khác video
            .then(([courses, deletedCount])=>
                res.render('me/stored_courses', {
                    deletedCount,
                    courses,
                })
            ) 
            .catch(next)
        

        // // Đếm các phần tử đã xoá 
        // Course.countDocumentsWithDeleted({deleted:true})
        //     .then((deletedCount) => {

        //     })
        //     .catch((next))

            // render các document lên trang web
        // Course.find({}).lean()
        //     .then(courses => 
        //         res.render('me/stored_courses', {courses} ))
        //     .catch(next)
        
    }
     // [GET] me/trash/coures
    trashCourses(req, res, next) {
        Course.findWithDeleted( {deleted: true} ).lean()  // khác video
            .then(courses => 
                res.render('me/trash_courses', {courses} ))
            .catch(next)
    }

}


module.exports = new MeController

