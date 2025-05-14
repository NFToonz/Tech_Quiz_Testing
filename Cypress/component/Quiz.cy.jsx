// Component test for the Quiz component
import Quiz from '../../client/src/components/Quiz';

describe ('Quiz component', () => {
   // Mock the fetch function
   beforeEach(() => { // Reset the intercept before each test
        cy.intercept('GET', '/src/quiz');
           
            

    // Test cases for the Quiz component - adds more
    it('renders the quiz component', () => {
        cy.mount(<Quiz />); // Mount the Quiz component in the test environment
        cy.get('button').contains('Start Quiz').should('be.visible'); // Check if the "Start Quiz" button is visible
    });

    it('fetches quiz data and displays questions', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.get('h2').contains('What is 2 + 2?').should('be.visible'); // Check if the first question is displayed
    });

    it('allows User to select an answer', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.contains('What is 2 + 2?').should('be.visible'); // Check if the first question is displayed
        cy.get('.answer').should('have.length', 4); // Check if there are 4 answer options
        cy.contains('4').click(); // Simulate a click on the right answer
        cy.get('.selected').should('contain', '4'); // Check if the selected answer is highlighted
    } );

    it('shows the next question when the "Next" button is clicked', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click(); // Simulate a click on the "Start Quiz" button
        cy.wait('@getQuiz'); // Wait for the quiz data to be fetched
        cy.contains('What is 2 + 2?').should('be.visible'); // Check if the first question is displayed
        cy.get('.answer').should('have.length', 4); // Check if there are 4 answer options
        cy.contains('4').click(); // Simulate a click on the right answer
        cy.get('button').contains('Next').click(); // Simulate a click on the "Next" button
        cy.contains('What is the capital of France?').should('be.visible'); // Check if the second question is displayed
    }
    );}
)})