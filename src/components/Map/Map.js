import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
const Map = ({ coords }) => {
  const [map, setMap] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const classes = useStyles();
  const handleApiLoaded = (map, mapsApi) => {
    setMap(map);
    setMapsApi(mapsApi);
    setPlacesService(new mapsApi.places.PlacesService(map));
  };

  const handleClick = () => {
    console.log(coords);
    const placesRequest = {
      location: coords,
      radius: 500,
      type: ["cafe"],
    };

    placesService.textSearch(placesRequest, (response) => {
      const responseLimit = Math.min(5, response.length);
      for (let i = 0; i < responseLimit; i++) {
        console.log(response[i]);
      }
    });
  };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        center={coords}
        defaultCenter={{ lat: 40.7831, lng: -73.9712 }}
        defaultZoom={17}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={""}
        onChildClick={""}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        //Onload set a map placeservice object
      >
        <LocationPin lat={coords.lat} lng={coords.lng} />
      </GoogleMapReact>
      <Button variant="contained" onClick={handleClick}>
        Find Bathroom
      </Button>
    </div>
  );
};
export default Map;
