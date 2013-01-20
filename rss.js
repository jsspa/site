/* RSS feed generator */
module.exports = function(app){'use strict';
  var url = require('url')
    , RSS = require('rss')
    , feed = new RSS({
        title: app.get('site.title'),
        description: app.get('site.description'),
        author: app.get('site.author'),
        site_url: 'http://' + app.get('site.host') + '/',
        feed_url: 'http://' + app.get('site.host') + '/rss'
      })

  return {
    add: function (item){
      feed.item({
        title:  item.title,
        description: item.preview,
        url: item.url,
        author: item.author || 'Anon',
        categories: item.tags,
        date: item.date
      })    
    },
    generate: function (){
      if (!app.get('site.rss')) {
        app.set('site.rss', feed.xml())
      }
    },
    send: function (req, res){
      res.contentType('application/rss+xml')
      res.end(app.get('site.rss'))
    }
  }
}
