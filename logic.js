$(document).ready(function(){
    //making sure our logic is connected
    console.log("we ready")
    $('ul.tabs').tabs();
    
//scrolling effect click function
    $("nav").find("a").click(function(e) {
        e.preventDefault();
        var section = $(this).attr("href");
        $('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1000);
		event.preventDefault();
	});
    }); 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6GX-nOif_7oUMhQh_CTp53bXJ9-blMRM",
    authDomain: "letschill-cb145.firebaseapp.com",
    databaseURL: "https://letschill-cb145.firebaseio.com",
    projectId: "letschill-cb145",
    storageBucket: "letschill-cb145.appspot.com",
    messagingSenderId: "727975472407"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var name ="";
  var hobbies= "";
  
//using jquerry to hide the modal and to take the data in the form that user
//has submitted and display it in username section h2
//global variable
//google API
//function start
//  function start(){
//          $("#two").hide();
//          $("#three").hide();
//          $("#four").hide();
//          $("#five").hide();
//          $("#six").hide();
//  }
//  $("#meetNewPeople").on("click", function() {
//      $("#two").hide();
//      $("#three").hide();
//      $("#four").hide();
//      $("#five").hide();
//      $("#six").hide();
//  })
// start();
});
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
            $("#four").append(newDiv);
            var player;
            player = new YT.Player(videos[i], {
                height: '390',
                width: '640',
                videoId: videos[i],
            });
        };
      }
    $("#sign-up").click(function(){
        console.log()
    })
    var myDataRef = new Firebase('https://chitchat-45d06.firebaseio.com/');
    $('#userMess').keypress(function (e) {
      if (e.keyCode == 13) {
        var name = $('#userName').val();
        var text = $('#userMess').val();
        myDataRef.push({name: name, text: text});
        $('#userMess').val('');
      }
    });
    myDataRef.on('child_added', function(snapshot) {
      var message = snapshot.val();
      displayChatMessage(message.name, message.text);
    });
    function displayChatMessage(name, text) {
      $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#chitChat'));
      $('#chitChat')[0].scrollTop = $('#chitChat')[0].scrollHeight;
    };