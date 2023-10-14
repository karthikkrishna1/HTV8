import { Route } from "react-router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={""} />
        <Route path="posts/:id" element={""} />
      </Routes>
    </div>
  );
}

export default App;
