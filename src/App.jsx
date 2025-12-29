import React from "react";
import PhotoBar from "./PhotoBar";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/photobar" element={<PhotoBar />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
