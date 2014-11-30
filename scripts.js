// submit > already have account > log in > logged in user
// submit > create account >              > logged in user

Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn")

$(function() {
    var currentUser = Parse.User.current();
    
    // If the user is logged in
    if (currentUser) {
        loggedInUser(currentUser);
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

    $('#add-url').click(function() {
        addUrl();
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
            loggedInUser();
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function loggedInUser(currentUser) {
    // Set the views
    $('#sign-in').hide();
    $('#app').show();

    // Get list of user's saved urls
    retrieveUrls(currentUser);
}

function logOut() {
    Parse.User.logOut();
    $('#sign-in').show();
    $('#app').hide();
    retrieveUrls();
}

function addUrl() {
    var newUrl = prompt('What\' the URL?');
    var currentUser = Parse.User.current();
    email = currentUser.getEmail();

    var Url = Parse.Object.extend("Url");
    var url = new Url();
    url.setACL(new Parse.ACL(currentUser));

    url.set('email', email);
    url.set('url', newUrl);
    url.save(null, {
        success: function(data) {
            retrieveUrls(currentUser);
        },
        error: function(error) {
            alert('Error saving new flow');
        }
    })
}

function removeUrl() {

}

function retrieveUrls(currentUser) {
    var Url = Parse.Object.extend("Url");
    var query = new Parse.Query(Url);

    // Clear list of URLS
    $('#urls').empty();

    // Find all flows associated with the current username.
    query.equalTo('email', currentUser.get('email'));
    query.find({
        success: function(data) {
            $(data).each(function() {
                $('#urls').append('<li>' + this.get('url') + '</li>');
            })
        },
        error: function(error) {
            console.log('Error getting data');
        }
    })
}