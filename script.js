function load(url="login.html") {
    /*
    Loads to a specified page. loads to login page if page not specified.
    */

    window.location.href = "./" + url;
}

function redirect() {
    /*
    Redirects user to login page if email is not set in local storage.
    */
    
    if(sessionStorage.getItem("email") == null) {
        load();
    }
}