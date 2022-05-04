<?php

function load($page) {

    $url = "http://" . $_SERVER["HTTP_HOST"] . dirname($_SERVER["PHP_SELF"]);

    $url = rtrim($url, "/\\");
    $url .= "/" . $page;

    header("Location: $url");
    exit();
}

function verifyEmail($email) {

    $pattern = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    return preg_match($pattern, $email) == 1 ? true : false;
}

function verifyString($string) {

    $pattern = "/[`!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~\d ]/";
    return preg_match($patern, $string) == 1 ? false : true;
}

function verifyPasswordLength($password) {
    
    return strlen($password) >= 6 ? true : false;
}

function verifyPasswordContainsUpper($password) {

    $pattern = "/[A-Z]+/";
    return preg_match($pattern, $password) == 1 ? true : false;
}

function verifyPasswordContainsNum($password) {

    $pattern = "/\d/";
    return preg_match($pattern, $password) == 1 ? true : false;
}

function verifyPasswordContainsSpecial($password) {

    $pattern = "/[!@#$%^&]+/";
    return preg_match($pattern, $password) == 1 ? true : false;
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

function validateRegForm($forename, $surname, $email, $password, $confirmPassword) {

    $validForename = verifyString($forename);
    $validSurname = verifyString($surname);
    $validEmail = verifyEmail($email);
    $validPassword = verifyPassword($password);
    $passwordsMatch = verifyPasswordsMatch($password, $confirmPassword);

    if($validForename && $validSurname && $validPassword && $passwordsMatch) {
        $_SESSION["error"] = false;
        unset($_SESSION["data"]);
        return true;
    }
    else {
        $_SESSION["error"] = true;
        $_SESSION["data"] = ["forename" => $forename, "surname" => $surname, "email" => $email];
        return false;
    }
}

function registerUser() {

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        $forename = htmlspecialchars($_POST["forename"]);
        $surname = htmlspecialchars($_POST["surname"]);
        $email = htmlspecialchars($_POST["email"]);
        $password = htmlspecialchars($_POST["pass1"]);
        $confirmPassword = htmlspecialchars($_POST["pass2"]);

        $formIsValid = validateRegForm($forename, $surname, $email, $password, $confirmPassword);

        if($formIsValid) {
            load("./register.php");
        }
        else {
            load("./register.php");
        }
    }
}

function resetSessionData() {

    if(isset($_SESSION["error"])) {
        unset($_SESSION["error"]);
    }
    
    if(isset($_SESSION["data"])) {
        unset($_SESSION["data"]);
    }
}

?>