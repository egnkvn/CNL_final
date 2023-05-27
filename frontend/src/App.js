import './App.css';
import Home from "./pages/home/Home";
import Watch from './pages/watch/Watch';
import VideoPlayground from './components/VideoPlayground/videoplayground';
import {
  Link,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <h1>weq</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/VideoPlayground">Video Playground</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VideoPlayground" element={<VideoPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
