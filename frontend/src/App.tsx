import { Route, Routes } from "react-router-dom";
import "./App.css";
import ControlPage from "./pages/Control";
import Login from "./pages/Login";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import Dashboard from "./pages/Dashboard";
import ControlList from "./pages/ControlList";
import Borders from "./pages/Borders";

function App() {
  return (
    <>
      <NavigationMenu />
      <Routes>
        <Route path="/control/new" element={<ControlPage />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/control" element={<ControlList />}></Route>
        <Route path="/borders" element={<Borders />}></Route>
      </Routes>
    </>
  );
}

export default App;
