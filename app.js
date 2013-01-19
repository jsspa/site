var express  = require('express')
  , blogp = require('poet')
  , app    = express()
  , poet   = blogp(app)

poet.set({
  metaFormat:'json',
  readMoreLink : function (post){
    var anchor = '<a href="' + post.url + '" title="Leer más de ' + post.title + '">Leer más</a>'
    return '<p>' + anchor + '</p>'
  },
}).init()

{ /* express configuration */
  app.set('port', process.env.PORT || 3000)
  app.set('view engine', 'jade')
  app.set('views', __dirname + '/views')
  app.use(express.static( __dirname + '/public'))
  app.use(poet.middleware())
  app.use(app.router)
}


app.get('/post/:post', function (req, res){
  var post = req.poet.getPost(req.params.post)
  if ( post ) {
    res.render('post', { post: post })
  } else {
    res.send(404)
  }
})

app.get('/tag/:tag', function (req, res){
  var taggedPosts = req.poet.postsWithTag( req.params.tag );
  if ( taggedPosts.length ) {
    res.render( 'tag', {
      posts : taggedPosts,
      tag : req.params.tag
    })
  }
})

app.get('/category/:category', function (req, res){
  var categorizedPosts = req.poet.postsWithCategory(req.params.category)
  if ( categorizedPosts.length ) {
    res.render( 'category', {
      posts : categorizedPosts,
      category : req.params.category
    })
  }
})

app.get('/page/:page', function (req, res){
  var page = req.params.page
    , lastPost = page * 3
  res.render( 'page', {
    posts : req.poet.getPosts( lastPost - 3, lastPost ),
    page : page
  })
})



app.get('/', function (req, res){
  res.render('index')
})

app.listen(app.get('port'), function (){
  console.log('[*] Listening on %d', app.get('port'))
})
