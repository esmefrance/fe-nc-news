import { Routes, Route } from "react-router-dom";
import Articles from "./components/AllArticles/Articles";
import Nav from "./components/Nav";
import Article from "./components/SingleArticle/Article";
import SignIn from "./components/SignIn";
import ErrorPage from "./components/ErrorPage";
import PostArticle from "./components/postArticle/PostArticle";

function App() {
  return (
    <>
      <nav>
        <Nav />
      </nav>
      <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/:article_id" element={<Article />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/add-article" element={<PostArticle />} /> */}
          <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
