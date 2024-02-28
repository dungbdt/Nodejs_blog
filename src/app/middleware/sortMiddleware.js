

module.exports = function sortMiddleware (req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default',

    }

    if(req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true
        // res.locals._sort.type = req.query.type
        // res.locals._sort.column = req.query.column

        // Object.assign dùng để hợp nhất các Object từ phải sang trái với nhau nếu trùng key: value
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,

        })
    }

    next()
}