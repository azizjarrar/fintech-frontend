import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Signin from "./pages/signin";
import Dashboard from "./pages/dashboard";
import ReduxProvider from "./redux/redux_client_component";
import Notification from "./components/notification";
function App() {
  return (
    <ReduxProvider>
      <Router>
        <div className="bg-white min-h-screen">
          <Notification />
          <Routes>
            <Route path="/" element={<Dashboard />} />{" "}
            <Route path="/signin" element={<Signin />} />{" "}
            <Route path="/dashboard/*" element={<Dashboard />} />{" "}

          </Routes>
        </div>
      </Router>
    </ReduxProvider>
  );
}

export default App;
