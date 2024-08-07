import { Routes, Route } from "react-router-dom";
import Articles from './components/Articles';
import Nav from "./components/Nav";
import Article from "./components/Article";
import SignIn from "./components/SignIn";

function App() {

  return (
    <>
    <Nav />
    <Routes>
    <Route path='/' element={<Articles />} />
    <Route path= '/:article_id' element={<Article/>}/>
    <Route path= "/signin" element={<SignIn />} />
    </Routes>
    </>
  )
}

export default App
