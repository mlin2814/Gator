// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA22_-RWAMuD6vTue3XwjmBlp-0kwCniw",
    authDomain: "gatordb-62e35.firebaseapp.com",
    databaseURL: "https://gatordb-62e35.firebaseio.com",
    storageBucket: "gatordb-62e35.appspot.com",
    messagingSenderId: "866976750728"
  };
  firebase.initializeApp(config);

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

  //Twitter- 


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