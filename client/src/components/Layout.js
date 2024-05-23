import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  
  return (
    <div style={{boxSizing:"border-box"}}>
      <AppBar>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                //margin: "-50px"
              }}
            >
              <NavLink
                to="/"
                style={{ color: "black", textDecoration: "none" }}
              >
                Home
              </NavLink>
            </Typography>
            <Stack direction="row" spacing={3}>
              {/* <TextField sx={{backgroundColor:"white"}} /> */}
                {/* <Sorts/> */}
              <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <div>{ children }</div>
    </div>
  );
};

export default Layout;
