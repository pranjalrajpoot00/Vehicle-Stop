import React from "react";
import MapComponent from "./components/MapComponent";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="containerHeading">
        Vehicle Stoppage Identification and Visualization</h1>
      <MapComponent className="mapContainer" />
      {/* div */}
    </div>
  );
}

export default App;