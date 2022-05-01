<?php

function load($page) {

    $url = "http://" . $_SERVER["HTTP_HOST"] . dirname($_SERVER["PHP_SELF"]);

    $url = rtrim($url, "/\\");
    $url .= "/" . $page;

    header("Location: $url");
    exit();
}

function verifyString($string) {

    $pattern = "/[`!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~\d ]/";
    return preg_match($patern, $string);
}

function verifyPasswordLength($password) {
    
    return strlen($password) >= 6;
}

function verifyPasswordContainsUpper($password) {

    $pattern = "/[A-Z]+/";
    return preg_match($pattern, $password);
}

function verifyPasswordContainsNum($password) {

    $pattern = "/\d/";
    return preg_match($pattern, $password);
}

function verifyPasswordContainsSpecial($password) {

    $patern = "/[!@#$%^&]+/";
    return preg_match($pattern, $password);
}

function  verifyPasswordsMatch($password1, $password2) {

    return $password2 == $password1;
}

function verifyPassword($password) {

    $validateLength = verifyPasswordLength($password);
    $containsUpper = verifyPasswordContainsUpper($password);
    $containsNum = verifyPasswordContainsNum($password);
    $containsSpecial = verifyPasswordContainsSpecial($password);
    
    return $validateLength && $containsUpper && $containsNum && $containsSpecial;
}

function validateRegForm() {

    return false;
}

function registerUser() {

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        $formIsValid = validateRegForm();

        if($formIsValid) {
            load("./register.php");
        }
        else {
            load("./register.php");
        }
    }
}

?>