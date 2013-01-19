'use strict';
var express  = require('express')
  , blogp = require('poet')
  , app    = express()
  , poet   = blogp(app)
  , router

/* poet configuration */
poet.set({
  metaFormat:'json',
  readMoreLink : function (post){
    var anchor = '<a href="' + post.url + '" title="Leer más de ' + post.title + '">Leer más</a>'
    return '<p>' + anchor + '</p>'
  },
  routes: {
    category: '/s/',
    post: '/p/',
    tag: '/t/',
    page: '/pg/'
  }
}).init()

{ /* express configuration */
  app.set('port', process.env.PORT || 3000)
  app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')
  app.use(express['static']( __dirname + '/public'))
  app.use(poet.middleware())
  app.use(app.router)
}

router = require('./routes')(app)

app.get('/', router.home)
app.get('/p/:post', router.post)
app.get('/t/:tag', router.tag)
app.get('/s/:category', router.series)
app.get('/pg/:page', router.pages)

app.listen(app.get('port'), function (){
  console.log('[*] Listening on %d', app.get('port'))
})
