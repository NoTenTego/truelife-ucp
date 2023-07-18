import React from "react";
import Character from "./character/Character";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

function Characters({ userId }) {
  const { isLoading: isLoadingCharacters, data: dataCharacters } = useQuery(
    ["characters"],
    () =>
      makeRequest.get("/characters?userId=" + userId).then((res) => {
        return res.data;
      })
  );

  return (
    <motion.div
      id='portfolio'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoadingCharacters ? (
        <CircularProgress />
      ) : (
        <Container
          maxWidth={false}
          sx={{ width: "90%" }}
        >
          {dataCharacters.map((user, index) => (
            <Box
              key={index}
              mb={10}
              sx={{ borderBottom: "6px solid", borderColor: "divider" }}
            >
              <Character
                user={user}
                variables={user.id}
              />
            </Box>
          ))}
        </Container>
      )}
    </motion.div>
  );
}

export default Characters;
