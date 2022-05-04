<?php

session_start();
require("functions.php");

if(isset($_SESSION["error"]) && $_SESSION["error"] == true) {
    $data = ["error" => $_SESSION["error"], "forename" => $_SESSION["data"]["forename"], "surname" => $_SESSION["data"]["surname"], "email" => $_SESSION["data"]["email"]];
    echo json_encode($data);
    resetSessionData();
}
else if (isset($_SESSION["error"]) && $_SESSION["error"] == false) {
    $data = ["error" => $_SESSION["error"]];
    echo json_encode($data);
    resetSessionData();
}
else {
    $data = ["error" => null];

    echo json_encode($data);
}
?>