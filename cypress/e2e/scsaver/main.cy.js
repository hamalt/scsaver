context("Test Scsaver.js", () => {
  beforeEach(function () {
    // Executed before each it().
    // Write the preprocessor you want to do every time it() is executed.
    cy.scsaverPage();
  });

  it("Enable auto start.", () => {
    cy.initScsaver({
      autoStart: true,
      waitTime: 2000
    });

    cy.get('.scsaver', { timeout: 4000 }).should('be.visible');
  });

  it("Disable auto start.", () => {
    cy.initScsaver({
      autoStart: false,
      waitTime: 2000
    });

    cy.get('.scsaver', { timeout: 4000 }).should('be.hidden');
  });

  // TODO: if empty release events
});