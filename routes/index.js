
/*
 * Todas las rutas
 */

module.exports = function (app){

  var Routes = {
    home: function (req, res){
      res.render('index')
    },
    post: function (req, res){
      var post = req.poet.getPost(req.params.post)
      if ( post ) {
        res.render('post', { post: post })
      } else {
        res.send(404)
      }
    },
    tag:  function (req, res){
      var taggedPosts = req.poet.postsWithTag( req.params.tag );
      if ( taggedPosts.length ) {
        res.render( 'tag', {
          posts : taggedPosts,
          tag : req.params.tag
        })
      }
    },
    series: function (req, res){
      var categorizedPosts = req.poet.postsWithCategory(req.params.category)
      if ( categorizedPosts.length ) {
        res.render( 'category', {
          posts : categorizedPosts,
          category : req.params.category
        })
      }
    },
    pages: function (req, res){
      var page = req.params.page
        , lastPost = page * 3
      res.render( 'page', {
        posts : req.poet.getPosts( lastPost - 3, lastPost ),
        page : page
      })
    }
  }

  return Routes
}
