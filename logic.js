$(document).ready(function(){
	//making sure our logic is connected
	console.log("we ready")
	
//scrolling effect click function

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
var currentEmail = "";
var currentUsername = "";
var currentPassword = "";
var currentLikes = [];

function signIn() {
  var email = $("#login-user-email").val();
  var password = $("#login-user-password").val();
  currentPassword = password;
  currentEmail = encodeURIComponent(email).replace('.', '%2E');
  database.ref().once("value", function(snapshot) {
    var emailExists = snapshot.child("users/" + currentEmail).exists();
    if(emailExists === true) {
      console.log("email exists")
      if(snapshot.child("users/" + currentEmail + "/password").val() === currentPassword){
        alert("You have been logged in!")
      }
      else{
        console.log("Password is incorrect.")
      };
    }
    else {
      console.log("A user with that email does not exist.")
    }
  });
};
function signUp() {
  var userName = $("#sign-user-name").val();
  var password = $("#sign-user-password").val();
  var email = $("#sign-user-email").val();
  var emailEncode = encodeURIComponent(email).replace('.', '%2E');
    database.ref("users/").once("value", function(snapshot) {
  		var emailExists = snapshot.child(emailEncode).exists();
	  	if(emailExists === false) {
	  		console.log("true")
		  	database.ref("users/" + emailEncode).set({
			    username: userName,
			    password: password,
			    likes: []
			
			});  
		}
		else{
			console.log("this email already exist");
		}
	});
};

function compare(){
  database.ref("users/").once("value", function(snapshot) {
    var currentLikes = snapshot.child(currentEmail).val().likes;
    snapshot.forEach(function(child) {
      if(currentEmail !== child.key){
        var otherUser = child.val().likes;
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
        similar = currentLikes.compare(otherUser);
        if(similar.length> 2) {
          console.log("You have a match with " + child.val().username + similar);
        };
      }
    });
  });
};
$(document).on("click", "#compare", function() {
  compare();
});
$(document).on("click", "#sign-up", function() {
  signUp();
});
$(document).on("click", "#log-in", function() {
  signIn();
});
//using jquerry to hide the modal and to take the data in the form that user
//has submitted and display it in username section h2

//global variable

//compareing multiple

//compare arrays example
  
//google API

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

//scrolling effects
$("nav").find("a").click(function(e) {
	    e.preventDefault();
	    var section = $(this).attr("href");
	    $("html, body").animate({
	        scrollTop: $(section).offset().top
	    });
	});	


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

