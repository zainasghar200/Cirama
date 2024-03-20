import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import EmptyState from "./pages/empty-state/EmptyState";
import MovieList from "./pages/movie-list/MovieList";
import SignIn from "./pages/sign-in/SignIn";

function App() {
  return (
    <BrowserRouter>
      {/* Wrap your routes with Routes component */}
      <Routes>
        {/* Specify each route using Route component */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/empty-state" element={<EmptyState />} />
        <Route path="/movie-list" element={<MovieList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
