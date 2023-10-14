import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";
import Map from "./components/Map";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="map" element={<Map />} />
        <Route path="chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
