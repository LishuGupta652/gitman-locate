import "./App.css";

import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FavoriteIcon, Room, Star } from "@mui/icons-material/";
import axios from "axios";

import { format } from "timeago.js";
import Register from "./components/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault(0);

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pin", newPin);
      console.log(res.data);
      setPins([...pins, res.data.pin]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/gitman/ckx9gi15o0puk16p4n137enk4"
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
                  offsetLeft={-viewport.zoom * 3.5}
                  offsetTop={-viewport.zoom * 7}
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
                        {Array(pin.rating).fill(<Star className="star" />)}
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
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="">Review</label>
              <textarea
                name=""
                id=""
                placeholder="Sayt us something about the place."
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <label htmlFor="">Rating</label>
              <select name="" id="" onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Add Pin
              </button>
            </form>
          </Popup>
        )}

        {currentUser ? (
          <button className="button logout">Log Out</button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowLogin(!showLogin)}
            >
              Register
            </button>
          </div>
        )}
        <Register />
      </ReactMapGL>
    </div>
  );
}

export default App;
