import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HailIcon from "@mui/icons-material/Hail";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CategoryIcon from "@mui/icons-material/Category";
import Work from "@mui/icons-material/Work";
import StoreIcon from "@mui/icons-material/Store";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import ActionAreaCard from "./Card";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CircularProgress from "@mui/material/CircularProgress";

function ServerStats() {
  const { isLoading, error, data } = useQuery(["dashboard/serverstats"], () =>
    makeRequest.get("/dashboard/serverstats").then((res) => {
      return res.data;
    })
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_accounts"]}
              description='Kont'
              icon=<ManageAccountsIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_characters"]}
              description='Postaci'
              icon=<HailIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_vehicles"]}
              description='Pojazdów'
              icon=<DirectionsCarIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_interiors"]}
              description='Nieruchomości'
              icon=<MeetingRoomIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_items"]}
              description='Przedmiotów'
              icon=<CategoryIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_factions"]}
              description='Frakcji'
              icon=<Work />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_businesses"]}
              description='Biznesów'
              icon=<StoreIcon />
            />
          </Grid>
          <Grid
            sm={1}
            sx={{
              minWidth: "300px",
              "@media (max-width: 700px)": {
                minWidth: "100%",
              },
            }}
          >
            <ActionAreaCard
              title={data[0]["count_of_op"]}
              description='Organizacji przestępczych'
              icon=<VapingRoomsIcon />
            />
          </Grid>
        </>
      )}
    </>
  );
}

export default ServerStats;
