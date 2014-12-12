// submit > already have account > log in > logged in user
// submit > create account >              > logged in user

Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn")

$(function() {
    var currentUser = Parse.User.current();
    
    // If the user is logged in
    if (currentUser) {
        if (window.location.pathname.search('next') > 0) {
            nextSite();
        } else {
            loggedInUser(currentUser);
        }
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
        addDailyReadUrl();
    });
})

function signUp() {
    var user = new Parse.User();
    user.set('username', $('#email').val());
    user.set('password', $('#password').val());
    user.set('email', $('#email').val());

    user.signUp(null, {
        success: function(user) {
            currentUser = Parse.User.current();

            // Hooray! Let them use the app now.
            var UserData = Parse.Object.extend("UserData");
            var userData = new UserData();
            
            // Set permissions on the new data.
            userData.setACL( new Parse.ACL(currentUser) );

            // Create user's row
            userData.set( 'email', currentUser.get('email') );
            userData.set('dailyReadUrls', []);
            userData.set('visitedUrls', []);
            userData.save();
            
            // Do stuff with the new user.
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

function loggedInUser() {
    // Set the views
    $('#sign-in').hide();
    $('#app').show();

    // Get list of user's saved urls.
    showDailyReadUrls();
}

function showDailyReadUrls() {
    var currentUser = Parse.User.current();
    var UserData = Parse.Object.extend("UserData");
    var query = new Parse.Query(UserData);

    // Get user's data.
    query.equalTo( 'email', currentUser.getEmail() );
    query.first({
        success: function(data) {
            var dailyReadUrls = data.get('dailyReadUrls');
            if ( dailyReadUrls.length > 0 ) {
                // Reset the list of URLs
                $('#urls').empty();
                $(dailyReadUrls).each(function() {
                    $('#urls').append('<li>' + this + '</li>');
                }
            )}
        },
        error: function(error) {
            alert(error.message);
        }
    })
}

function addDailyReadUrl() {
    var newDailyReadUrl = prompt('What\'s the URL?');
    
    var currentUser = Parse.User.current();
    email = currentUser.getEmail();

    // Save the URLs to the user
    var UserData = Parse.Object.extend("UserData");
    var query = new Parse.Query(UserData);
    query.equalTo('email', currentUser.get('email'));
    query.first({
        success: function(data) {
            data.addUnique('dailyReadUrls', newDailyReadUrl);
            data.save();
            showDailyReadUrls();
        },
        error: function(error) {
            console.log('Error getting data');
        }
    })
}

function removeUrl() {

}

function nextSite() {
    var UserData = Parse.Object.extend("UserData");
    var query = new Parse.Query(UserData);
    var currentUser = Parse.User.current();
    var email = currentUser.getEmail();

    query.equalTo("email", email);
    query.first({
        success: function(userData) {
            
            var foundNextUrl = false;
            
            while (!foundNextUrl) {
            
                // Find random index within length of URL index
                var i = Math.floor(Math.random() * (userData.get('dailyReadUrls').length));
                
                // If the URL is *not* found then this can be used.
                if (userData.get('visitedUrls').indexOf(userData.get('dailyReadUrls')[i]) == -1 ) {
                    foundNextUrl = true;
                    var nextUrl = userData.get('dailyReadUrls')[i]
                    userData.add('visitedUrls', nextUrl);
                    
                    // Reset the list of visited URLs if all have been visited.
                    if (userData.get('visitedUrls').length == userData.get('dailyReadUrls').length) {
                        userData.set('visitedUrls', []);
                    }
                    
                    // Update the data.
                    userData.save();
                }
            }
            
            // Go to the URL.
            window.location.href = nextUrl;
        },
        error: function(error) {
        }
    })
}

function logOut() {
    Parse.User.logOut();
    $('#sign-in').show();
    $('#app').hide();
}