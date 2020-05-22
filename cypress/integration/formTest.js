describe("This is a test preformed on the Form section", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Filling out information on Form", () => {
    cy.get('nav > div > [href="/pizza"]').click()

    cy.get('input[name="name"]')
      .type("Jon Doe")
      .should("have.value", "Jon Doe");
    cy.get('select')
      .select('large')
      .should("have.value", "large");
    cy.get('[for="pepperoni"] > input')
      .check()
      .should('be.checked');
    cy.get('[for="babySpinach"] > input')
      .check()
      .should('be.checked');
    cy.get('[for="mushrooms"] > input')
      .check()
      .should('be.checked');
    cy.get('[for="garlic"] > input')
      .check()
      .should('be.checked');
    cy.get('textarea')
      .type("Please don't eat my food during delivery!")
    cy.get('button').click();


  })
}); 