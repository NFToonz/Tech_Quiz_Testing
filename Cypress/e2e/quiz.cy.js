// End-2-End Testing - Users Interaction with the Quiz Application

describe('Quiz Application', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the root URL of the application // returns whole application
    });
    it('start quiz, display button and 1st question', () => {
        
        cy.get('button').contains('Start Quiz').click(); // Check if the "Start Quiz" button is visible
        cy.get('.card').should('be.visible'); // Check if the quiz card is visible
    
    });
    it('allows User to Answer Questions and complete the Quiz', () => {
    
        cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.contains('4').click(); // Simulate a click on the right answer
        cy.get('.selected').should('contain', '4'); // Check if the selected answer is highlighted
        cy.contains('Next').click(); // Simulate a click on the "Next" button
        cy.contains('What is the capital of France?').should('be.visible'); // Check if the second question is displayed
        cy.contains('Paris').click(); // Simulate a click on the right answer
        cy.get('.selected').should('contain', 'Paris'); // Check if the selected answer is highlighted
        cy.contains('Finish').click(); // Simulate a click on the "Finish" button
    });
});
