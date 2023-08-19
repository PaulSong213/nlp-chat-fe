import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Navigation from "./Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
