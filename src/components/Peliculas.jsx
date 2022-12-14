import React from "react";
import { useState, useEffect } from "react";
import Logout from "./Logout";

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    let api_key = "65ac98c7e8553bc17656ed4fe49ec9d3";
    const fetchPeliculas = async () => {
      try {
        const respuesta = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-MX&page=${pagina}`
        );

        switch (respuesta.status) {
          case 200:
            const datos = await respuesta.json();
            console.log(datos.results);
            setPeliculas(datos.results);
            break;
          case 401:
            console.log("Key incorrecta");
            break;
          case 404:
            console.log("No disponible");
            break;
          default:
            console.log(`Error ${respuesta.status}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPeliculas();
  }, [pagina]);

  const anterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  const siguiente = () => {
    if (pagina < 1000) {
      setPagina(pagina + 1);
    }
  };

  return (
    <div className="App">
      <div className="encabezado">
        <h1>
          {" "}
          <img src="tmdb.svg" width="80px" alt="TMDB" /> Peliculas
        </h1>
      </div>

      <div className="contenedor" id="contenedor">
        {peliculas.map((pelicula) => (
          <div className="pelicula" key={pelicula.title}>
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
              title={pelicula.overview}
              alt={pelicula.title}
            />
            <p className="titulo">{pelicula.title}</p>
            <p className="puntuacion">
              <i class="fa-solid fa-star"></i> {pelicula.popularity}
            </p>
          </div>
        ))}
      </div>

      <div className="paginacion">
        <button id="btnAnterior" onClick={anterior}>
          Anterior
        </button>
        <button id="btnSiguiente" onClick={siguiente}>
          Siguiente
        </button>
        <Logout/>
      </div>
    </div>
  );
}



export default Peliculas;
