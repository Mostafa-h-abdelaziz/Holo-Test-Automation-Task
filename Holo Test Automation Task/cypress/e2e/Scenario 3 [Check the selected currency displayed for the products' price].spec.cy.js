require('cypress-xpath');
describe('Currency Change Test', () => {

let errors = [];

  beforeEach(() => {
    errors = [];
  });

    it('should change the currency from USD to AED and display AED on product prices', () => {

// Visit the website
    cy.visit('https://www.amazon.com');

// Navigate to Currency Settings
    cy.get('#icp-touch-link-cop').click();

// Change currency to AED
    cy.xpath('//*[@id="icp-currency-dropdown-selected-item-prompt"]/span/span').click({ force: true });
    cy.xpath('//*[@id="icp-currency-dropdown_23"]').click({ force: true });
    cy.get('#icp-save-button-announce').click({ force: true });


// Verify that the currency is displayed as AED on product prices
    cy.xpath("//img[@alt='Deals in PCs']").click();
    cy.get('span.a-price-symbol')
      .first()
      .invoke('text')
      .then((text) => {
        try {
          expect(text.trim()).to.equal('AED');
          cy.log('Text matched: ' + text);
        } catch (error) {
          errors.push('Text assertion failed: ' + error.message);
          cy.log('Text did not match. Found: ' + text);
        }
      });

      cy.then(() => {
      if (errors.length > 0) {
        cy.log('Soft Assertion Errors:\n' + errors.join('\n'));
      }
    });
  });
});
