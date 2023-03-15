import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Create from "./components/Create";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Gallery />
        <About />
        <Create />
        <Signup />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
