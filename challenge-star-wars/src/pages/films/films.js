import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';

import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data.results);
        setLoading(false); // Marcar como completada la carga de datos
      } catch (error) {
        setError(error);
        setLoading(false); // Marcar como completada la carga de datos
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="h-0.5 bg-white w-full mb-6"></div>
      <h1 className="text-center text-4xl font-bold mb-12"> PELÍCULAS </h1>

      {/* Mostrar la rueda de carga si loading es verdadero */}
      {loading && (
        <div className="flex justify-center mt-4">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" /> {/* Rueda de cargando color blanco */}
        </div>
      )}

      {/* Mostrar las películas si loading es falso */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 justify-center">
          {films.map((film) => (
            <div key={film.url} className="hover:bg-white hover:bg-opacity-15  rounded-lg transition duration-300">
              <Link href={`/films/${film.url.split('/').slice(-2)[0]}`} legacyBehavior>
                <a className="flex flex-col items-center">
                  <img className="w-58 h-80" src="/images/films-images/generic-image.png" alt="Imagen genérica" />
                  <h2 className="text-center font-bold">{film.title}</h2>
                  <p className="text-center">Episodio: {film.episode_id}</p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Footer />
      {error && <p>Error al cargar las películas: {error.message}</p>}
    </div>
  );
};

export default FilmsPage;
