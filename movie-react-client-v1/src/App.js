import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/home/Home";
import Header from "./component/header/Header";
import Trailer from "./component/trailer/Trailer";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await api.get("api/v1/movies");

      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={"/"} element={<Home movies={movies} />}></Route>
          <Route path={"/Trailer/:ytTrailerId"} element={<Trailer />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
