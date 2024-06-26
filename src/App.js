import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import NewPost from "./pages/post";
import "./App.css";
import Search from "./pages/search";
import ViewPost from "./pages/post viewer";
import NotFound from "./pages/404";
import Footer from "./global-components/footer";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route exact path="/" element={<Main />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/search/:query/:filters?" element={<Search />} />
        <Route path="/view_post/:post_id" element={<ViewPost />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
