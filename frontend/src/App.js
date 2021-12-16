import "./App.css";

import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FavoriteIcon, Room, Star } from "@mui/icons-material/";
import axios from "axios";

import { format } from "timeago.js";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 20.5939,
    longitude: 78.9629,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pin");
        console.log(res.data.pins);
        setPins(res.data.pins);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/gitman/ckx9bxgi4asrn14o3nar1l32q"
      >
        {pins &&
          pins.map((pin, index) => (
            <>
              <div key={pin._id}>
                <Marker
                  latitude={pin.lat}
                  longitude={pin.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <Room
                    style={{ color: "slateblue ", fontSize: viewport.zoom * 5 }}
                    onClick={() => handleMarkerClick(pin._id)}
                  />
                </Marker>
                {p._id === currentPlaceId && (
                  <Popup
                    latitude={pin.lat}
                    longitude={pin.long}
                    closeButton={true}
                    closeOnClick={true}
                    anchor="left"
                  >
                    <div className="card">
                      <label htmlFor="">Place</label>
                      <h4 className="place">{pin.title}</h4>
                      <label htmlFor="">Review</label>
                      <p className="desc">{pin.desc}</p>
                      <label htmlFor="">Rating</label>
                      <div className="start">
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                        <Star className="star" />
                      </div>

                      <label htmlFor="">Information</label>
                      <span className="username">
                        Created By <b>{pin.username}</b>
                      </span>
                      <span className="date">{format(pin.createdAt)}</span>
                    </div>
                  </Popup>
                )}
              </div>
            </>
          ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
