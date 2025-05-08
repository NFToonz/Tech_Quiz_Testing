// Component test for the Quiz component
import React from 'react';
import { mount } from 'cypress/react';
import {Quiz} from '../client/src/components/Quiz.js' ;

describe ('Quiz component', () => {
   // Mock the fetch function
   beforeEach(() => { // Reset the intercept before each test
        cy.intercept('GET', '/src/quiz', {
            statusCode: 200, // Simulate/Mock a successful response
            body: [{
                question : 'What is 2 + 2?',
                answers : [
                    { answer: '3', isCorrect: false },
                    { answer: '4', isCorrect: true },
                    { answer: '5', isCorrect: false }
                ],
            },
            {
                question : 'What is the capital of France?',
                answers : [
                    { answer: 'Berlin', isCorrect: false },
                    { answer: 'Madrid', isCorrect: false },
                    { answer: 'Paris', isCorrect: true }
                ],
            }]
            });
        
        });
    });

    // Test cases for the Quiz component - adds more
    it('renders the quiz component', () => {
        mount(<Quiz />); // Mount the Quiz component in the test environment
        cy.contains('Start Quiz').should('be.visible'); // Check if the "Start Quiz" button is visible
    });

    it('fetches quiz data and displays questions', () => {
        mount(<Quiz />);
        cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.contains('What is 2 + 2?').should('be.visible'); // Check if the first question is displayed
    });

    it('allows User to select an answer', () => {
        mount(<Quiz />);
        cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.contains('4').click(); // Simulate a click on the right answer
        cy.get('.selected').should('contain', '4'); // Check if the selected answer is highlighted
    } );

    it('shows the next question when the "Next" button is clicked', () => {
        mount(<Quiz />);
        cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.contains('4').click(); // Simulate a click on the right answer
        cy.contains('Next').click(); // Simulate a click on the "Next" button
        cy.contains('What is the capital of France?').should('be.visible'); // Check if the second question is displayed
    }
    );
    // it('shows the result when the quiz is completed', () => {
    //     mount(<Quiz />);
    //     cy.contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
    //     cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
    //     cy.contains('4').click(); // Simulate a click on the right answer
    //     cy.contains('Next').click(); // Simulate a click on the "Next" button
    //     cy.contains('Paris').click(); // Simulate a click on the right answer
    //     cy.contains('Finish').click(); // Simulate a click on the "Finish" button
    //     cy.contains('You scored 2 out of 2!').should('be.visible'); // Check if the result is displayed
    // });
    