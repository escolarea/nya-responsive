const routes = module.exports = require('next-routes')()
 
routes
.add('/')
.add('about')
.add('news', '/news/:page', '/news/:page/:article')
.add('account', '/account/edit', '/account/overview', '/account/plans', '/account/presale', '/account/subscription')
.add('contact', '/contact/subject')
.add('menu')


