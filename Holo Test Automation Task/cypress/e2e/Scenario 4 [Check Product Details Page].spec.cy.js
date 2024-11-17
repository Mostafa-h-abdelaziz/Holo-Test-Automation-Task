require('cypress-xpath');
describe('Check Product Details Page', () => {

    it('should search for "Apple" in Electronics, verify product details, and add to cart', () => {
// Visit Amazon's homepage
    cy.visit('https://www.amazon.com');

// Select "Electronics" from the Search Dropdown
    cy.get('#searchDropdownBox').select('Electronics', { force: true });

// Search for "Apple"
    cy.get('#twotabsearchtextbox').type('Apple');
    cy.get('#nav-search-submit-button').click();

// Click on any product from the search results
    cy.get('.s-main-slot .s-result-item', { timeout: 2000 }).should('be.visible');
    cy.get('.s-result-item[data-component-type="s-search-result"]')
      .eq(11) // that has a price
      .find('h2 a')
      .click();


// Verify if the product is in stock or out of stock
    cy.get('#availability').then(($availability) => {
      const availabilityText = $availability.text().trim();
      cy.log('Availability:', availabilityText);
      expect(availabilityText).to.match(/In Stock|Out of Stock/i);
    });

// Verify the price of the product
    cy.get('#priceblock_ourprice, #priceblock_dealprice, .a-price .a-offscreen', { timeout: 10000 })
      .should('exist')
      .then(($price) => {
    const priceText = $price.text().trim();
    cy.log('Price:', priceText);
    expect(priceText).to.match(/\$\d+(\.\d{2})?/); // Regex for price format
  });

// Verify the rating of the product
    cy.get('#acrPopover').then(($rating) => {
      const ratingText = $rating.attr('title').trim();
      cy.log('Rating:', ratingText);
      expect(ratingText).to.match(/\d+(\.\d+)? out of 5/);
    });

// Verify shipping details
    cy.get('#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE, #mir-layout-DELIVERY_BLOCK-slot-DELIVERY_MESSAGE_LARGE').then(($shipping) => {
      const shippingText = $shipping.text().trim();
      cy.log('Shipping Details:', shippingText);
      expect(shippingText).not.to.be.empty; // Ensure shipping info exists
    });

// Add the product to the cart
    cy.get('#add-to-cart-button').click();

// Verify the product was added to the cart
    cy.get('#nav-cart-count').should('not.have.text', '0');
  });
});
