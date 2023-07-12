import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login"
import NewPost from "./pages/post";
import "./App.css";
import Search from "./pages/search";
import ViewPost from "./pages/post viewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/view_post/:post_id" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
