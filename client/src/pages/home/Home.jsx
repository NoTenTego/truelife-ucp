import React from "react";
import { ThemeProvider } from "@emotion/react";
import SignIn from "../../components/account/SignIn";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

function Home({ theme }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          fixed
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:'80vh'
          }}
        >
          <Grid
            container
            spacing={8}
            justifyContent='center'
            alignItems="center"
          >
            <Grid
              item
            >
              <SignIn theme={theme} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Home;
