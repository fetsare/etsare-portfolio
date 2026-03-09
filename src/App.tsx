import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
// import BookReviews from "./pages/BookReviews";
// import { BookProvider } from "./context/BookContext";

function App() {
  return (
    // <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            {/* <Route path="book-reviews" element={<BookReviews />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    // </BookProvider>
  );
}

export default App;
