import { BrowserRouter as Router } from "react-router-dom"
import SearchBox from "../../src/components/Search/SearchBox/SearchBox"

const mountSearchBox = (onQueryChange: (_: string) => void, query: string) => {
  cy.mount(
    <Router>
      <SearchBox onQueryChange={onQueryChange} query={query} />
    </Router>
  )
}

describe("SearchBox.cy.tsx", () => {
  it(" TEST 1: know if renders correctly and navigate on submit", () => {
    mountSearchBox(() => {}, "")

    cy.get('[data-testid="search-box-form"]').should("exist").submit()

    cy.get('[data-testid="search-box-input"]').type("Cypress Test")
  })

  it("TEST 2: should not navigate with an empty query", () => {
    mountSearchBox(() => {}, "")

    cy.get('[data-testid="search-box-form"]').submit()

    cy.url().should("not.include", "/search/")
  })
})
