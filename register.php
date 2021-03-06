<?php
session_start();
require("./functions.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/48b1b4cd52.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./styles.css">
    <script src="./script.js"></script>
    <title>Sign Up</title>
</head>
<body>
    <div class="flex-container">
        <div id="response-card" class="response-card">

        </div>

        <div class="form">
            <h1>SIGN UP</h1>
            <form action="<?php registerUser(); ?>" method="post">
                <p><i id="forename-str" class="fa-solid fa-xmark"></i> Valid forename.</p>
                <input type="text" name="forename" id="forename" placeholder="Forename" onkeyup="updateValidForenameIcon()" required>
                <p><i id="surname-str" class="fa-solid fa-xmark"></i> Valid surname.</p>
                <input type="text" name="surname" id="surname" placeholder="Surname" onkeyup="updateValidSurnameIcon()" required>
                <p><i id="valid-email" class="fa-solid fa-xmark"></i> Valid email address.</p>
                <input type="email" name="email" id="email" placeholder="Email" onkeyup="updateValidEmailIcon()" required>
                <p><i id="pass-length" class="fa-solid fa-xmark"></i> Password is at least 6 characters long.</p>
                <p><i id="char-upper" class="fa-solid fa-xmark"></i> Password contains at least 1 uppercase character.</p>
                <p><i id="char-num" class="fa-solid fa-xmark"></i> Password contains at least 1 number.</p>
                <p><i id="char-special" class="fa-solid fa-xmark"></i> Password contains at least 1 of these special characters (!@#$%^&')</p>
                <input type="password" name="pass1" id="pass1" placeholder="Password" onkeyup="updateVerifyPasswordIcons()" required>
                <p><i id="pass-match" class="fa-solid fa-xmark"></i> Passwords match.</p>
                <input type="password" name="pass2" id="pass2" placeholder="Confirm Password" onkeyup="updatePasswordsMatchIcon()" required>
                <input type="submit" name="submit" id="submit" value="Sign Up">
            </form>
            <p>Already have an account? <a href="#">Sign in here</a></p>
        </div>
    </div>

    <script>
        fetchError();
    </script>
</body>
</html>