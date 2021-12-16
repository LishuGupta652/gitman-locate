import "./App.css";

import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FavoriteIcon, Room, Star } from "@mui/icons-material/";
import axios from "axios";

import { format } from "timeago.js";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const currentUser = "lishu";

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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 5 });
  };

  const handleAddClick = (e) => {
    console.log(e);
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/gitman/ckx9bxgi4asrn14o3nar1l32q"
        onDblClick={handleAddClick}
        transitionDuration={500}
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
                    style={{
                      color:
                        pin.username === currentUser ? "tomato" : "slateblue",
                      fontSize: viewport.zoom * 7,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleMarkerClick(pin._id, pin.lat, pin.long)
                    }
                  />
                </Marker>
                {pin._id === currentPlaceId && (
                  <Popup
                    latitude={pin.lat}
                    longitude={pin.long}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => setCurrentPlaceId(null)}
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
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={true}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            first
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
