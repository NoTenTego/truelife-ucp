import React from "react";
import ServerStats from "./ServerStats";
import CharactersData from "./CharactersData";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Divider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { motion } from "framer-motion";

function Dashboard({ theme }) {
  return (
    <motion.div
      id='portfolio'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={2}
          columns={4}
        >
          <Grid sx={{ width: "100%" }}>
            <Typography
              variant='subtitle1'
              color='text.main'
              sx={{ width: "100%" }}
            >
              Statystyki serwera
            </Typography>
          </Grid>

          <ServerStats />

          <Grid sx={{ width: "100%" }} mt={2}>
            <Divider />
          </Grid>

          <CharactersData theme={theme} />
        </Grid>
      </ThemeProvider>
    </motion.div>
  );
}

export default Dashboard;
