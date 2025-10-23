import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poem from "./Poem/poem";
import Poems from "./Poems/poems";
import ComposePoem from "./ComposePoem/compose-poem";
import Author from "./Author/author";
import Search from "./Search/search";
import Login from "./Login/login";
import Signup from "./Signup/signup";

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Poems />} path="/" />
        <Route element={<Poem />} path="/poem/:poemId" />
        <Route element={<Author />} path="/author/:username" />
        <Route element={<ComposePoem />} path="/compose" />
        <Route element={<Search />} path="/search" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
