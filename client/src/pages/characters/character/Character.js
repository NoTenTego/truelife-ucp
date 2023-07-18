import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CharacterData from "./CharacterData";
import CharacterEquipment from "./CharacterVehicles";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Character({ user }) {
  const { isLoading: isLoadingVehicles, data: dataVehicles } = useQuery(
    [`characters/getVehicles/${user.id}`],
    () =>
      makeRequest
        .get(`/characters/getVehicles?characterId=${user.id}`)
        .then((res) => {
          return res.data;
        })
  );

  var skinImage = "";
  try {
    skinImage = require("../../../assets/characters/skins/" + user.skin + ".webp");
  } catch (error) {

  }

  const [category, setCategory] = useState("character");

  const handleChangeCategory = (event, newCategory) => {
    setCategory(newCategory);
  };

  return (
    <>
      {isLoadingVehicles ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction='row'>
              <Avatar
                alt='Remy Sharp'
                src={skinImage}
                sx={{
                  width: 150,
                  height: 150,
                  border: "1px solid",
                  borderColor: "primary.main",
                  backgroundColor: "primary.different",
                }}
              />
              <Stack
                ml={2}
                sx={{ justifyContent: "center" }}
              >
                <Typography variant='h5'>{user.charactername}</Typography>
                <Typography variant='h8'>
                  {user.active === 1 ? "Postać aktywna" : "ZABLOKOWANA"}
                </Typography>
                <Typography
                  mt={2}
                  variant='h8'
                  color={"primary.main"}
                >
                  {user.class}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <TabContext value={category}>
            <Box
              mt={3}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <TabList
                onChange={handleChangeCategory}
                aria-label='Category List'
              >
                <Tab
                  label='Postać'
                  value='character'
                />
                <Tab
                  label='Pojazdy'
                  value='vehicles'
                />
              </TabList>
            </Box>
            <TabPanel value='character'>
              <CharacterData
                user={user}
                Item={Item}
              />
            </TabPanel>
            <TabPanel value='vehicles'>
              <CharacterEquipment
                user={user}
                Item={Item}
                data={dataVehicles}
              />
            </TabPanel>
          </TabContext>
        </>
      )}
    </>
  );
}

export default Character;
