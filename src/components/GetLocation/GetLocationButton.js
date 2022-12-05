import React, { useState } from "react";

import { Button } from "@material-ui/core";
/**
 * get Users coords first with web api
 * reverse geocode the cooordinate into address with google map api
 */
const GetLocationButton = (coords, setCoords) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [userAddress, setUserAddress] = useState("default");

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  //callback convert address when lat and long are set
  async function showPosition(position) {
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
    convertAddress(position.coords.latitude, position.coords.longitude);
  }

  const handleError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "denied") {
          alert("Did not enable location access");
        }
      });
    } else {
      alert("Unable to access your location.");
    }
  };

  function convertAddress(lat, long) {
    //setisLoading(true)
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GEOCODE_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserAddress(data.results[0].formatted_address);
      })
      .catch((error) => alert(error));
  }

  return (
    <>
      <Button variant="contained" onClick={getPosition}>
        Get Position
      </Button>
      <p>Lat: {lat}</p>
      <p>Long: {long}</p>

      <p>Location : {userAddress}</p>
    </>
  );
};

export default GetLocationButton;
