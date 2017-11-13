$(document).ready(function(){
//making sure our logic is connected
console.log("we ready")

//<-----------------------------------------------Navbar And Sections Show/Hide----------------------------------------------->
$("#show-user").hide();
$("#home-nav").hide();
$("#hobbies-nav").hide();
$("#videos-nav").hide();
$("#chat-nav").hide();
$("#two").hide();
$("#three").hide();
$("#four").hide();
$("#five").hide();

var sections = ["#home", "#two", "#three", "#four", "#five"];
var nav = ["#home-nav", "#hobbies-nav", "#videos-nav", "#chat-nav", "#developers-nav"];

function hidePage() {
  for(var i = 0; i < nav.length; i++) {
    $(sections[i]).hide();
    $(nav[i]).removeClass("active");
  }
};

$(document).on("click", "#welcome-nav", function() {
  $("#five").hide();
  $("#developers-nav").removeClass("active");
  $("#one").fadeIn(500);
  $("#welcome-nav").addClass("active");
});

$(document).on("click", "#home-nav", function() {
  hidePage();
  $("#home-nav").addClass("active");
  $("#home").fadeIn(500);
});

$(document).on("click", "#hobbies-nav", function() {
  hidePage();
  $("#hobbies-nav").addClass("active");
  $("#two").fadeIn(500);
});

$(document).on("click", "#videos-nav", function() {
  hidePage();
  $("#videos-nav").addClass("active");
  $("#three").fadeIn(500);
});

$(document).on("click", "#chat-nav", function() {
  hidePage();
  $("#chat-nav").addClass("active");
  $("#four").fadeIn(500);
});

$(document).on("click", "#developers-nav", function() {
  hidePage();
  $("#welcome-nav").removeClass("active");
  $("#one").hide();

  $("#developers-nav").addClass("active");
  $("#five").fadeIn(500);
});
//<-----------------------------------------------End Navbar And Sections Show/Hide----------------------------------------------->



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
  var currentUserName = "";
  var currentPassword = "";
  var currentLikes = [];
  var likedVideos = [];
  var likedHobbies = [];
  var likedSearches = [];
  var likedImages = [];
  var currentChatId;
  var otherUsername;


//<-----------------------------------------------Sign Up/Login Functions----------------------------------------------->
//After clicking the sign up button, allows a person to sign up by creating a username and password. All fields and email address is required.
function signUp() {
  var username = $("#sign-user-name").val().trim();
  var password = $("#sign-user-password").val().trim();
  var email = $("#sign-user-email").val().trim();
  //Person must enter non-empty fields and the username must contain only letters or numbers.
  var letterNumber = /^[0-9a-zA-Z]+$/;
  $("#sign-up-text").empty();
  if(username === "" || password === "" || email === "") {
    if(username === "") {
      $("#sign-up-text").append("Please enter a username. ");
    };
    if(password === "") {
      $("#sign-up-text").append("Please enter a password. ");   
    };
    if(email === "") {
      $("#sign-up-text").append("Please enter an email address.");
    };
  }
  else if(username.match(letterNumber)) {
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
      else {
        $("#sign-up-text").text("This username already exists. Choose another.");
      };
    });
  }
  else {
    $("#sign-up-text").text("Please enter letters and numbers only for the username.");
  };
};

//When clicking the Login button after entering the required fields, 
//this function checks if the values inputted are the same as in the database.
//If they are the same, the user will be logged in and the page will be switched
//get authentication weather suer exists
//look up firebase auth.
function login() {
  var username = $("#login-user-name").val();
  var password = $("#login-user-password").val();
  currentUsername = username;
  currentPassword = password;
  if(username === "" && password === "") {
    $("#incorrect-login-text").text("Please enter a username and password.");
  }
  else if(username === "") {
    $("#incorrect-login-text").text("Please enter a username.");
  }
  else if(password === "") {
    $("#incorrect-login-text").text("Please enter a password.");
  }
  else {
    database.ref().once("value", function(snapshot) {
      var userExists = snapshot.child("users/" + username).exists();
      //If the entered username does not exist, a message saying it doesn't exist will show.
      if(userExists === true) {
        console.log("This username exists.")
        //Checks if the password entered matches the one in the database
        if(snapshot.child("users/" + username + "/password").val() === currentPassword) {
          $("#login-modal").modal("toggle");
          $("#sign-up-nav").html("<a style='color:white'>Welcome: " + username + "!</a>");
          $("#login-nav").hide();
          $("#welcome-nav").hide();
          $("#front-page").hide();

          $("#home-nav").show();
          $("#hobbies-nav").show();
          $("#videos-nav").show();
          $("#chat-nav").show();

          $("#show-user").show();
          $("#four").hide();
          $("#home").fadeIn(500);
          $("#home-nav").addClass("active");

          currentEmail = snapshot.child("users/" + username + "/email").val();
          if(snapshot.child("users/" + username + "/likes").exists()) {
            currentLikes = snapshot.child("users/" + username + "/likes").val();
          };
          
          //Puts in users that have messaged you before
          if(snapshot.child("users/" + username + "/usersChatWith").exists()) {

            var allMatchesDiv = $("<div>");
            snapshot.child("users/" + username + "/usersChatWith").forEach(function(child) {
              var newMatchDiv = $("<div>");
              var usernameSpan = $("<span>");

              var nameSort = [currentUsername, child.val()]
              nameSort = nameSort.sort();
              nameSort = nameSort.join("");

              usernameSpan.attr("data-chatId", nameSort);
              usernameSpan.attr("data-otherUsername", child.val())
              usernameSpan.text(child.val());
              usernameSpan.addClass("usernameSpanHome");
              newMatchDiv.append(usernameSpan);

              $(allMatchesDiv).append(newMatchDiv);

            //Div to put in users that have message you before
            $("#previous-people").html(allMatchesDiv);
          });

          };
        }
        else{
          //This shows if the password entered is incorrect.
          $("#incorrect-login-text").text("Password is incorrect.");
        };
      }
      else {
        //This shows if the username entered does not exist in the database.
        $("#incorrect-login-text").text("That username does not exist.");
      };
    });
  };
};
//<-----------------------------------------------End Sign Up/Login Functions----------------------------------------------->


