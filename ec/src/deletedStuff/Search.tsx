// import styles from "./Search.module.css"
// import { useState } from "react"
// import { Product } from "../../context/StoreContext"
// import SearchBox from "./SearchBox/SearchBox"
// import SearchResults from "./SearchResults/SearchResults"

// export default function Search() {
//   const [results, setResults] = useState<SearchResultsType>("NoQuery")

//   function onQueryChange(newQuery: string) {
//     if (newQuery === "") setResults("NoQuery")
//     else fetchData(newQuery)
//   }

//   function fetchData(query: string) {
//     setResults("Fetching")
//     fetch("https://dummyjson.com/products/search?q=" + query)
//       .then((response) => response.json())
//       .then((data) => {
//         if (!Array.isArray(data.products)) {
//           setResults([])
//           throw new Error('The "products" property is not an array')
//         }

//         setResults(data.products)
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error)
//         setResults([])
//       })
//   }

//   function onProductSelected() {
//     setResults("NoQuery")
//   }

//   return (
//     <div className={styles.container}>
//       <SearchBox onQueryChange={onQueryChange} query="" />
//       <SearchResults results={results} onProductSelected={onProductSelected} />
//     </div>
//   )
// }

export {}
