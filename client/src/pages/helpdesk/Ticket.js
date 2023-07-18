import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@emotion/react";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Notification from "../global/Notification";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const TransparentTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.5),
  padding: "2px 6px",
  borderRadius: "6px",
  fontSize: "11px",
  height: "100%",
}));

function Ticket({ theme, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const fetchData = useCallback(async () => {
    const response = await makeRequest.post("helpdesk/getTopicData", {
      user,
      id,
    });
    setData(response.data);
  }, [user, id]);

  function getTimeAgoString(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const timeDiff = now.getTime() - date.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (timeDiff < 0) {
      return `przed chwilą`;
    }

    if (seconds < 60) {
      return `${seconds} sekund temu`;
    } else if (minutes < 60) {
      return `${minutes} minut temu`;
    } else if (hours < 24) {
      return `${hours} godzin temu`;
    } else {
      return `${days} dni temu`;
    }
  }

  const rankNames = {
    admin: [
      { id: 1, title: "Testowy Administrator" },
      { id: 2, title: "Administrator" },
      { id: 3, title: "Zastępca Właściciela" },
      { id: 4, title: "Właściciel" },
    ],

    supporter: [
      { id: 1, title: "Supporter" },
      { id: 2, title: "Zarządca Supportu" },
    ],
  };

  function getRankName(admin, supporter) {
    if (admin > 0) {
      let rankName = rankNames["admin"][admin - 1].title;
      return rankName;
    } else if (supporter > 0) {
      let rankName = rankNames["supporter"][supporter - 1].title;
      return rankName;
    } else {
      return 'Wsparcie Techniczne';
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddComment = async () => {
    if (content.length > 0) {
      var userId = user.id;
      try {
        await makeRequest.post("helpdesk/createNewComment", {
          userId,
          id,
          content,
        });

        setContent("");
        fetchData();
      } catch (error) {
        console.error(error);
        setOpenNotification(true);
        setNotificationText("Nie udało się dodać komentarza.");
      }
    } else {
      setOpenNotification(true);
      setNotificationText("Rozpisz się bardziej!");
    }
  };

  const handleChangeStatus = async () => {
    if (user.admin > 0 || user.supporter > 0) {
      const topicId = data.topicData.id;
      var status = data.topicData.status;

      if (status === 1) {
        status = 2;
      } else {
        status = 1;
      }

      await makeRequest.post("helpdesk/changeTopicStatus", {
        topicId,
        status,
      });

      fetchData();
    }
  };

  const handleDeleteTopic = async () => {
    if (user.admin > 1) {
      const topicId = data.topicData.id;

      await makeRequest.post("helpdesk/deleteTopic", {
        topicId,
      });

      navigate("/helpdesk");
    }
  };

  return (
    <motion.div
      id='portfolio'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeProvider theme={theme}>
        {openNotification ? (
          <Notification
            text={notificationText}
            open={openNotification}
            setOpen={setOpenNotification}
          />
        ) : null}

        {data.length === 0 ? null : (
          <Container
            maxWidth={false}
            sx={{
              "@media (max-width: 600px)": {
                width: "100%",
              },
              width: "100%",
            }}
          >
            <Stack spacing={2}>
              <Typography variant='h6'>{data.topicData.title}</Typography>
              <Box
                component={Paper}
                sx={{
                  height: "130px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  ...((user.admin > 0 || user.supporter > 0) && {
                    "&:hover": {
                      backgroundColor: "primary.different",
                      cursor: "pointer",
                    },
                  }),
                }}
                onClick={handleChangeStatus}
              >
                <Typography variant='span1'>
                  {data.topicData.status === 1 ? (
                    <LockOpenIcon
                      color='success'
                      sx={{ fontSize: "60px" }}
                    />
                  ) : data.topicData.status === 2 ? (
                    <LockIcon
                      color='info'
                      sx={{ fontSize: "60px" }}
                    />
                  ) : (
                    <LockIcon
                      color='error'
                      sx={{ fontSize: "60px" }}
                    />
                  )}
                </Typography>
                <Typography variant='span1'>
                  <b>Kategoria:</b> {data.topicData.category}
                </Typography>
              </Box>
              <Box
                component={Paper}
                sx={{ padding: "10px" }}
              >
                <Stack spacing={1.4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction='row'
                      spacing={1}
                    >
                      <Typography>{data.topicData.username}</Typography>
                      <TransparentTypography>
                        Autor zgłoszenia
                      </TransparentTypography>
                    </Stack>
                    <Typography variant='subtitle1'>
                      <b>{getTimeAgoString(data.topicData.data)}</b>
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography variant='span1'>
                    {data.topicData.description}
                  </Typography>
                </Stack>
              </Box>
              <Divider />
            </Stack>
            <Stack
              spacing={1}
              sx={{ marginTop: "16px" }}
            >
              {data.comments.map((comment, index) => (
                <Box
                  key={index}
                  component={Paper}
                  sx={{ padding: "10px" }}
                >
                  <Stack spacing={1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        direction='row'
                        spacing={1}
                      >
                        <Typography>{comment.username}</Typography>
                        {data.topicData.username === comment.username ? (
                          <TransparentTypography>
                            Autor zgłoszenia
                          </TransparentTypography>
                        ) : (
                          <TransparentTypography
                            sx={{ backgroundColor: "secondary.dark" }}
                          >
                            {getRankName(comment.admin, comment.supporter)}
                          </TransparentTypography>
                        )}
                      </Stack>
                      <Typography variant='subtitle1'>
                        <b>{getTimeAgoString(comment.created)}</b>
                      </Typography>
                    </Box>
                    <Divider />
                    <Typography variant='span1'><pre>{comment.content}</pre></Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
            {data.comments.length > 0 ? (
              <Divider
                sx={{
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
              />
            ) : null}

            {data.topicData.status === 1 ||
            user.admin > 0 ||
            user.supporter > 0 ? (
              <>
                <TextField
                  id='filled-multiline-static'
                  label='Dodaj komentarz'
                  multiline
                  rows={4}
                  variant='filled'
                  sx={{ width: "100%" }}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                  value={content}
                />
                {user.admin > 1 && data.topicData.status < 3 ? (
                  <Stack
                    direction={"row"}
                    spacing={0.5}
                    sx={{ marginTop: "6px" }}
                  >
                    <Button
                      variant='contained'
                      onClick={handleAddComment}
                      sx={{ width: "80%" }}
                    >
                      Dodaj komentarz
                    </Button>
                    <Button
                      variant='contained'
                      onClick={handleDeleteTopic}
                      sx={{ width: "20%" }}
                      color={"error"}
                    >
                      Usuń zgłoszenie
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    variant='contained'
                    onClick={handleAddComment}
                    sx={{ width: "100%", marginTop: "6px" }}
                  >
                    Dodaj komentarz
                  </Button>
                )}
              </>
            ) : (
              <Box
                component={Paper}
                sx={{
                  height: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant='subtitle1'>
                  Nie możesz odpowiadać na zamknięte zgłoszenie
                </Typography>
              </Box>
            )}
          </Container>
        )}
      </ThemeProvider>
    </motion.div>
  );
}

export default Ticket;
