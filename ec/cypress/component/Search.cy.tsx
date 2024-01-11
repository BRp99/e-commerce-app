import { BrowserRouter as Router } from "react-router-dom"
import SearchBox from "../../src/components/Search/SearchBox/SearchBox"

describe("SearchBox.cy.tsx", () => {
  it(" TEST 1: know if renders correctly and navigate on submit", () => {
    cy.mount(
      <Router>
        <SearchBox onQueryChange={() => {}} query="" />
      </Router>
    )

    cy.get('[data-testid="search-box-form"]').should("exist").submit()

    cy.get('[data-testid="search-box-input"]').type("Cypress Test")
  })

  it("TEST 2: checks the search button", () => {
    cy.wait(1000)
    cy.get('[data-testid="search-box-button"]').should("exist").click({ force: true })
  })

  it("TEST 2.1: checks the search button", () => {
    cy.get('[data-testid="search-box-button"]')
      .should("exist")
      .then(($button) => {
        cy.log("Find button:", $button)
      })
  })

  // it("TEST 3: submits the form on pressing Enter key", () => {
  //   cy.get('[data-testid="search-box-input"]').type("Cypress Test{enter}")

  //   cy.get('[data-testid="search-box-input"]').should("exist")
  // })
})
