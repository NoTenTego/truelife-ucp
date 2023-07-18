import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

function CharacterVehicles({ user, Item, data}) {
  return (
    <Grid
      container
      columns={8}
      spacing={1}
    >
      {data.map((vehicle, index) => (
        <Grid
          xs={2.2}
          key={index}
          sx={{ minWidth: 400 }}
        >
          <Item>
            <Stack sx={{ justifyContent: "center" }}>
              <Typography
                variant='subtitle2'
              >
                {vehicle.plate.length > 0 ? vehicle.plate : 'Brak tablicy'}
              </Typography>
              <Typography variant='h5' color={"primary.main"}>{vehicle.vehbrand + ' ' + vehicle.vehmodel}</Typography>
              <Typography variant='subtitle2'>
                {vehicle.id}
              </Typography>
            </Stack>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default CharacterVehicles;
