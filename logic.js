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
    //setup firebase
var config = {
    apiKey: "AIzaSyCYKMk2SKsg6pZ7afT9R-kOeQI2LJou-Xk",
    authDomain: "login-73b7d.firebaseapp.com",
    databaseURL: "https://login-73b7d.firebaseio.com",
    projectId: "login-73b7d",
    storageBucket: "login-73b7d.appspot.com",
    messagingSenderId: "371488327547"
  };
  //initialize firebase
  firebase.initializeApp(config);
  //var to refernce database
  var database = firebase.database();
  $(function(){
    //var to keep track of data
    var data= [];
    //listen for changes to firebase data
    database.ref.on("value", function (snapshot){
    console.log(snapshot.val());

});
});
});