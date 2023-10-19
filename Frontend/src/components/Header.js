import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import logo from "../assets/aaark_logo.jpg";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useDispatch , useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  // const [selectedEvent, setSelectedEvent] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const Logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e,Value) => {

    const event = movies.find((m)=>m.title===Value);
    if(isUserLoggedIn){
      navigate(`/booking/${event._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#e5e5e5" }}>
      <Toolbar>
        <IconButton LinkComponent={Link} to="/" >
        <Box width={"20%"} >
          <img src={logo} alt="aark logo" width={"50px"} />
        </Box>
        </IconButton>
        <Box width={"40%"} margin={"auto"}>
          <Autocomplete
          onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField {...params} label="Search Events" />
            )}
          />
      
        </Box>
        <Box>
          <Tabs   value={value} onChange={(e, val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/events" label="events" />

            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
              <Tab  sx={{color:"#000000"}} LinkComponent={Link} to="/SignIn" label="SignIn" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab
                  icon={<PersonPinIcon />}
                  iconPosition="start"
                  LinkComponent={Link}
                  to="/user"
                  label="profile"
                />
                <Tab
                  onClick={() => Logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {isAdminLoggedIn && (
            <>
              <Tab LinkComponent={Link} to="/add" label="Add Event" />
                <Tab
                  icon={<PersonPinIcon />}
                  iconPosition="start"
                  LinkComponent={Link}
                  to="/user-organizer"
                  label="profile"
                />
                <Tab
                  onClick={() => Logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
              )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
