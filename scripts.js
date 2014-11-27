// submit > already have account > log in > logged in user
// submit > create account >              > logged in user

Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn")

$(function() {
    var currentUser = Parse.User.current();
    
    // If the user is logged in
    if (currentUser) {
        loggedInUser();
    }

    $("#credentials").submit(function(event) {
        // alert("Handler for .submit() called.");
        event.preventDefault();
        signUp();
    })

    $('#logout').click(function() {
        logOut();
        return false;
    });
})

function signUp() {
    var user = new Parse.User();
    user.set('username', $('#email').val());
    user.set('password', $('#password').val());
    user.set('email', $('#email').val());

    user.signUp(null, {
        success: function(user) {
        // Hooray! Let them use the app now.
            loggedInUser();
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            // alert("Error: " + error.code + " " + error.message);
            
            // If this user already exists log them in.
            if (error.code == 202) {
                logIn();
            }
        }
    });
};

function logIn() {
    // username + password
    Parse.User.logIn($('#email').val(), $('#password').val(), {
        success: function(user) {
            // Do stuff after successful login.
            var currentUser = Parse.User.current();
            loggedInUser();
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function loggedInUser() {
    $('#sign-in').hide();
    $('#app').show();   
}

function logOut() {
    Parse.User.logOut();
    $('#sign-in').show();
    $('#app').hide();       
}