const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')


class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug }).lean()
            .then(course => { 
                res.render('courses/show', {course})
            })
            .catch(next)
        
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    async store(req, res, next) {
        // res.json(req.body)
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?s…EIYAXABwAEG&rs=AOn4CLCML-byK5TPhWN_-ZuZal4h5KasYw`
        const course = new Course(req.body)
        await course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(course => 
                res.render('courses/edit', { course }))
            .catch(next)
    }

    // [PUT] /courses/:id
    async update(req, res, next) {
        await Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next) 
    }

    // [DELETE] /courses/:id
    async destroy(req, res, next) {
        await Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    async forceDestroy(req, res, next) {
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    async restore(req, res, next) {
        await Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

     // [POST] /courses/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                await Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is invalid!'})
        }
    }

}


module.exports = new CourseController