//<-----------------------------------------------Get Videos, Hobbies, and Image Likes To Compare----------------------------------------------->
//Compares the likes of two users and matches them if they have more than 2 similar likes
function compare() {

  database.ref("users/").once("value", function(snapshot) {

    currentLikes = snapshot.child(currentUsername).val().likes;
    //Will only compare if the current user has liked anything.
    if(snapshot.child(currentUsername).child("likes").exists() === true) {

      var allMatchesDiv = $("<div>");
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
          if(similar.length > 5) {
            var newMatchDiv = $("<div>");
            var usernameSpan = $("<span>");

            var nameSort = [currentUsername, child.val().username]
            nameSort = nameSort.sort();
            nameSort = nameSort.join("");

            usernameSpan.attr("data-chatId", nameSort);
            usernameSpan.attr("data-otherUsername", child.val().username)
            usernameSpan.text(child.val().username);
            usernameSpan.addClass("usernameSpan");

            newMatchDiv.text("You have a match with ");
            newMatchDiv.append(usernameSpan);

            allMatchesDiv.append(newMatchDiv);
          };
        };
      });
      //Appends matches text to matches di
      if(allMatchesDiv.text() !== "") {
        $("#people").html(allMatchesDiv);
      }
      else {
        $("#people").html("You have no matches!")
      };
      
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
  for(var i = 0; i < likedImages.length; i++) {
    if(currentLikes.indexOf(likedImages[i]) === -1) {
      currentLikes.push(likedImages[i]);
    };
  };
  for(var i = 0; i < likedVideos.length; i++) {
    if(currentLikes.indexOf(likedVideos[i]) === -1) {
      currentLikes.push(likedVideos[i]);
    };
  };
  for(var i = 0; i < likedSearches.length; i++) {
    if(currentLikes.indexOf(likedSearches[i]) === -1) {
      currentLikes.push(likedSearches[i]);
    };
  };
  database.ref("users/" + currentUsername).child("likes").set(currentLikes);
};

//When the hobbies are submitted, this function will set the likes in the database.
function hobbies(button) {
  event.preventDefault();
  var hobbieLiked = $(button).val();
  if(likedHobbies.indexOf(hobbieLiked) === -1) {
    likedHobbies.push(hobbieLiked);
    console.log("this")
    combineLikes();
  };
};

//When a image is liked, this function will set the liked image in the database.
function clickLikeImage(button) {
  var imageLiked = $(button).attr("data-name");
  if(likedImages.indexOf(imageLiked) === -1) {
    likedImages.push(imageLiked);
    combineLikes();
  };
};

//When a video is liked, this function will set the liked video in the database.
function clickLikeVideo(button) {
  var videoLiked = $(button).attr("data-name");
  if(likedVideos.indexOf(videoLiked) === -1) {
    likedVideos.push(videoLiked);
    combineLikes();
  };
};
//<-----------------------------------------------End Get Videos, Hobbies, and Image Likes To Compare----------------------------------------------->


//<-----------------------------------------------PixaBay API Functions----------------------------------------------->
// ajx call for pixa bay
var API_KEY = "6984223-4bc9b90e9945fb3ac039ea14c";
var pictureSearched = [];

function getPictures() {
  var searchTerm = $("#search-pictures").val().trim();
  $("#search-pictures").val("");
  if(searchTerm !== "") {
    $("#invalid-search-image").empty();
    var queryURL = "https://pixabay.com/api/?key=6984223-4bc9b90e9945fb3ac039ea14c&q=" + searchTerm + "&image_type=photo"
    likedSearches.push(searchTerm);
    combineLikes();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var newPictures = [];
      for(var i =0; i < response.hits.length; i++) {
        newPictures.push(response.hits[i].webformatURL);
      }; 
      pictureSearched = newPictures;
      picturesReady();
    });
  }
  else {
    $("#invalid-search-image").html("Please enter a search term.")
  };
};

