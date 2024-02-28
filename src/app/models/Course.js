
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema

const CourseSchema = new Schema(
    {
    name: { type: String, maxLength:255, require: true, default: '' },
    description: { type: String, maxLength:600},
    image: { type: String, maxLength:255},
    videoId: { type: String, require: true},
    level: { type: String, maxLength:255},
    //unique dùng để tránh trùng lặp slug
    slug: { type: String, slug: 'name', unique: true,},
    }, 
    {
    //mongoose sẽ tự thêm createAt và updatedAT vào
    timestamps: true,
    },
)

//Custom query helpers
CourseSchema.query.sortable = function(req){
    if (req.query.hasOwnProperty('_sort')){
        const isValidType =  ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}


// Add plugin
mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete, {
    deletedAt : true, 
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', CourseSchema)

