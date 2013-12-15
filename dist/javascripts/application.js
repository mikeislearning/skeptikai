steroids.view.navigationBar.show();

var infoView = new steroids.views.WebView("about.html");


var imageButton = new steroids.buttons.NavigationBarButton();

//var flip = new steroids.Animation({
//  transition: "flipHorizontalFromLeft"
//});

imageButton.imagePath = "/icons/info_icon.png";
imageButton.onTap = function(){steroids.modal.show({
  view: infoView
  }
)};

steroids.view.navigationBar.setButtons({
  right: [imageButton]
});




/**
 * Loads the proper article based on the ID
 * @param  {[type]} i     [description]
 * @param  {[type]} title [description]
 * @return {[type]}       [description]
 */

//steroids.tabBar.show();

function showArticleView(i, title) {
    var articleView = new steroids.views.WebView({
        location: "article.html?id=" + i
    });

  steroids.tabBar.hide();

  steroids.layers.push({
    view: articleView
    //,animation: fade
  });
}


/**
 * Loads an individual atricle
 * @param  {[localStorage]} storageType [determines whether the storage is saved article]
 * @return {[type]}             [description]
 */
function loadArticle(storageType){
  var articleStorage = JSON.parse(localStorage.getItem(storageType)),
  button = "♥";

  //determines if localStorage is wordpress or savedArticle


  $.each(articleStorage.posts, function (i, post){

   if(post.ID == getUrlVars()["id"]){

      var title = "<h1>" + post.title + "</h1>",
      content = post.content;

      if(isArticleSaved(post))
        {
          button = "x";

        }

      $(title).appendTo("#articleTitle");
      $(content).appendTo("#article");
      $('#articleAction').text(button);;

      //either creates a save or delete button
      if(button == "♥"){
        $('#articleAction').hammer().on('tap', function(){
            saveArticle(post, true);
        });
      }
      else{

        $('#articleAction').hammer().on('tap', function(){
            deleteSavedArticle(post);
        });

      }


    }
  });
}

/**
 * This function deletes the selected value
 * It does so by removing the entire savedArticles item,
 * and then loops through, adding every item except the item requested for deletion
 */
function deleteSavedArticle(post){

  navigator.notification.confirm(
    "Are you sure you want to delete?",
    function(buttonIndex){
      if(buttonIndex == 1){
        var savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
        localStorage.removeItem('savedArticles');
        $.each(savedArticles.posts, function(i, others){
          if(post.ID !== others.ID){
            //var key = JSON.parse(localStorage.getItem('savedArticles')).posts;
            saveArticle(others, false);
          }
        });
      }

    },
    " ",
    ['Yes','No'] )



}

//checks if article is already saved
function isArticleSaved(post){
  var exists = false,
      savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || {};

  //if statement used for first save
  if(savedArticles.posts){
    $.each(savedArticles.posts, function(i, others){

      if(post.ID == others.ID) exists = true;
    });
  }
  return exists;
}

//saves the article in storage
function saveArticle(post, alertMe){

  //var exists = false;

  var savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || {};

  //if statement used for first save
  if(!savedArticles.posts){
    savedArticles.posts = [];
  }


  var num = savedArticles.posts.length || 0;
  if(!isArticleSaved(post)){
    savedArticles.posts[num] = post;
    savedArticles.count = num + 1;
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    if(alertMe){
      navigator.notification.alert(
          'Article saved',  // message
          function(){},         // callback
          'Skeptikai',            // title
          'OK'                  // buttonName
      );
    }
  }
  else{
    navigator.notification.alert(
          'You already saved this article',  // message
          function(){},         // callback
          'Skeptikai',            // title
          'OK'                  // buttonName
      );
  }

  // console.log(savedArticles.found);


}

/**
 * Shows all articles summaries in either index.html or saved.html
 * @param  {[type]} articleStorage [description]
 * @return {[type]}                [description]
 */
function showList(articleStorage){

  $.each(articleStorage.posts, function (i, post){

    var articleButton =  '<main class="singleArticle" id = "article'+ post.ID +'"><div class="articleSummary"><p class="articleTitle">' + post.title + '</p>';
      articleButton += '<p>' + post.excerpt + '</p></div>';

    var articleDate = formatDate(post.date);//formats the date for article

    articleButton += '<figure class="articlePhoto"><img src="http://placehold.it/100x100"><figcaption class="articleDate">' + articleDate + '</figcaption></figure><img class="rightArrow" src="icons/breadcrumb.png"></main><hr>';


    $(articleButton).appendTo("#posts");


    $('#posts').hammer().on('tap swipeleft dragleft', '#article'+post.ID, function(){
        showArticleView(post.ID, post.title);
    });
  });

}

/**
 * get the url variables
 * taken from http://jquery-howto.blogspot.ca/2009/09/get-url-parameters-values-with-jquery.html
 */
function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/**
 * formats the date, returning the day, month, and year
 * @param  {[string]} date [description]
 * @return {[type]}      [description]
 */
function formatDate(date){

  var date = new Date(date);
  var day = date.getDate(),
      month = date.getMonth();
      year = date.getFullYear();

  return day + '/' + month + '/' + year;
}
