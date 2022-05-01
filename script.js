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

    let validateLength = verifyPasswordLentgh();
    let containsUppercase = verifyPasswordContainsUpper();
    let containsNum = verifyPasswordContainsNum();
    let containsSpecial = verifyPasswordContainsSpecial();
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

function checkIfEmailExists(email) {
    
    try {
        for(const key in localStorage) {
            if(email === JSON.parse(sessionStorage.getItem(key))["email"]) {
                return true;
            }
        }
    }
    catch {
        return false;
    }
}

function registerUser(forename, surname, email, password, confrimPassword) {

    if(!checkIfEmailExists(email) && verifyString(forename) && verifyString(surname) && verifyEmail(email) && verifyPassword(password) && verifyPasswordsMatch(password, confrimPassword)) {
        
        let user = {forename: forename,
        surname: surname,
        email: email,
        password: password
        };
        
        localStorage.setItem(sessionStorage.length, JSON.stringify(user));
    }
}