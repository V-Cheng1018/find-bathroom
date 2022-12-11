import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";
import BathroomPin from "../BathroomPin/BathroomPin";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
const Map = ({ coords }) => {
  const [map, setMap] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [bathroomCoordinates, setBathroomCoordinates] = useState([]);

  const classes = useStyles();
  const handleApiLoaded = (map, mapsApi) => {
    setMap(map);
    setMapsApi(mapsApi);
    setPlacesService(new mapsApi.places.PlacesService(map));
  };

  async function convertAddressToLatLng(placeID) {
    // Use the fetch API to make a request to the Geocoding API
    // Pass the place ID as a URL parameter
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeID}&key=${process.env.REACT_APP_GEOCODE_API}`
    );

    // Parse the response as JSON
    const data = await response.json();

    // Extract the latitude and longitude coordinates from the response
    const { lat, lng } = data.results[0].geometry.location;

    // Return the coordinates
    return { lat, lng };
  }

  async function callPlacesService(placeType) {
    //repeat api call for different type later
    const placesRequest = {
      location: coords,
      radius: 500,
      type: placeType,
    };

    //data.results[0].geometry
    placesService.textSearch(placesRequest, (response) => {
      const responseLimit = Math.min(5, response.length);
      for (let i = 0; i < responseLimit; i++) {
        const {
          name,
          formatted_address: address,
          place_id: placeID,
        } = response[i];

        console.log(name, " ", address, "", placeID);
        console.log(response[i]);

        // Call the convertAddressToLatLng function and pass it the place ID
        convertAddressToLatLng(placeID).then((newCoordinates) => {
          // Uses spread operator to push new coords on to the state variable
          setBathroomCoordinates((bathroomCoordinates) => [
            ...bathroomCoordinates,
            newCoordinates,
          ]);
        });
      }
    });
  }
  const handleClick = () => {
    callPlacesService("cafe");
    callPlacesService("park");
    callPlacesService("shopping_mall");
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
        <LocationPin lat={coords.lat} lng={coords.lng} text={"Current"} />
        {/* display bathroom on the map */}
        {bathroomCoordinates.map((coordinate) => (
          <BathroomPin lat={coordinate.lat} lng={coordinate.lng} />
        ))}
      </GoogleMapReact>
      <Button variant="contained" onClick={handleClick}>
        Find Bathroom
      </Button>
      {bathroomCoordinates.map((coordinate) => (
        <p>
          Latitude: {coordinate.lat}, Longitude: {coordinate.lng}
        </p>
      ))}
    </div>
  );
};
export default Map;
