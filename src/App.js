import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import GetLocationButton from "./components/GetLocation/GetLocationButton";
import { CssBaseline, Grid, Button } from "@material-ui/core";
const App = () => {
  const [coords, setCoords] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      }
    );
  }, []);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };
  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid
        container
        spacing={3}
        style={{ width: "100%" }}
        justifyContent="center"
      >
        <Grid item xs={12} md={8} align="center">
          <Map coords={coords} />
        </Grid>
      </Grid>
      <GetLocationButton coords={coords} setCoords={setCoords} />
    </>
  );
};

export default App;
