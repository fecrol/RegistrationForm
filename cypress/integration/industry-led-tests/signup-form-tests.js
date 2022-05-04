/// <reference types="cypress" />

describe("sign up form tests", () => {

    before(() => {
        cy.wrap("Maciej").as("forename")
        cy.wrap("Fec").as("surname")
        cy.wrap("maciej.fec@email.com").as("email")
        cy.wrap("P@5sw0rd").as("password")
        cy.wrap("P@5sw0rd").as("confirmPassword")
    })
    
    beforeEach(() => {
        cy.visit("http://localhost/_industryled/register.php")
        cy.viewport(1280, 920)
    })

    it("does not submit an empty form", () => {

        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#forename").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    it("does not submit a partially complete form", function () {

        // Submits form with forename only expecitng error message on surname field
        cy.get("#forename").type(this.forename)      
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#surname").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        // Submits form with forename and surname expecting error message on email field
        cy.get("#surname").type(this.surname)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#email").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        // Submits form with forename, surname, email expecting error message on password field
        cy.get("#email").type(this.email)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#pass1").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        // Submits form with forename, surname, email and password expecting error message on confirm password field
        cy.get("#pass1").type(this.password)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#pass2").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        // Submits form with surname, email, password and confirm password expecting error message on forename field
        cy.get("#forename").clear()
        cy.get("#pass2").type(this.confirmPassword)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#forename").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    it("checks forename is validated", function () {
        
        const badForename = "M@ciej"
        const badForename2 = "N1c 0l\"'#"
        
        // Checks that invalid icon is displayed
        cy.get("#forename-str").should("have.class", "fa-xmark")
        cy.get("#forename-str").should("not.have.class", "fa-check")

        // Checks that valid icon is displayed after inputting valid forename
        cy.get("#forename").type(this.forename)
        cy.get("#forename-str").should("have.class", "fa-check")
        cy.get("#forename-str").should("not.have.class", "fa-xmark")

        // Checks that invalid icon is displayed after inputting invalid forename
        cy.get("#forename").clear()
        cy.get("#forename").type(badForename)
        cy.get("#forename-str").should("have.class", "fa-xmark")
        cy.get("#forename-str").should("not.have.class", "fa-check")

        // Checks that invalid icon is displayed after inputting invalid forename
        cy.get("#forename").clear()
        cy.get("#forename").type(badForename2)
        cy.get("#forename-str").should("have.class", "fa-xmark")
        cy.get("#forename-str").should("not.have.class", "fa-check")
    })

    it("checks surname is validated", function() {

        const badSurname = "F3c"
        const badSurname2 = "M0n t|}ro"
        
        // Checks that invalid icon is displayed
        cy.get("#surname-str").should("have.class", "fa-xmark")
        cy.get("#surname-str").should("not.have.class", "fa-check")

        // Checks that valid icon is displayed after inputting valid surname
        cy.get("#surname").type(this.surname)
        cy.get("#surname-str").should("have.class", "fa-check")
        cy.get("#surname-str").should("not.have.class", "fa-xmark")

        // Checks that invalid icon is displayed after inputting invalid surname
        cy.get("#surname").clear()
        cy.get("#surname").type(badSurname)
        cy.get("#surname-str").should("have.class", "fa-xmark")
        cy.get("#surname-str").should("not.have.class", "fa-check")

        // Checks that invalid icon is displayed after inputting invalid surname
        cy.get("#surname").clear()
        cy.get("#surname").type(badSurname2)
        cy.get("#surname-str").should("have.class", "fa-xmark")
        cy.get("#surname-str").should("not.have.class", "fa-check")
    })

    it("checks email is validated", function() {

        const badEmail = "maciej.fec.gmail@.com"

        // Checks that invalid icon is displayed
        cy.get("#valid-email").should("have.class", "fa-xmark")
        cy.get("#valid-email").should("not.have.class", "fa-check")

        // Checks that valid icon is displayed after inputting valid email
        cy.get("#email").type(this.email)
        cy.get("#valid-email").should("have.class", "fa-check")
        cy.get("#valid-email").should("not.have.class", "fa-xmark")
        
        // Checks that invalid icon is displayed after inputting invalid email
        cy.get("#email").clear()
        cy.get("#email").type(badEmail)
        cy.get("#valid-email").should("have.class", "fa-xmark")
        cy.get("#valid-email").should("not.have.class", "fa-check")
    })

    it("checks password length is validated", () => {

        const badPass = "pass"
        const validPass = "abcdef"
        const validPass2 = "password"

        // Checks that invalid icon is displayed
        cy.get("#pass-length").should("have.class", "fa-xmark")
        cy.get("#pass-length").should("not.have.class", "fa-check")

        // Checks if valid icon is displayed when 6 charatcer long password is inputted
        cy.get("#pass1").type(validPass)
        cy.get("#pass-length").should("have.class", "fa-check")
        cy.get("#pass-length").should("not.have.class", "fa-xmark")

        // Checks if valid icon is displayed when password longer than 6 characters is inputted
        cy.get("#pass1").clear()
        cy.get("#pass1").type(validPass2)
        cy.get("#pass-length").should("have.class", "fa-check")
        cy.get("#pass-length").should("not.have.class", "fa-xmark")

        // Checks if invalid icon is displayed when password less than 6 characters long is inputted
        cy.get("#pass1").clear()
        cy.get("#pass1").type(badPass)
        cy.get("#pass-length").should("have.class", "fa-xmark")
        cy.get("#pass-length").should("not.have.class", "fa-check")
    })

    it("checks password contains at least 1 uppercase character is validated", () => {

        const validPass = "PasS"
        const badPass = "pass"

        // Checks that invalid icon is displayed
        cy.get("#char-upper").should("have.class", "fa-xmark")
        cy.get("#char-upper").should("not.have.class", "fa-check")

        // Checks if valid icon is displayed when password contains an uppercase character
        cy.get("#pass1").type(validPass)
        cy.get("#char-upper").should("have.class", "fa-check")
        cy.get("#char-upper").should("not.have.class", "fa-xmark")

        // Checks if invalid icon is displayed when password does not contain an uppercase character
        cy.get("#pass1").clear()
        cy.get("#pass1").type(badPass)
        cy.get("#char-upper").should("have.class", "fa-xmark")
        cy.get("#char-upper").should("not.have.class", "fa-check")
    })

    it("checks password contains at least 1 number is validated", () => {

        const validPass = "pa55"
        const badPass = "pass"

        // Checks that invalid icon is displayed
        cy.get("#char-num").should("have.class", "fa-xmark")
        cy.get("#char-num").should("not.have.class", "fa-check")

        // Checks if valid icon is displayed when password contains a number
        cy.get("#pass1").type(validPass)
        cy.get("#char-num").should("have.class", "fa-check")
        cy.get("#char-num").should("not.have.class", "fa-xmark")

        // Checks if invalid icon is displayed when password does not contain a number
        cy.get("#pass1").clear()
        cy.get("#pass1").type(badPass)
        cy.get("#char-num").should("have.class", "fa-xmark")
        cy.get("#char-num").should("not.have.class", "fa-check")
    })

    it("checks password contains at least 1 special character is validated", () => {
        /*
        The valid special characters are: !@#$%^&'
        */

        const validPass = "p@$$!"
        const validPass2 = "#%^'~"
        const badPass = "[{(~;"

        // Checks that invalid icon is displayed
        cy.get("#char-special").should("have.class", "fa-xmark")
        cy.get("#char-special").should("not.have.class", "fa-check")

        // Checks if valid icon is displayed when password contains a valid special character
        cy.get("#pass1").type(validPass)
        cy.get("#char-special").should("have.class", "fa-check")
        cy.get("#char-special").should("not.have.class", "fa-xmark")

        // Checks if valid icon is displayed when password contains a valid special character
        cy.get("#pass1").clear()
        cy.get("#pass1").type(validPass2)
        cy.get("#char-special").should("have.class", "fa-check")
        cy.get("#char-special").should("not.have.class", "fa-xmark")

        // Checks if invalid icon is displayed when password does not contain a valid special character
        cy.get("#pass1").clear()
        cy.get("#pass1").type(badPass)
        cy.get("#char-special").should("have.class", "fa-xmark")
        cy.get("#char-special").should("not.have.class", "fa-check")
    })

    it("checks multiple password validations are preformed", function() {

        const passLengthAndUpper = "Password"
        const passLengthUpperAndNum = "Passw0rd"
        const passUpperNumAndSpecial = "P@55w"

        // Checks that invalid icon is displayed for all password validations
        cy.get("#pass-length").should("have.class", "fa-xmark")
        cy.get("#char-upper").should("have.class", "fa-xmark")
        cy.get("#char-num").should("have.class", "fa-xmark")
        cy.get("#char-special").should("have.class", "fa-xmark")

        // Checks valid icon is displayed for length and upper charatcer
        cy.get("#pass1").type(passLengthAndUpper)
        cy.get("#pass-length").should("have.class", "fa-check")
        cy.get("#char-upper").should("have.class", "fa-check")
        cy.get("#char-num").should("have.class", "fa-xmark")
        cy.get("#char-special").should("have.class", "fa-xmark")

        // Checks valid icon is displayed for length, upper charatcer and number
        cy.get("#pass1").clear()
        cy.get("#pass1").type(passLengthUpperAndNum)
        cy.get("#pass-length").should("have.class", "fa-check")
        cy.get("#char-upper").should("have.class", "fa-check")
        cy.get("#char-num").should("have.class", "fa-check")
        cy.get("#char-special").should("have.class", "fa-xmark")

        // Checks valid icon is displayed for upper charatcer, number and special character
        cy.get("#pass1").clear()
        cy.get("#pass1").type(passUpperNumAndSpecial)
        cy.get("#pass-length").should("have.class", "fa-xmark")
        cy.get("#char-upper").should("have.class", "fa-check")
        cy.get("#char-num").should("have.class", "fa-check")
        cy.get("#char-special").should("have.class", "fa-check")

        // Checks valid icon is displayed for all fields
        cy.get("#pass1").clear()
        cy.get("#pass1").type(this.password)
        cy.get("#pass-length").should("have.class", "fa-check")
        cy.get("#char-upper").should("have.class", "fa-check")
        cy.get("#char-num").should("have.class", "fa-check")
        cy.get("#char-special").should("have.class", "fa-check")
    })

    it("checks passwords match is validated", function() {

        const notMatchingPass = "Password"

        // Checks that invalid icon is displayed
        cy.get("#pass-match").should("have.class", "fa-xmark")
        cy.get("#pass-match").should("not.have.class", "fa-check")

        // Checks invalid icon is displayed when passwords are not matching
        cy.get("#pass1").type(this.password)
        cy.get("#pass2").type(notMatchingPass)
        cy.get("#pass-match").should("have.class", "fa-xmark")
        cy.get("#pass-match").should("not.have.class", "fa-check")

        // Checks valid icon is displayed when passwords are matching
        cy.get("#pass1").clear()
        cy.get("#pass2").clear()
        cy.get("#pass1").type(this.password)
        cy.get("#pass2").type(this.confirmPassword)
        cy.get("#pass-match").should("have.class", "fa-check")
        cy.get("#pass-match").should("not.have.class", "fa-xmark")
    })
})