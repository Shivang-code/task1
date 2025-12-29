import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  loadMoreImages,
  setSelectedIndex,
  closeModal,
} from "./photoSlice";

function PhotoBar() {
  const dispatch = useDispatch();
  const { images, selectedIndex } = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(loadMoreImages());
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        dispatch(loadMoreImages());
      }
    };
  }, []);

  const nextImage = () => {
    if (selectedIndex < images.length - 1) {
      dispatch(setSelectedIndex(selectedIndex + 1));
    }
  };

  const prevImage = () => {
    if (selectedIndex > 0) {
      dispatch(setSelectedIndex(selectedIndex - 1));
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") dispatch(closeModal());
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
            key={index}
            src={`https://placehold.co/200x200/jpg?text=${img}`}
            alt={`Image ${img}`}
            onClick={() => dispatch(setSelectedIndex(index))}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={() => dispatch(closeModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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

export default PhotoBar;
