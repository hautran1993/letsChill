$(document).ready(function(){
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

//using jquerry to hide the modal and to take the data in the form that user
//has submitted and display it in username section h2

//google map api
var videos = ["MXgnIP4rMoI","MloJx8bAcOw", "dQw4w9WgXcQ"]
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      function onYouTubeIframeAPIReady() {

      	//youtube iframe API
        for (var i = 0; i < videos.length; i++){
            var newDiv = $("<div>");
            newDiv.addClass("video-div")
            var videoDiv = $("<div>");
            videoDiv.attr("id", "video" + i);
            videoDiv.addClass("video-number");
            newDiv.append(videoDiv);
        //video
            var video = $("<div>");
            video.attr("id", videos[i]);
            videoDiv.append(video);

            var newButton = $("<button>Like</button>");
            newButton.attr("data-name", videos[i]);
            newButton.addClass("like");
            newDiv.append(newButton);
            //change the target
            $("#five").append(newDiv);
            var player;
            player = new YT.Player(videos[i], {
                height: '390',
                width: '640',
                videoId: videos[i],
            });
        };
      }
//showing ND HIDING PAGES as they use the app

//user ithentication

//function start

// 	function start(){
// 			$("#two").hide();
// 			$("#three").hide();
// 			$("#four").hide();
// 			$("#five").hide();
// 			$("#six").hide();
// 	}

// 	$("#meetNewPeople").on("click", function() {
// 		$("#two").hide();
// 		$("#three").hide();
// 		$("#four").hide();
// 		$("#five").hide();
// 		$("#six").hide();
// 	})


// start();


});