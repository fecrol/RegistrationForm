<?php

require("./functions.php");

const filePath = "./cypress/downloads/generatedBy_react-csv.csv";
echo json_encode(getCsvData(filePath));

?>