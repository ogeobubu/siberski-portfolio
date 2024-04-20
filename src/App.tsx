import "./app.scss";
import Cursor from "./components/cursor";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Parallax from "./components/parallax";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";

function App() {
  return (
    <>
      <Cursor />
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
  );
}

export default App;
