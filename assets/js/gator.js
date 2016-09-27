console.log("page loaded");

Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA22_-RWAMuD6vTue3XwjmBlp-0kwCniw",
    authDomain: "gatordb-62e35.firebaseapp.com",
    databaseURL: "https://gatordb-62e35.firebaseio.com",
    storageBucket: "gatordb-62e35.appspot.com",
    messagingSenderId: "866976750728"
  };
  firebase.initializeApp(config);




























var authKey = "9d4a8986921972b65754ea0809d47c84:12:74623931";

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

var question= '';

var fullQuery = '';

var queryURL='';

$("#nytSearch").on('keyup',function(e){ 
    e.preventDefault();
    var code = e.which;
    if(code==13)
    {
      console.log("yay!");
        question =$("#nytSearch").val().trim();
        var rSpace = question.split(' ').join('+');
	fullquery= queryURLBase+'&q='+ rSpace;
	console.log(fullquery);
  queryURL=fullQuery
    } 



	


  
  	$.ajax({
            url: queryURL,
            method: 'GET'
        })

  	.done(function(response) {
		  	console.log(response)
		  })
		  	return false;
		  });