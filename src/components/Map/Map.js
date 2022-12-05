import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "../LocationPin/LocationPin";
import useStyles from "./styles";

const Map = ({ coords }) => {
  const classes = useStyles();
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
      >
        <LocationPin lat={coords.lat} lng={coords.lng} />
      </GoogleMapReact>
    </div>
  );
};
export default Map;
