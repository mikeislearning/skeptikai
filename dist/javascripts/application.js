steroids.view.navigationBar.show("Skeptikai");




function showArticle(i, title) {
    steroids.view.navigationBar.show(title);

    var webView = new steroids.views.WebView({
        location: "article.html?id=" + i

    });

  steroids.layers.push(webView);
//steroids.view.navigationBar.show("Skeptikai");

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
      month = date.getMonth();
      year = date.getFullYear();

  return day + '/' + month + '/' + year;
}
