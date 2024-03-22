import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/footer/Footer";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import EmptyState from "./pages/empty-state/EmptyState";
import MovieList from "./pages/movie-list/MovieList";
import MovieDetail from "./pages/movie-list/movie-detail/MovieDetail";
import SignIn from "./pages/sign-in/SignIn";

function App() {
  return (
    <BrowserRouter>
      {/* Wrap your routes with Routes component */}
      <div className="flex flex-col justify-between min-h-screen bg-[#163545]">
        <Routes>
          {/* Specify each route using Route component */}
          <Route path="/" element={<SignIn />} />
          <Route path="/empty-state" element={<EmptyState />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
