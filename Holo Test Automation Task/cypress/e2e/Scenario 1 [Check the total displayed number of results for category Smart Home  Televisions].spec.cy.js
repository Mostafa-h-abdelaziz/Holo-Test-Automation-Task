require('cypress-xpath');
describe('Amazon Smart Home Tests', () => {

let errors = [];

  beforeEach(() => {
    errors = [];
  });
  
    it('Check the total displayed number of results for Televisions', () => {

// visit amazon
    cy.visit('https://www.amazon.com');

// open the side menu
    cy.get('#nav-hamburger-menu').click();

// move to television section
    cy.contains('Smart Home').click({ force: true });
  //cy.contains('Home Entertainment').click();
    cy.contains('span', 'Electronics', { timeout: 2000 }).should('be.visible').click();
    cy.contains('Televisions & Video Products').click();
    cy.contains('a', 'Televisions').click({ force: true });

    cy.wait(5000);

// Get the total number of results from the selector
    cy.get('div.a-section.a-spacing-small.a-spacing-top-small span').should('be.visible').then((total) => {
    const totalResults = parseInt(total.text(), 10);

    cy.wait(5000);

// Ensure that the total number of displayed products matches the total results
    cy.get('div.a-section.a-spacing-small.a-spacing-top-small span')
    .invoke('text')
    .then((text) => {

// Use a regular expression to extract the number 24
    const match = text.match(/1-(\d+)/);
    const result = match ? match[1] : 'Not found';
    cy.log('Extracted number: ' + result);
    console.log('Extracted number: ', result);

    cy.wait(5000);

    cy.get('div.s-main-slot > div[data-component-type="s-search-result"]')
      .its('length')
      .then((count) => {
    cy.log('Number of displayed results: ' + count);
        console.log('Number of displayed results: ', count);

        try {
          expect(count).to.be.at.least(24, 'Expected at least 24 results');
        } catch (error) {
          errors.push(error.message); 
        }
     });

      cy.then(() => {
      if (errors.length > 0) {
        throw new Error('Soft Assertion Errors:\n' + errors.join('\n'));
      }
    });

    
      });
    });
  });
});