import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poem from "./Poem/poem";
import Poems from "./Poems/poems";
import ComposePoem from "./ComposePoem/compose-poem";
import Author from "./Author/author";
import Search from "./Search/search";
import Login from "./Login/login";
import Signup from "./Signup/signup";
import { ProtectedRoute } from "../components/protected-route";

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Poems />} path="/" />
        <Route element={<Poem />} path="/poem/:poemId" />
        <Route element={<Author />} path="/author/:username" />
        <Route element={<Author />} path="/author/:username/followers" />
        <Route element={<Author />} path="/author/:username/following" />
        <Route element={<Author />} path="/author/:username/likes" />
        <Route element={<ProtectedRoute msg={"you are not allowed to see this"} redirect={"/"} ><Author /></ProtectedRoute>} path="/author/:username/saved" />
        <Route element={<ProtectedRoute msg={"log in if you want to post a poem"}><ComposePoem /></ProtectedRoute>} path="/compose" />
        <Route element={<Search />} path="/search" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
