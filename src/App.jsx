import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* futuras rotas para edição, criação etc. podem vir aqui */}
      </Routes>
    </Router>
  );
}

export default App;
