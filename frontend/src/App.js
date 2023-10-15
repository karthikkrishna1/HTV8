import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";

import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddPost from "./components/AddPost";
import PostDescriptionPage from "./components/PostDescriptionPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="posts/:id" element={<PostDescriptionPage />} />
        <Route path="add" element={<AddPost />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
