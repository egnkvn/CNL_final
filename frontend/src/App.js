import './App.css';
import Home from "./pages/home/Home";
import VideoPlayground from './pages/VideoPlayground/videoplayground';
import {
  Link,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VideoPlayground" element={<VideoPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
