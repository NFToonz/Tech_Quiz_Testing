// End-2-End Testing - Users Interaction with the Quiz Application
import React from 'react';
import { mount } from 'cypress/react';
import { Quiz } from '../client/src/components/Quiz.js';

describe('Quiz Application', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the root URL of the application
    });
    it('start quiz, display button and 1st question', () => {
        mount(<Quiz />); // Mount the Quiz component
        cy.contains('Start Quiz').should('be.visible'); // Check if the "Start Quiz" button is visible
        cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.contains('What is 2 + 2?').should('be.visible'); // Check if the first question is displayed
    });
    it('allows User to Answer Questions and complete the Quiz', () => {
        mount(<Quiz />); // Mount the Quiz component
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
