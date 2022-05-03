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
    return preg_match($pattern, $email);
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

function validateRegForm($forename, $surname, $email, $password, $confirmPassword) {

    $validForename = verifyString($forename);
    $validSurname = verifyString($surname);
    $validEmail = verifyEmail($email);
    $validPassLength = verifyPasswordLength($password);
    $passContainsUpper = verifyPasswordContainsUpper($password);
    $passContainsNum = verifyPasswordContainsNum($password);
    $passContainsSpecial = verifyPasswordContainsSpecial($password);
    $passwordsMatch = verifyPasswordsMatch($password, $confirmPassword);

    if($validForename && $validSurname && $validPassLength && $passContainsUpper && $passContainsNum && $passContainsSpecial && $passwordsMatch) {
        return true;
    }
    else {
        $_SESSION["error"] = true;
        return false;
    }
}

function registerUser() {

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        $forename = $_POST["forename"];
        $surname = $_POST["surname"];
        $email = $_POST["email"];
        $password = $_POST["pass1"];
        $confirmPassword = $_POST["pass2"];

        $formIsValid = validateRegForm($forename, $surname, $email, $password, $confirmPassword);

        if($formIsValid) {
            load("./register.php");
        }
        else {
            load("./register.php");
        }
    }
}

?>