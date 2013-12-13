steroids.view.navigationBar.show("It's an app!");




function showArticle(i, title) {


    var webView = new steroids.views.WebView({
        location: "article.html?id=" + i

    });
console.log("moo");
  steroids.layers.push(webView);
  steroids.view.navigationBar.show("moo");

//steroids.view.navigationBar.show("Skeptikai");

}

function saveArticle(post){
  alert(post.title);

  localStorage.setItem('savedArticles', JSON.stringify(post));

}


function getUrlVars()
{
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

function formatDate(date){

  var date = new Date(date);


  var day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();

  return day + '/' + month + '/' + year;
}
