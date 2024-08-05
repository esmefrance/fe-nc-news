import { Routes, Route } from "react-router-dom";
import Articles from './components/Articles';
import Nav from "./components/Nav";

function App() {

  return (
    <>
    <Nav />
    <Routes>
    <Route path='/' element={<Articles />} />
    </Routes>
    </>
  )
}

export default App
