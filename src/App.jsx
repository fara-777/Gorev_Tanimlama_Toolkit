import Counter from "./pages/Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/header";
import CrudPage from "./pages/CrudPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CrudPage />} />
          <Route path="counter" element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
