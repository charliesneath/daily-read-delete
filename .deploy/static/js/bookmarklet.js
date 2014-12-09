javascript:(function() {
    var head = document.getElementsByTagName('head')[0];
    var scripts = [
        'http://www.parsecdn.com/js/parse-1.3.0.min.js',
        'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
    ]

    // Considered 'true' when done = number of scripts to be loaded
    var done = 0;

    for (i=0; i < scripts.length; i++) {
        var script = document.createElement("script");
        script.src = scripts[i];
    }
    
    head.appendChild(script);

    function initBookmarklet() {
        (window.bookmarklet = function() {
            alert('scripts loaded');
            // Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn");
            // var currentUser = Parse.User.current();
        })();
    }
})();


javascript:(function() {

    var jquery = document.createElement('script');
    var parse = document.createElement('script');
    jqueryScript.src = 'http://www.parsecdn.com/js/parse-1.3.0.min.js';
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
        
    jquery.onload = function() {
        alert('loaded');
    };

    document.body.appendChild(script);
})();

            // if (currentUser == null) {
            //     alert('not logged in');
            // } else {
            //     // window.location.href = 'http://redmondo.github.io/daily-read';
            //     alert(currentUser.getEmail());
            // }



    document.body.appendChild(document.createElement('script')).src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    document.body.appendChild(document.createElement('script')).src='http://www.parsecdn.com/js/parse-1.3.0.min.js';


    script.onload = function() {
        alert('loaded');
    };



    function initBookmarklet() {
        (window.bookmarklet = function() {
            alert('test');
            Parse.initialize("9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7", "ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn");
            var currentUser = Parse.User.current();
        })();
    }


        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function()
        {
            if( (done < scripts.length) && ( !this.readyState 
                        || this.readyState == "loaded" 
                        || this.readyState == "complete") )
            {
                done++;

                // Continue your code
                initBookmarklet();

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                head.removeChild( script );
            }
        }