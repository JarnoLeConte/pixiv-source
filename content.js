(function() {

  $('.editor.editor-richtext').prepend("<p class='pixiv-source'>... searching for source ...</p>");
  
  var addCaption = function(caption) {
    $('.editor-placeholder').text('');
    $('.editor.editor-richtext .pixiv-source').html(caption);
    if ($('.editor.editor-richtext > p:last-child').text() == "")
      $('.editor.editor-richtext > p:last-child').remove();  
  }

  var mkCaption = function(s) {
    return '<strong><a href="'+s.imageUrl+'">'+s.imageName+'</a></strong> by <strong><a href="'+s.artistUrl+'">'+s.artistName+'</a></strong>';
  }

  var parseResults = function($xml) {
      var $picture_a = $xml.find('.resultcontentcolumn:first > a:eq(0)');
      var $artist_a = $xml.find('.resultcontentcolumn:first > a:eq(1)');
      var $title = $xml.find('.resulttitle:first');

      return {
        imageName: $title.text(),
        imageUrl:  $picture_a.attr('href'),
        artistName: $artist_a.text(),
        artistUrl:  $artist_a.attr('href'),
      }
  }


  var image = $(".post-container .photoset--photo [data-js-imagewrap]:first-child").get(0);

  if (!image || !image.style.backgroundImage) 
    return addCaption("no source");

  var imageUrl = image.style.backgroundImage.slice(4, -1);

  if (!imageUrl) 
    return addCaption("no source");


  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://saucenao.com/search.php?url=" + encodeURIComponent(imageUrl) , true);
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        var $xml = $(xhr.responseText);
        var source = parseResults($xml);
        var caption = source ? mkCaption(source) : "no source";
        addCaption(caption);
      }
  }; 
  xhr.send();

})();