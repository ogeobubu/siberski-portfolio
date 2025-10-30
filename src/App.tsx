import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cursor from "./components/cursor";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Parallax from "./components/parallax";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import Books from "./components/books";

function App() {
  return (
    <Router>
      <Cursor />
      <Routes>
        <Route path="/" element={
          <>
            <section id="Homepage">
              <Navbar />
              <Hero />
            </section>
            <section id="Services">
              <Parallax type="services" />
            </section>
            <section>
              <Services />
            </section>
            <section id="Portfolio">
              <Parallax type="portfolio" />
            </section>
            <Portfolio />
            <section id="Contact">
              <Contact />
            </section>
          </>
        } />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
