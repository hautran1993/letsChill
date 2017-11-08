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
  }
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
        alert("You have been logged in!")
        currentEmail = snapshot.child("users/" + username + "/email").val();
      }
      else{
        console.log("Password is incorrect.")
      };
    }
    else {
      console.log("That username does not exist.")
    };
  });
};

//Compares the likes of two users and matches them if they have more than 2 similar likes
function compare() {
  database.ref("users/").once("value", function(snapshot) {
    var currentLikes = snapshot.child(currentUsername).val().likes;
    snapshot.forEach(function(child) {
      if(currentUsername !== child.key){
        var otherUserLikes = child.val().likes;
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
        similar = currentLikes.compare(otherUserLikes);
        //Change number here to compare how many likes should be a match.
        if(similar.length > 2) {
          console.log("You have a match with " + child.val().username + " " + similar);
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

//  function start(){
//      $("#two").hide();
//      $("#three").hide();
//      $("#four").hide();
//      $("#five").hide();
//      $("#six").hide();
//  }

//  $("#meetNewPeople").on("click", function() {
//    $("#two").hide();
//    $("#three").hide();
//    $("#four").hide();
//    $("#five").hide();
//    $("#six").hide();
//  })

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
        for (var i = 0; i < videos.length; i++) {
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
      };
