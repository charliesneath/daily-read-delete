javascript:(function() {
    var head = document.getElementsByTagName('head')[0];
    var urls = [
        'https://www.parsecdn.com/js/parse-1.3.0.min.js',
        'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
    ];

    var done = 0;
    var scripts = [];

    for (i = 0; i < urls.length; i++) {
        scripts[i] = document.createElement('script');
        scripts[i].src = urls[i];

        scripts[i].onload = scripts[i].onreadystatechange = function() {
            if ( (done < urls.length) && ( !this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
                done++;

                if (done == urls.length) {
                    initBookmarklet();
                }
            }
        };
        head.appendChild(scripts[i]);
    };
    
    function initBookmarklet() {
        (window.bookmarklet = function() {
            Parse.initialize('9j411v3qMnha3ScVq4R3tfmBQetiO44pp6M3siK7', 'ZSB9dwVSccu1o282JNEAChtv9jL6udvgOQXRR1pn');
            var currentUser = Parse.User.current();
            alert(currentUser);
            if (currentUser == null) {
                alert('going to log you in');
                window.location.href = 'http://redmondo.github.io/daily-read';
            } else {
                alert(currentUser.getEmail());
            }
        })();
    }
})();