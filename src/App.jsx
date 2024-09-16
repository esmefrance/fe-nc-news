import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import Article from "./components/Article";
import SignIn from "./components/SignIn";
import ErrorPage from "./components/ErrorPage";

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
          <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
