import "./App.css";

import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5939,
    longitude: 78.9629,
    zoom: 4,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Marker
          latitude={37.78}
          longitude={-122.41}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
