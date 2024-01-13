// import { BrowserRouter as Router } from "react-router-dom"
// import CategoriesPage from "../../src/components/CategoryPage/CategoriesPage"

// const mountCategoriesPage = () => {
//   cy.mount(
//     <Router>
//       <CategoriesPage />
//     </Router>
//   )
// }

describe("CategoriesPage", () => {
  it("TEST 1: visit ", () => {
    // mountCategoriesPage()
    cy.visit("http://localhost:3000/categories/fragrances")
  })

  it("TEST 2: should display the category title", () => {
    // mountCategoriesPage()

    cy.get("[data-cy=cypress-category-title]").should("exist")
  })

  // it("TEST 3: should display product cards", () => {
  // mountCategoriesPage()

  //   cy.get("[data-cy=cypress-product-card]").should("have.length.greaterThan", 0)
  // })

  // it("TEST 4: should navigate back to the home page", () => {
  // mountCategoriesPage()
  //   cy.get("[data-cy=cypress-back-button]").click()
  // })
})
