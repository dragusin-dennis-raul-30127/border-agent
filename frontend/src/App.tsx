import { Route, Routes } from "react-router-dom";
import "./App.css";
import ControlPage from "./pages/Control";
import Login from "./pages/Login";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";

function App() {
  return (
    <>
      <NavigationMenu />
      <Routes>
        <Route path="/control" element={<ControlPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
