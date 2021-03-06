import React, { useState, useEffect } from 'react';
import TarjetaImagen from './components/TarjetaImagen';
import BuscarImagen from './components/BuscarImagen';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
        <BuscarImagen searchText={(text) => setTerm(text)} />
        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">Imagen No Encontrada</h1>}
        {isLoading ?
          <h1 className="text-6xl text-center mx-auto mt-32">Cargando...</h1> :
          <div className="grid grid-cols-3 gap-4">
            {images.map(image => <TarjetaImagen key={image.id} image={image} />)}
          </div>
        }
    </div>
  );
}

export default App;
