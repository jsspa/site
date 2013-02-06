'use strict';
var express  = require('express')
  , blogp  = require('poet')
  , app    = express()
  , feed   = require('./rss')(app)
  , router = require('./routes')(app)
  , poet   = blogp(app)


app.configure(function () {/* express configuration */
  app.set('port', process.env.PORT || 3000)
  app.set('pkg', require('../package'))
  app.set('cfg', require('./config'))
  app.set('view engine', 'jade')
  app.set('site.host', 'http://jsspa.org')
  app.set('site.title', 'JS en Español')
  app.set('site.author', 'jsspa (tm)')
  app.set('views', __dirname + '/views')
  app.use(express['static'](__dirname + '/../app'))
  app.use(poet.middleware())
  app.use(app.router)
  app.locals({
      cfg: app.get('cfg')
    , environment: app.get('environment')
  })
  app.disable('x-powered-by')
})


/* poet configuration */
poet.set({
    metaFormat: 'json'
  , posts: __dirname + '/../_posts'
  , readMoreLink : function (post) {
      var anchor = '<a href="' + post.url + '" title="Leer más de ' + post.title + '">Leer más</a>'
      return '<p>' + anchor + '</p>'
    }
  , routes: {
      category: '/s/',
      post: '/p/',
      tag: '/t/',
      page: '/pg/'
    }
})
.init(function (local) {
  local.postList.forEach(function (post) {
    feed.add(post)
  })
  feed.generate()
})


app.get('/', router.home)
app.get('/p/:post', router.post)
app.get('/t/:tag', router.tag)
app.get('/s/:category', router.series)
app.get('/pg/:page', router.pages)
app.get('/rss', feed.send)

app.listen(app.get('port'), function () {
  console.log('[*] Listening on %d', app.get('port'))
})
