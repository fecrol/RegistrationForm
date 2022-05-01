/// <reference types="cypress" />

describe("CSV tool automation", () => {
    
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })

    it("generate CSV data file", () => {
        cy.contains("Reset CSV").click()
        cy.wait(2000)
        
        cy.get('#select-key-drop-basic').select('First Name')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('Last Name')
        cy.get('#btn-add-prop').click()
        cy.get('#select-key-drop-basic').select('Email')
        cy.get('#btn-add-prop').click()

        cy.get('#entries-input').type("1")

        cy.contains('Generate CSV').click()
        cy.contains('Arrange CSV').click()
        cy.contains('Download CSV').click()
    })
})