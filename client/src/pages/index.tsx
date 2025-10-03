import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poem from "./poem";
import Poems from "./poems";
import ComposePoem from "./compose-poem";
import UserProfile from "./user-profile";
import Search from "./search";
import Login from "./login";
import Register from "./register";
import Test from "./test";

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Poems />} path="/" />
        <Route element={<Poem />} path="/poem/:poemId" />
        <Route element={<UserProfile />} path="/profile/:userId" />
        <Route element={<ComposePoem />} path="/compose" />
        <Route element={<Search />} path="/search" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Test />} path="/test" />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
