import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Footer = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Box
      sx={{
        display: "fixed",
        left: 0, bottom: 0, right: 0,
        width: "100%",
        height: "auto",
        backgroundColor: "#CDCDCD",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="End">
          <Grid item xs={12}>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Button variant="outlined" LinkComponent={Link} to="/Admin">
                  Organizer Login
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              React Starter App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
