import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Navigation from "./Navigation";
import ChatPerson from "./pages/ChatPerson";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="sm:ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat-person" element={<ChatPerson />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
