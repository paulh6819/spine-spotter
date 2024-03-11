import "./App.css";

import Navigation from "./components/Navigation";
import DropArea from "./components/DropArea";
import Footer from "./components/Footer";
import UpLoadFile from "./components/UpLoadFile";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-container">
        <h1 style={{ color: "#4c4b4b", padding: " 11px" }}>
          How much are the books worth infront of you?
        </h1>

        <DropArea />
        <UpLoadFile />
      </main>
      <Footer />
    </div>
  );
}

export default App;
