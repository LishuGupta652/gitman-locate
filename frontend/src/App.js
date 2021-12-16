import "./App.css";

import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
          latitude={27.1751}
          longitude={78.0421}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <FavoriteIcon style={{ color: "red" }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
