import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toobar}>
        <Typography variant="h5" className e={classes.title}>
          Bathroom Finder
        </Typography>
        <Box display="flex">
          {/* <Typography variant="h6" className={classes.title}>
            Never Panic Again
          </Typography> */}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
