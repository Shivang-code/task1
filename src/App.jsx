import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    loadMoreImages();
  }, []);

  useEffect(() => {
  window.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreImages();
    }
  };
}, []);


  const loadMoreImages = () => {
    const start = (page - 1) * (30) + 1;
    const newImages = [];
    for (let i = 0; i < 30; i++) {
      newImages.push(start + i);
    }
    setImages(prev => [...prev, ...newImages]);
    setPage(prev => prev + 1);
  };

  const closeModal = () => setSelectedIndex(null);
  const nextImage = () => { if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1); };
  const prevImage = () => { if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1); };


  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <div className="app">
      <div className="grid">
        {images.map((img, index) => (
          <img
            key={img}
            src={`https://placehold.co/200x200/jpg?text=${img}`}
            alt={`Image ${img}`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="arrow left" onClick={prevImage}>⬅</button>
            <img
              src={`https://placehold.co/2000x2000/jpg?text=${images[selectedIndex]}`}
              alt="Big view"
            />
            <button className="arrow right" onClick={nextImage}>➡</button>
          </div>
          <a
            className="download"
            href={`https://placehold.co/3900x3900/jpg?text=${images[selectedIndex]}`}
            download
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
