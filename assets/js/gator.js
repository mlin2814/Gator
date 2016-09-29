
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA22_-RWAMuD6vTue3XwjmBlp-0kwCniw",
    authDomain: "gatordb-62e35.firebaseapp.com",
    databaseURL: "https://gatordb-62e35.firebaseio.com",
    storageBucket: "gatordb-62e35.appspot.com",
    messagingSenderId: "866976750728"
  };
  firebase.initializeApp(config);

//Google Login- Sets up the code to allow a user to authenticate with Google on Firebase. 
var provider = new firebase.auth.GoogleAuthProvider();
console.log(provider);
function googleSignIn(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log("Error Code: "+errorCode);
  console.log("Error Message: "+errorMessage);
  // ...
});
}

//Jquery onclick event to handle the googleSignIn function. 
$(document).on('click', '#google', function(){
  googleSignIn()
});

//Reddit- Grabs the JSON and parses it for the default subreddits. This code should be designed to only execute when the user isnt logged in.
  $.getJSON(
        "https://www.reddit.com/r/news+worldnews.json?jsonp=?",
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
  //Sets the number of articles to return based on the number selected by the user.
  number = 25;
  //Completes the queryURL by adding the APIkey to the end. 
  queryURL+= nytApiKey;

  //Runs the query and appends each article to the #wellSection inside of its own well. 
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
      console.log(response);
      for(var i = 0; i < number; i++){
        $('#nyt').append("<li class = 'collection-item avatar' id = 'article-'"+i+"><span class = 'title'>"+response.response.docs[i].headline.main+"</span><br><a href ='"+response.response.docs[i].web_url+"'>View on New York Times!</a></div>");       
      }
    });
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
return false; 
}
getArticle();

//NPR API- Grabs the JSON for the search criteria.

var nprAPIKey = "MDI2OTU2OTcxMDE0NzUwMjM5NjYwZDAxNQ000";
var nprQuery = "android"; 
var nprQueryUrl = "https://api.npr.org/query?requiredAssets=text,image&searchTerm="+nprQuery+"&dateType=story&output=JSON&searchType=fullContent&apiKey="+nprAPIKey;

$.ajax({url: nprQueryUrl, method: 'GET'}).done(function(response){
  console.log(response.list);
  for(var i = 0; i < 10; i++){
      $('#npr').append("<li class = 'collection-item avatar' id = 'article-'"+i+"><span class = 'title'>"+response.list.story[i].title.$text+"</span><p>"+response.list.story[i].teaser.$text+"</p><p>Read more at: </p><a href ='"+response.list.story[i].link.$text+"'>View on NPR!</a></div>");       
  }
})