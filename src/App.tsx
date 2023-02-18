import React from "react";
import { Route, Routes } from "react-router";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage></AuthPage>}></Route>
      <Route path="/home" element={<HomePage></HomePage>}></Route>
    </Routes>
  );
};

export default App;
