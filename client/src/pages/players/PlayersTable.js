import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { makeRequest } from "../../axios";
import { motion } from "framer-motion";
import { ThemeProvider } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Notification from "../global/Notification";

const columns = [
  {
    id: "charactername",
    label: "Dane osobowe",
    minWidth: 150,
    align: "left",
    supporter: 1,
    admin: 1,
  },
  {
    id: "money",
    label: "Gotówka",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 3,
  },
  {
    id: "bankmoney",
    label: "Stan konta",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 3,
  },
  {
    id: "gender",
    label: "Płeć",
    minWidth: 50,
    align: "left",
    supporter: 1,
    admin: 1,
  },
  {
    id: "car_license",
    label: "Prawko kat. B",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 1,
  },
  {
    id: "bike_license",
    label: "Prawko kat. A",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 1,
  },
  {
    id: "hoursplayed",
    label: "Przegrane godziny",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 3,
  },
  {
    id: "maxinteriors",
    label: "Maks interiorów",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 2,
  },
  {
    id: "maxpojazdy",
    label: "Maks pojazdów",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 2,
  },
  {
    id: "celebryta",
    label: "Celebryta",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 1,
  },
  {
    id: "kulturystyka",
    label: "Kulturystyka",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 2,
  },
  {
    id: "kondycja",
    label: "Kondycja",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 2,
  },
  {
    id: "active",
    label: "Aktywna",
    minWidth: 50,
    align: "left",
    supporter: false,
    admin: 2,
  },
];

export default function PlayersTable({ theme, user }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [editCell, setEditCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeRequest.post("players/getPlayers");
      setRows(response.data);
      setIsLoadingData(true);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows
    .filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

  const handleSortClick = (columnId) => {
    const newSortConfig = {
      key: columnId,
      direction:
        sortConfig.key === columnId && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    };
    setSortConfig(newSortConfig);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updatePlayerValue = async (characterId, columnId, value) => {
    try {
      await makeRequest.post("players/updatePlayerValue", {
        characterId,
        columnId,
        value,
      });

      const updatedRows = rows.map((row) => {
        if (row.id === characterId) {
          return { ...row, [columnId]: value };
        }
        return row;
      });
      setRows(updatedRows);

      setOpenNotification(true);
      setNotificationText("Dane zostały pomyślnie zaktualizowane!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveRow = (
    event,
    rowId,
    columnId,
    columnAdmin,
    columnSupporter
  ) => {
    if (event.key === "Enter") {
      var accept = false;

      if (user.admin >= columnAdmin) {
        accept = true;
      }

      if (columnSupporter !== false && user.supporter >= columnSupporter) {
        accept = true;
      }

      if (accept) {
        setRows((prevRows) =>
          prevRows.map((prevRow) =>
            prevRow.id === rowId
              ? { ...prevRow, [columnId]: editValue }
              : prevRow
          )
        );
        updatePlayerValue(rowId, columnId, editValue);
        setEditCell(null);
      } else {
        setOpenNotification(true);
        setNotificationText(
          "Nie posiadasz wystarczających permisji, aby zaktualizować dane."
        );
      }
    } else if (event.key === "Escape") {
      setEditCell(null);
      setEditValue("");
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
      {!isLoadingData ? (
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

          <Typography
            variant='body1'
            mb={1}
          >
            Klikając na kolumne, możesz posortować dane.
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "77vh" }}
            >
              <Table
                stickyHeader
                aria-label='sticky table'
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{ backgroundColor: "primary.main" }}
                        key={column.id}
                        align={column.align}
                        style={{ maxWidth: column.minWidth }}
                        onClick={() => handleSortClick(column.id)}
                      >
                        {column.label}
                        {sortConfig.key === column.id && (
                          <span>
                            {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "primary.different",
                            },
                          }}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  setEditCell({ row, column });
                                  setEditValue(value);
                                }}
                              >
                                {editCell &&
                                editCell.row.id === row.id &&
                                editCell.column.id === column.id ? (
                                  <TextField
                                    variant='filled'
                                    label='Nowa wartość'
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    style={{ maxWidth: column.minWidth * 2 }}
                                    onKeyDown={(event) =>
                                      handleSaveRow(
                                        event,
                                        row.id,
                                        column.id,
                                        column.admin,
                                        column.supporter
                                      )
                                    }
                                  />
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
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
              rowsPerPageOptions={[25, 50, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {sortConfig.key ? (
              <Stack direction='row'>
                <TextField
                  label='Wyszukaj po danych osobowych'
                  value={searchTerm}
                  onChange={handleChange}
                  sx={{
                    width: "78%",
                    height: "60px",
                    margin: "5px",
                    marginRight: "0",
                  }}
                  variant='filled'
                />
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: "primary.differentLight",
                    width: "22%",
                    height: "55px",
                    margin: "5px",
                  }}
                  onClick={() => setSortConfig({ key: null, direction: null })}
                >
                  <Typography
                    variant='body2'
                    color='primary.anotherTextColor'
                  >
                    Wyłącz sortowanie
                  </Typography>
                </Button>
              </Stack>
            ) : (
              <TextField
                label='Wyszukaj po danych osobowych'
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: "100%", height: "60px", margin: "5px" }}
                variant='filled'
              />
            )}
          </Paper>
        </ThemeProvider>
      )}
    </motion.div>
  );
}
