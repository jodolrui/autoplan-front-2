describe("autoplan", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("diplays record", () => {
    cy.get("div.m-cell.m-cell__first-row.m-cell__first-col").should(
      "have.text",
      "Denominación",
    );
    cy.get(":nth-child(3) > .m-cell").should("have.text", "Dirección");
    cy.get(":nth-child(2) > .m-cell").should("have.text", "ST Benimaclet");
    cy.get(":nth-child(2) > .m-cell").click();
    for (let i = 1; i <= 10; i++) cy.get("#backspace").click();
    cy.get("#shift").click();
    cy.get("#m").click();
    "assanassa".split("").forEach((element) => {
      cy.get("#" + element.toLowerCase()).click();
    });
    cy.get(":nth-child(2) > .m-cell").should("have.text", "ST Massanassa");
  });
});
