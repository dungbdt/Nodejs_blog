const Handlebars = require('handlebars')


module.exports = {
    
            
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            // nếu field đang truyền có bằng cái column không nếu không thì dùng default 
            const sortType = field === sort.column ? sort.type : 'default'
            const icons = {  
                default: 'bi bi-strava',
                desc: 'bi bi-sort-down',
                asc: 'bi bi-sort-down-alt',
            }
            const types = {
                default: 'asc',
                asc: 'desc',
                desc: 'asc',
            }
            const icon = icons[sortType]
            const type = types[sortType]
            // chống XSS
            const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

            const output =  `<a href="${href}">
                    <i class="${icon}"></i>
                    </a>`
            return new Handlebars.SafeString(output)
        },
}
