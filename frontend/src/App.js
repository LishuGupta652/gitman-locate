import "./App.css";

import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FavoriteIcon, Room } from "@mui/icons-material/";
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
        mapStyle="mapbox://styles/gitman/ckx9bxgi4asrn14o3nar1l32q"
      >
        <Marker
          latitude={27.1751}
          longitude={78.0421}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{ color: "slateblue ", fontSize: viewport.zoom * 5 }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
