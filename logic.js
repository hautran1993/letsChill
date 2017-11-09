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
  var likedVideos = [];
  var likedHobbies = [];

//After clicking the sign up button, allows a person to sign up by creating a username and password. All fields and email address is required.
function signUp() {
  var username = $("#sign-user-name").val().trim();
  var password = $("#sign-user-password").val().trim();
  var email = $("#sign-user-email").val().trim();
  //Person must enter non-empty fields and the username must contain only letters or numbers.
  var letterNumber = /^[0-9a-zA-Z]+$/;  
  if(username !== "" && password !== "" && email !== "" && username.match(letterNumber)) {
    database.ref("users/").once("value", function(snapshot) {
      var userExists = snapshot.child(username).exists();
      //If someone with the same entered username already exists, a new account will not be created.
      if(userExists === false) {
        console.log("You have successfully signed up!");
        database.ref("users/" + username).set({
          username: username,
          password: password,
          email: email,
          likes: []
        });  
      }
      else{
        console.log("This username already exists. Choose another.");
      };
    });
  }
  else {
    console.log("Fields not valid.");
  };
};

//When clicking the Login button after entering the required fields, 
//this function checks if the values inputted are the same as in the database.
//If they are the same, the user will be logged in and the page will be switched
function signIn() {
  var username = $("#login-user-name").val();
  var password = $("#login-user-password").val();
  currentUsername = username;
  currentPassword = password;
  database.ref().once("value", function(snapshot) {
    console.log(snapshot.child("users/Apple").val());
    var userExists = snapshot.child("users/" + username).exists();
    //If the entered username does not exist, a message saying it doesn't exist will show.
    if(userExists === true) {
      console.log("This username exists.")
      if(snapshot.child("users/" + username + "/password").val() === currentPassword) {
        $('#login-modal').modal('toggle');
        alert("You have been logged in!");
        currentLikes = snapshot.child("users/" + username + "/likes").val();
        currentEmail = snapshot.child("users/" + username + "/email").val();
      }
      else{
        //This shows if the password entered is incorrect.
        console.log("Password is incorrect.");
      };
    }
    else {
      //This shows if the username entered does not exist in the database.
      console.log("That username does not exist.");
    };
  });
};

//Compares the likes of two users and matches them if they have more than 2 similar likes
function compare() {

  database.ref("users/").once("value", function(snapshot) {

    currentLikes = snapshot.child(currentUsername).val().likes;
    //Will only compare if the current user has liked anything.
    if(snapshot.child(currentUsername).child("likes").exists() === true) {

      //Loops through each user to compare likes with the current user.
      snapshot.forEach(function(child) {
        //Compares current user's likes to another user's likes if the other user has any likes.
        if(currentUsername !== child.key && child.child("likes").exists()) {

          var otherUserLikes = child.val().likes;
          var similar = [];
          Array.prototype.compare = function(interests) {
            for(var i in this) {   
              if(interests.indexOf(this[i]) > -1) {
                similar.push(this[i]);
              };
            };
            return similar;
          };
          similar = currentLikes.compare(otherUserLikes);
          //Change number here to compare how many likes should be a match.
          if(similar.length > 2) {
            console.log("You have a match with " + child.val().username + " " + similar);
          }
          else {
            //This is shown when the current user's likes does not match to any other user.
            console.log("You have no matches!");
          };

        }
      });

    }
    else {
      //If the current user has no likes this is ran.
      console.log("Get some likes first!");
    };

  });
  
};

//This function is ran when the hobbies are submitted or when a video is liked.
//This will combine the videos and hobbies liked into one array.
function combineLikes() {
  for(var i = 0; i < likedHobbies.length; i++) {
    if(currentLikes.indexOf(likedHobbies[i]) === -1) {
      currentLikes.push(likedHobbies[i]);
    };
  };
  for(var i = 0; i < likedVideos.length; i++) {
    if(currentLikes.indexOf(likedVideos[i]) === -1) {
      currentLikes.push(likedVideos[i]);
    };
  };
  database.ref("users/" + currentUsername).child("likes").set(currentLikes);
};

//When the hobbies are submitted, this function will set the likes in the database.
function hobbies() {
  event.preventDefault();
  likedHobbies = [];
    $("input:checkbox[name=newsletter]:checked").each(function() {
      likedHobbies.push($(this).val());
    });
  combineLikes();
};

//When a video is liked, this function will set the liked video in the database.
function clickLikeVideo(button) {
  videoLiked = $(button).attr("data-name");
  if(likedVideos.indexOf(videoLiked) === -1) {
    likedVideos.push(videoLiked);
    combineLikes();
  };
};

$(document).on("click", "#sign-up", function() {
  signUp();
});

$(document).on("click", "#log-in", function() {
  signIn();
});

$(document).on("click", "#submit-hobbies", function() {
  hobbies();
});

$(document).on("click", ".like", function() {
  clickLikeVideo(this);
});

$(document).on("click", "#compare", function() {
  compare();
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

//first thing i have to do is check the user is login or not 
  //if login is true allow him or her to click on this hobby
  //other not login direct to login page
  //make a button somewhere for painting, it'll show all of the user that likes painting 
  //make a button for a chat
  //have to seperate some how
  //have pages for people with the same group of hobbies.
  //profile page with pictur.

  //profile page with pictures.



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

