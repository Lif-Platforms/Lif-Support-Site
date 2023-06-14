import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login"
import NewPost from "./pages/post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new_post" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
