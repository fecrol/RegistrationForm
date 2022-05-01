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

function updatePasswordsMatchIcon() {

    const passwordEl = document.getElementById("pass1");
    const confirmPassEl = document.getElementById("pass2");
    const passMatch = document.getElementById("pass-match");

    let passwordsMatch = verifyPasswordsMatch(passwordEl.value, confirmPassEl.value);

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

    const passwordEl = document.getElementById("pass1");
    const passwordVal = passwordEl.value;

    const parameters = [
        document.getElementById("pass-length"),
        document.getElementById("char-upper"),
        document.getElementById("char-num"),
        document.getElementById("char-special")
    ]
    
    const parameterOutput = [
        verifyPasswordLentgh(passwordVal),
        verifyPasswordContainsUpper(passwordVal),
        verifyPasswordContainsNum(passwordVal),
        verifyPasswordContainsSpecial(passwordVal)
    ]

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