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

function verifyEmail(email) {
    /*
    Checks if the email address is valid to prevent invalid email input
    */

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return pattern.test(email);
}