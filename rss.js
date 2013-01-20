/* RSS feed generator */
module.exports = function(app){'use strict';
  var url = require('url')
    , RSS = require('rss')
    , feed = new RSS({
        title: app.get('site.title'),
        description: app.get('site.description'),
        author: app.get('site.author')
      })
  
  feed.site_url = 'http://' + app.get('site.host') + '/'
  feed.feed_url = url.resolve(feed.site_url, 'rss')

  return {
    add: function (item){
      feed.item({
        title:  item.title,
        description: item.preview,
        url: item.url,
        date: item.date
      })    
    },
    generate: function (){
      if (!app.get('site.rss')) {
        app.set('site.rss', feed.xml())
      }
    },
    send: function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/rss+xml'})
      res.end(app.get('site.rss'))
    }
  }
}
