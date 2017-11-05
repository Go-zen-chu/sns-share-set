// sns sharing
$(function() {
  // 取得するURL = 今のページ (jekyll server 時は localhost になるのに注意！)
  var url = window.location.href;

  $("#tw-share-link").attr("href", "https://twitter.com/share?url=" + url)
  $("#fb-share-link").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + url)
  $("#gp-share-link").attr("href", "https://plus.google.com/share?url=" + url)
  $("#hb-share-link").attr("href", "http://b.hatena.ne.jp/entry/" + url)

  // facebook
  $.ajax({
      url: '//graph.facebook.com/?id=' + encodeURIComponent( url ) ,
      dataType: 'jsonp' ,
      // 取得に成功した時の処理
      success:function( obj ) {
          var count = 0 ;
          if( obj.share ) {
              count = obj.share.share_count ;
          }
          $('.fb-result .count').html( count );
      } ,
      //取得に失敗した時の処理
      error:function() {
          $('.fb-result .count').html(0);
          return false;
      } ,
      //完了した時の処理
      complete:function() {
          return false ;
      }
  });

  // google plus
  $.ajax({
     type: "get", dataType: "xml",
     url: "http://query.yahooapis.com/v1/public/yql",
     data: {
         q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
         format: "xml",
         env: "http://datatables.org/alltables.env"
     },
     success: function (data) {
         var content = $(data).find("content").text();
         var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
         var count = (match != null) ? match[1] : 0;

         $('.gp-result .count').text(count);
     } ,
     //取得に失敗した時の処理
     error:function() {
         $('.gp-result .count').text(0);
         return false;
     } ,
     //完了した時の処理
     complete:function() {
         return false ;
     }
  });

  // はてブ
  $.ajax({
      url: 'http://api.b.st-hatena.com/entry.count?url=' + encodeURIComponent( url ) ,
      dataType: 'jsonp' ,
      // 取得に成功した時の処理
      success:function( count )
      {
          //データが存在しない場合は0扱い
          if( typeof( count ) == 'undefined' || !count )
          {
              count = 0 ;
          }
          // シェアカウントをhtmlへ書き出す
          $('.hb-result .count').html( count );
      } ,
      //取得に失敗した時の処理
      error:function()
      {
          $('.hb-result .count').html(0);
          return false;
      } ,
      //完了した時の処理
      complete:function()
      {
          return false ;
      }
  });
});

