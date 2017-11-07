

//youtube api
var queryURL = "https://www.googleapis.com/youtube/v3/videos?part=player&id=MXgnIP4rMoI&key=AIzaSyBozDkvJZnsileIrGeXPDPaY3fZh68r2No";

//Gets description
/*$.ajax({
	url: queryURL,
	method: "GET"
})
.done(function(response) {

	$("#player").append(response.items[0].player.embedHtml);
	$("#player").append("a");
	console.log(response);

});*/


//---------------------------------------------------------------------
var videos = ["MXgnIP4rMoI","MloJx8bAcOw", "dQw4w9WgXcQ"]

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.

      function onYouTubeIframeAPIReady() {
      	for (var i = 0; i < videos.length; i++){
      		var newDiv = $("<div>");
      		newDiv.addClass("video-div")

      		var videoDiv = $("<div>");
      		videoDiv.attr("id", "video" + i);
      		videoDiv.addClass("video-number");
      		newDiv.append(videoDiv);

      		var video = $("<div>");
      		video.attr("id", videos[i]);
      		videoDiv.append(video);

      		var newButton = $("<button>Like</button>");
      		newButton.attr("data-name", videos[i]);
      		newButton.addClass("like");
 			    newDiv.append(newButton);
          
      		$("#player").append(newDiv);

      		var player;
      		player = new YT.Player(videos[i], {
      			height: '390',
      			width: '640',
      			videoId: videos[i],
      		});
      	};
      }
//------------------------------------------------------------------


//-----------------------------------------------------------
//compare arrays example
dave= ["cat", "reading", "dog video", "running", "hunting"];
marcus= ["bat", "cat","running", "dog video", "hut", "singing"];
robert= ["cat", "bat", "hunting", "reading"];

var similar = [];

Array.prototype.compare = function(interests) {
	var similar = [];
	for(var i in this) {   
		if(interests.indexOf(this[i]) > -1) {
			similar.push(this[i]);
		};
	};
	return similar;
};


similar = dave.compare(marcus);

if(similar.length> 2) {
	console.log("You have a match! " + similar);
};
//--------------------------------------------------------------
$(document).ready(function(){


	 // Initialize Firebase
	 var config = {
	 	apiKey: "AIzaSyB6GX-nOif_7oUMhQh_CTp53bXJ9-blMRM",
	 	authDomain: "letschill-cb145.firebaseapp.com",
	 	databaseURL: "https://letschill-cb145.firebaseio.com",
	 	projectId: "letschill-cb145",
	 	storageBucket: "",
	 	messagingSenderId: "727975472407"
	 };
	 firebase.initializeApp(config);

    //making sure our logic is connected
    console.log("we ready")
    
    //scrolling effect click function
    $("nav").find("a").click(function(e) {
    	e.preventDefault();
    	var section = $(this).attr("href");
    	$("html, body").animate({
    		scrollTop: $(section).offset().top
    	});
    });
    
});