Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn")

function currentUser() {
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
    } else {
        // show the signup or login page
    }
}

$( "#target" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
});

var user = new Parse.User();
user.set("username", "my name");
user.set("password", "my pass");
user.set("email", "email@example.com");

// other fields can be set just like with Parse.Object
user.set("phone", "415-392-0202");

user.signUp(null, {
    success: function(user) {
        // Hooray! Let them use the app now.
    },
    error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
});