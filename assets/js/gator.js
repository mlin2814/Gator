// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA22_-RWAMuD6vTue3XwjmBlp-0kwCniw",
    authDomain: "gatordb-62e35.firebaseapp.com",
    databaseURL: "https://gatordb-62e35.firebaseio.com",
    storageBucket: "gatordb-62e35.appspot.com",
    messagingSenderId: "866976750728"
  };
  firebase.initializeApp(config);
$(document).ready(function(){
  $('.modal-trigger').leanModal({
    dismissible: true, 
    opacity: 0.15,
    starting_top: '50%'
  });
})
  //Reddit- Grabs the JSON and parses it for the default subreddits. This code should be designed to only execute when the user isnt logged in.
  $.getJSON(
        "http://www.reddit.com/r/news+worldnews.json?jsonp=?",
        function postUp(data)
        { console.log(data)
          $.each(
            data.data.children.slice(0, 25),
            function (i, post) {
              $("#reddit").append( "<li class = 'collection-item avatar><img src = '"+post.data.url+"' alt ='' class = 'circle><span class='title'>" + post.data.title+"</span><br><a href = '"+post.data.url+"'>View on Reddit!</a></li>");
            }
          )
        }
      );

  //NYT- Grabs the JSON for the search criteria. Review this as it is not fully working just yet. 

var nytApiKey = "&api-key=0a156cdac7664279a87c57512ec0bbe7";
var q;
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var number;

function getArticle(){
  //q should be a value from the database. Not currently working.
  q = "?q=google"//+$('#searchTerm').val().trim();
  queryURL+= q; 
  console.log(queryURL);
  //Sets the number of articles to return based on the number selected by the user.
  number = 25;
  //Completes the queryURL by adding the APIkey to the end. 
  queryURL+= nytApiKey;
  console.log(queryURL);

  //Runs the query and appends each article to the #wellSection inside of its own well. 
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
      console.log(response);
      for(var i = 0; i < number; i++){
        $('#nyt').append("<li class = 'collection-item avatar' id = 'article-'"+i+"><span class = 'title'>"+response.response.docs[i].headline.main+"</span><p>"+response.response.docs[i].abstract+"</p><p>Read more at: </p><a href ='"+response.response.docs[i].web_url+"'>"+response.response.docs[i].web_url+"</a></div>");       
      }
    });
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
return false; 
}
getArticle();

  //CNN- 
  // $.getJSON(
  // 	"http://www.cnn.com/newsgraph/search/ sort:<query-key>,<asc|desc>/",
  // 	function grabArticles(data){
  // 		console.log(data);
  // 		$.each(
  // 			function(i,post){
  // 				$('#cnn').append("<li class = 'collection-item avatar><img src = '"+post.data.url+"' alt ='' class = 'circle><span class='title'>" + post.data.title+"</span><br><a href = '"+post.data.url+"'>View on Reddit!</a></li>");
  // 			})
  // 	}