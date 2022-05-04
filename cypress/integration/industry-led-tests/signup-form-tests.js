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

        cy.get("#forename").type(this.forename)      
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#surname").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        cy.get("#surname").type(this.surname)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#email").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        cy.get("#email").type(this.email)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#pass1").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        cy.get("#pass1").type(this.password)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#pass2").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })

        cy.get("#forename").clear()
        cy.get("#pass2").type(this.confirmPassword)
        cy.get("#submit").click();
        cy.get("input:invalid").should("have.length.greaterThan", 0)
        cy.get("#forename").then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
})