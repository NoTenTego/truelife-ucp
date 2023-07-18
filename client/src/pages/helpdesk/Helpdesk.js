import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { makeRequest } from "../../axios";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Notification from "../global/Notification";

const columns = [
  {
    id: "id",
    label: "Identyfikator",
    align: "left",
  },
  {
    id: "category",
    label: "Kategoria",
    align: "left",
  },
  {
    id: "title",
    label: "Tytuł",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "username",
    label: "Stworzył",
    align: "left",
  },
  {
    id: "data",
    label: "Stworzono",
    align: "left",
  },
];

export default function Helpdesk({ theme, user }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [reports, setReports] = useState([]);
  const [category, setCategory] = useState("Inne");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchData = useCallback(async () => {
    const response = await makeRequest.post("helpdesk/getMyTopics", [user.id]);
    setTopics(response.data);
    setIsLoadingTopics(false);
  }, [user.id]);

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

  const fetchAllReports = async () => {
    const response = await makeRequest.post("helpdesk/getAllReports");
    setReports(response.data);
  };

  useEffect(() => {
    fetchData();

    if (user.admin > 0 || user.supporter > 0) {
      fetchAllReports();
    }
  }, [fetchData, user.admin, user.supporter]);

  const handleEnterReport = (topicId) => {
    navigate(`/helpdesk/${topicId}`);
  };

  const handleSaveReport = async () => {
    if (title.length > 3 && description.length > 10) {
      var userId = user.id;
      try {
        await makeRequest.post("helpdesk/createNewReport", {
          userId,
          category,
          title,
          description,
        });

        setOpenNotification(true);
        setNotificationText("Pomyślnie wysłano zgłoszenie do administracji.");
        setTitle("");
        setDescription("");
        fetchData();
      } catch (error) {
        console.error(error);
        setOpenNotification(true);
        setNotificationText("Nie udało się wysłać zgłoszenia.");
      }
    } else {
      setOpenNotification(true);
      setNotificationText("Rozpisz się bardziej!");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <motion.div
      id='portfolio'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoadingTopics ? (
        <CircularProgress />
      ) : (
        <ThemeProvider theme={theme}>
          {openNotification ? (
            <Notification
              text={notificationText}
              open={openNotification}
              setOpen={setOpenNotification}
            />
          ) : null}
          {user.admin > 0 || user.supporter > 0 ? (
            <>
              <Typography variant='h5'>Wszystkie zgłoszenia graczy</Typography>
              <Typography
                variant='body1'
                sx={{ marginBottom: "16px" }}
              >
                Więcej opcji uzyskasz, gdy wejdziesz w zgłoszenie
              </Typography>

              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer
                  component={Paper}
                >
                  <Table
                    stickyHeader
                    aria-label='sticky table'
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            sx={{ backgroundColor: "primary.dark" }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reports
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow
                              onClick={() => {
                                handleEnterReport(row.id);
                              }}
                              hover
                              role='checkbox'
                              tabIndex={-1}
                              key={index}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "primary.different",
                                },
                                "&:hover": {
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                if (column.id === "status") {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {value === 1 ? (
                                        <Chip
                                          icon={<LockOpenIcon />}
                                          label='Otwarte'
                                          color='success'
                                        />
                                      ) : (
                                        <Chip
                                          icon={<LockIcon />}
                                          label='Rozwiązane'
                                          color='info'
                                        />
                                      )}
                                    </TableCell>
                                  );
                                }
                                if (column.id === "data") {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {getTimeAgoString(value)}
                                    </TableCell>
                                  );
                                }
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component='div'
                  count={reports.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          ) : (
            <>
              <Typography variant='h5'>Moje zgłoszenia</Typography>
              <Typography variant='body1'>
                Centrum pomocy to miejsce gdzie możesz kontaktować się
                bezpośrednio z administracją
              </Typography>

              <TableContainer
                component={Paper}
                sx={{ marginTop: "16px", marginBottom: "32px" }}
              >
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.dark" }}>
                      <TableCell>Identyfikator</TableCell>
                      <TableCell>Nazwa zgłoszenia</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Opiekun</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topics.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => {
                          handleEnterReport(row.id);
                        }}
                        hover
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "primary.different",
                          },
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                        >
                          {row.title}
                        </TableCell>
                        <TableCell>
                          {row.status === 1 ? (
                            <>
                              <Chip
                                icon={<LockOpenIcon />}
                                label='Otwarte'
                                color='success'
                              />
                            </>
                          ) : (
                            <>
                              <Chip
                                icon={<LockIcon />}
                                label='Zamknięte'
                                color='error'
                              />
                            </>
                          )}
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ marginBottom: "25px" }} />
            </>
          )}

          {user.admin === 0 && user.supporter === 0 ? (
            <Stack spacing={2}>
              <Typography variant='h5'>Stwórz zgłoszenie</Typography>
              <FormControl
                fullWidth
                variant='filled'
              >
                <InputLabel id='demo-simple-select-label'>
                  Kategoria zgłoszenia
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={category}
                  label='Kategoria zgłoszenia'
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  <MenuItem value={"Punkty Premium"}>Punkty Premium</MenuItem>
                  <MenuItem value={"Zgłoś błąd w grze"}>
                    Zgłoś błąd w grze
                  </MenuItem>
                  <MenuItem value={"Zgłoś gracza"}>Zgłoś gracza</MenuItem>
                  <MenuItem value={"Apelacja od bana"}>
                    Apelacja od bana
                  </MenuItem>
                  <MenuItem value={"Apelacja od AJ"}>Apelacja od AJ</MenuItem>
                  <MenuItem value={"Problem z kontem"}>
                    Problem z kontem
                  </MenuItem>
                  <MenuItem value={"Problem z pojazdem/interiorem"}>
                    Problem z pojazdem/interiorem
                  </MenuItem>
                  <MenuItem value={"Inne"}>Inne</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='filled-basic'
                label='Tytuł zgłoszenia'
                variant='filled'
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
              <TextField
                id='filled-multiline-static'
                label='Opis zgłoszenia'
                multiline
                rows={6}
                variant='filled'
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveReport}
              >
                Wyślij zgłoszenie
              </Button>
            </Stack>
          ) : null}
        </ThemeProvider>
      )}
    </motion.div>
  );
}
