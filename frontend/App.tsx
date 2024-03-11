import "./App.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { UploadContainer } from "./components/upload/UploadContainer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-container">
        <h1 style={{ color: "#4c4b4b", padding: " 11px" }}>
          How much are the books worth infront of you?
        </h1>
        <UploadContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
