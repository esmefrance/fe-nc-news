import { Routes, Route } from "react-router-dom";
import Articles from './components/Articles';
import Nav from "./components/Nav";
import Article from "./components/Article";
import Comments from "./components/Comments";

function App() {

  return (
    <>
    <Nav />
    <Routes>
    <Route path='/' element={<Articles />} />
    <Route path= '/:article_id' element={<Article/>}/>
    </Routes>
    </>
  )
}

export default App
