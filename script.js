function verifyEmail(email) {
    /*
    Checks if the email address is valid to prevent invalid email input.
    */

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return pattern.test(email);
}

function verifyPassword(password) {
    /*
    Verifies that a password is long enough, contains at least 1 upper 
    case letter, number and special character to prevent weak passwords.
    */

    let validateLength = verifyPasswordLentgh(password);
    let containsUppercase = verifyPasswordContainsUpper(password);
    let containsNum = verifyPasswordContainsNum(password);
    let containsSpecial = verifyPasswordContainsSpecial(password);
    let passwordIsValid = validateLength && containsUppercase && containsNum && containsSpecial;

    return passwordIsValid;
}

function verifyPasswordLentgh(password) {

    return password.length >= 6;
}

function verifyPasswordContainsUpper(password) {
    
    return /[A-Z]+/.test(password);
}

function verifyPasswordContainsNum(password) {

    return /\d/.test(password);
}

function verifyPasswordContainsSpecial(password) {

    return /[!@#$%^&']+/.test(password);
}

function verifyPasswordsMatch(password, confrimPassword) {
    /*
    Verifies that repeated password matches the original password.
    */

    return confrimPassword === password;
}

function verifyString(string) {
    /*
    Verifies that the string does not contain any special characters or numbers.
    */

    const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d ]/;

    return pattern.test(string) ? false : true;
}

function updateValidForenameIcon() {

    const forename = document.getElementById("forename").value;
    const icon = document.getElementById("forename-str");

    let validString = verifyString(forename);

    if(validString && forename.length > 0) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-check");
        icon.style.color = "#00FF00";
    }
    else {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "#ee3344";
    }
}

function updateValidSurnameIcon() {

    const surname = document.getElementById("surname").value;
    const icon = document.getElementById("surname-str");

    let validString = verifyString(surname);

    if(validString && surname.length > 0) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-check");
        icon.style.color = "#00FF00";
    }
    else {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "#ee3344";
    }
}

function updateValidEmailIcon() {

    const email = document.getElementById("email").value;
    const icon = document.getElementById("valid-email");

    let validEmail = verifyEmail(email);

    if(validEmail && email.length > 0) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-check");
        icon.style.color = "#00FF00";
    }
    else {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "#ee3344";
    }
}

function updatePasswordsMatchIcon() {

    const password = document.getElementById("pass1").value;
    const confirmPass = document.getElementById("pass2").value;
    const passMatch = document.getElementById("pass-match");

    let passwordsMatch = verifyPasswordsMatch(password, confirmPass);

    if (passwordsMatch) {
        passMatch.classList.remove("fa-xmark");
        passMatch.classList.add("fa-check");
        passMatch.style.color = "#00FF00";
    }
    else {
        passMatch.classList.remove("fa-check");
        passMatch.classList.add("fa-xmark");
        passMatch.style.color = "#ee3344";
    }
}

function updateVerifyPasswordIcons() {

    const passwordVal = document.getElementById("pass1").value;

    const parameters = [
        document.getElementById("pass-length"),
        document.getElementById("char-upper"),
        document.getElementById("char-num"),
        document.getElementById("char-special")
    ];
    
    const parameterOutput = [
        verifyPasswordLentgh(passwordVal),
        verifyPasswordContainsUpper(passwordVal),
        verifyPasswordContainsNum(passwordVal),
        verifyPasswordContainsSpecial(passwordVal)
    ];

    for(let i = 0; i < parameterOutput.length; i++) {
        if(parameterOutput[i]) {
            parameters[i].classList.remove("fa-xmark");
            parameters[i].classList.add("fa-check");
            parameters[i].style.color = "#00FF00";
        }
        else {
            parameters[i].classList.remove("fa-check");
            parameters[i].classList.add("fa-xmark");
            parameters[i].style.color = "#ee3344";
        }
    }
}

function fetchError() {

    const url = "./getError.php";
    
    fetch(url).then(res => res.json()).then(data => {
        
        displayResponse(data);
    })
}

function displayError() {
    
    const responseEl = document.getElementById("response-card");
    
    responseEl.innerHTML = "";
    
    responseEl.style.background = "#ee3344";
    
    responseEl.innerHTML = `<h1>An Error has occured! Please try again.</h1>`;
}

function displaySuccess() {
    
    const responseEl = document.getElementById("response-card");
    
    responseEl.innerHTML = "";
    
    responseEl.style.background = "#32CD32";
    
    responseEl.innerHTML = `<h1>You have registered successfully!</h1>`;
}

function displayResponse(response) {

    if(response["error"] == true) {
        displayError();
        insertDataToInput(response);
        updateValidForenameIcon();
        updateValidSurnameIcon();
        updateValidEmailIcon();
    }
    
    if(response["error"] == false) {
        displaySuccess();
    }
}

function insertDataToInput(response) {

    const forenameField = document.getElementById("forename");
    const surnameField = document.getElementById("surname");
    const emailField = document.getElementById("email");

    forenameField.value = response["forename"];
    surnameField.value = response["surname"];
    emailField.value = response["email"];
}