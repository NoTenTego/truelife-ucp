import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const itemBox = [
  { item: "money", title: "Gotówka", description: "Gotówka" },
  { item: "bankmoney", title: "Pieniądze", description: "Stan konta w banku" },
  { item: "age", title: "Wiek", description: "Tyle masz wiosen" },
  { item: "height", title: "Długość", description: "Wzrost" },
  { item: "weight", title: "Szerokość", description: "Waga" },
  { item: "hoursplayed", title: "Przegrane godziny", description: "Stracony czas na postaci" },
  { item: "jobmoney", title: "Limit dorywczych", description: "Dzisiejszy zarobek na dorywczych" },
  { item: "kulturystyka", title: "Umięśnienie", description: "Siła masa moc kiełbasa" },
  { item: "kondycja", title: "Kondycja", description: "Tyle było biegane" },
];

function CharacterData({ user, Item }) {
  return (
    <Grid
      container
      columns={8}
      spacing={1}
    >
      {itemBox.map((data, index) => (
        <Grid
          xs={2.2}
          sx={{ minWidth: 300 }}
          key={index}
        >
          <Item>
            <Stack sx={{ justifyContent: "center" }}>
              <Typography
                variant='subtitle2'
              >
                {data.title}
              </Typography>
              <Typography variant='h5' color={"primary.main"}>
                {data.item === "money" || data.item === "bankmoney"
                  ? "$" + user[data.item]
                  : user[data.item]}{" "}
              </Typography>
              <Typography variant='subtitle2'>{data.description}</Typography>
            </Stack>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default CharacterData;
