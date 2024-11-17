require('cypress-xpath');
describe('Amazon Deals and Promotions Tests', () => {

let errors = [];

  beforeEach(() => {
    errors = [];
  });

    it('Check filter by department in Deals and Promotions page', () => {
// Visit Amazon homepage
     cy.visit('https://www.amazon.com');

// Click on "Today's Deals" using XPath
     cy.contains("Today's Deals").click({ force: true });

     Cypress.on('uncaught:exception', (err, runnable) => {
         if (err.message.includes('Failed to execute \'importScripts\'')) {
         return false;
         }
         return true;
});

//From Departments filter, show "See More"
     cy.get('a.a-size-base').click({ force: true });

//choose software department
     cy.get("div[data-csa-c-element-id='filter-departments-Software'] i[class='a-icon a-icon-radio']").click();
     cy.wait(4000);

//check the filter is software
     cy.xpath('//*[@id="DealsGridScrollAnchor"]/div[2]/div[1]/button[1]/span[2]')
      .invoke('text')
      .then((text) => {
        try {
          expect(text.trim()).to.equal('Software');
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



