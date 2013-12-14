steroids.view.navigationBar.show();



/**
 * Loads the proper article based on the ID
 * @param  {[type]} i     [description]
 * @param  {[type]} title [description]
 * @return {[type]}       [description]
 */
function showArticle(i, title) {
    var webView = new steroids.views.WebView({
        location: "article.html?id=" + i
    });

  steroids.layers.push(webView);
  //steroids.view.navigationBar.show("moo");
  //steroids.view.navigationBar.show("Skeptikai");
}

function loadArticle(storageType){
  var articleStorage = JSON.parse(localStorage.getItem(storageType)),
  button = "Save";



  //determines if localStorage is wordpress or savedArticle
  if(!articleStorage.found)
  {
    button = "Delete";

  }



  $.each(articleStorage.posts, function (i, post){

   if(post.ID == getUrlVars()["id"]){

      var title = "<h1>" + post.title + "</h1>",
      content = post.content;

      $(title).appendTo("#articleTitle");
      $(content).appendTo("#article");
      $(button).appendTo('#articleAction');

      //either creates a save or delete button
      if(button == "Save"){
        $('#articleAction').hammer().on('tap', function(){
            saveArticle(post);
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

function deleteSavedArticle(post){
  alert("deleted");
  var savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
  $.each(savedArticles.posts, function(i, others){

      if(post.ID == others.ID){
        var key = post.ID;
        localStorage.removeItem(key);
      }
    });
}


function saveArticle(post){

  var exists = false;

  var savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || {};

  //if statement used for first save
  if(savedArticles.posts){
    $.each(savedArticles.posts, function(i, others){

      if(post.ID == others.ID) exists = true;
    });
  }
  else savedArticles.posts = [];

  var num = savedArticles.posts.length || 0;
  if(!exists){
    savedArticles.posts[num] = post;
    savedArticles.count = num + 1;
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      alert("saved");
  }
  else{
    (alert("You've already saved this article"));
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


    $('#posts').hammer().on('tap', '#article'+post.ID, function(){
        showArticle(post.ID, post.title);
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