function picturesReady() {
  $("#pics").empty();

  for (var i = 0; i < 5; i++) {
    var pictures = $("<img>");
    pictures.addClass("custom-class");
    pictures.attr("src", pictureSearched[i]);
    //new button
    var newButton = $("<button class='like-image'>Like</button>");
    newButton.attr("data-name", pictureSearched[i]);

    $("#pics").append(pictures);
    $("#pics").append(newButton);
  };
};
//<-----------------------------------------------End PixaBay API Functions----------------------------------------------->


$(document).on("click", "#sign-up", function() {
  signUp();
});

$(document).on("click", "#login", function() {
  login();
});

$(document).on("click", ".submit-hobbies", function() {
  hobbies(this);
});

$(document).on("click", "#search-pictures-button", function() {
  getPictures();
});

$(document).on("click", ".like-image", function() {
  clickLikeImage(this);
});

$(document).on("click", ".like", function() {
  clickLikeVideo(this);
});

$(document).on("click", "#compare", function() {
  compare();
});


//<-----------------------------------------------Chat Box----------------------------------------------->
$("#chat-area").hide();

  //Sets the initial chat messages from the database into the chat box, and adds a new message whenever someone sends one
  function getChat(nameButton) {
    $("#chat-box").empty();
    $("#people").empty();

    database.ref("chat/" + currentChatId).off("child_added");
    currentChatId = $(nameButton).attr("data-chatId");
    otherUsername = $(nameButton).attr("data-otherUsername");

    var messageNumber = 0;
    database.ref("users/" + otherUsername).child("usersChatWith").child(currentUsername).set(currentUsername);

    database.ref("chat/" + currentChatId).on("child_added", function(snapshot) {
          //Removes first message from database and page if the total number of messages reaches 20
          messageNumber++;
          if(messageNumber > 19) {
            messageNumber--;
            database.ref("chat/").once("child_added", function(firstChild) {
              database.ref("chat/" + firstChild.key).remove();
              $("#chat-box").find("div").first().remove();
            });
          };

          var messageDiv = $("<div>");
          $(messageDiv).append(snapshot.val().username + ": " + snapshot.val().message);
          $("#chat-box").append(messageDiv);

          //If current user's chat-box scroll is at the bottom, automatically scroll down.
          if($("#chat-box").scrollTop() +  $("#chat-box").innerHeight() + 30 > $("#chat-box")[0].scrollHeight){
            $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
          };

        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
    $("#chat-area").show();
  };

//After clicking the send button in the chat area, this function saves the sent message in the database
function setChat() {
  var message = $("#chat-input").val()
  $("#chat-input").val("");
  database.ref("chat/" + currentChatId).push({
    username: currentUsername,
    message: message
  });
};

function changePage() {
  hidePage();
  $("#chat-nav").addClass("active");
  $("#four").fadeIn(500);
}

$(document).on("click", "#send-button", function() {
  setChat();
});

$(document).on("click", ".usernameSpan", function() {
  getChat(this);
});

$(document).on("click", ".usernameSpanHome", function() {
  getChat(this);
  changePage();
});
//<-----------------------------------------------End Chat Box----------------------------------------------->


});//ending of document.ready() function


//<-----------------------------------------------Youtube API----------------------------------------------->
//youtube api has to be outside of document ready for some reason!
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var videos = ["DODLEX4zzLQ"]
var videosTitles = ["WATCH and TRY TO STOP LAUGHING - Super FUNNY VIDEOS compilation"];
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
  $("#vids").empty();
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
    newButton.attr("data-name", videosTitles[i]);
    newButton.addClass("like");
    newDiv.append(newButton);
    //change the target
    $("#vids").append(newDiv);

    var player;
    player = new YT.Player(videos[i], {
      height: '390',
      width: '640',
      videoId: videos[i]
    });
  };
};

//get video function for youtube videos
var apiKey = "AIzaSyBozDkvJZnsileIrGeXPDPaY3fZh68r2No";
function getVideos() {
  var searchTerm = $("#search-videos").val();
  $("#search-videos").val("");
  if(searchTerm !== "") {
    $("#invalid-search-video").empty();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + apiKey + "&maxResults=5&q=" + searchTerm
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var videosSearched = [];
      var videosSearchedTitles = [];

      for(var i =0; i < response.items.length; i++) {
        console.log(response);
        videosSearched.push(response.items[i].id.videoId);
        videosSearchedTitles.push(response.items[i].snippet.title);
      }

      videos = videosSearched;
      videosTitles = videosSearchedTitles;
      onYouTubeIframeAPIReady();
    });
  }
  else {
    $("#invalid-search-video").html("Please enter a search term.")
  };
};

$(document).on("click", "#search-button", function() {
  getVideos();
});
//<-----------------------------------------------End Youtube API----------------------------------------------->