import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Unstable_Grid2";

export default function CharactersData({ theme }) {
  const { isLoading: isLoadingMoney, data: dataMoney } = useQuery(
    ["dashboard/getTopMoney"],
    () =>
      makeRequest.get("/dashboard/getTopMoney").then((res) => {
        return res.data;
      })
  );

  const { isLoading: isLoadingActivity, data: dataActivity } = useQuery(
    ["dashboard/getTopActivity"],
    () =>
      makeRequest.get("/dashboard/getTopActivity").then((res) => {
        return res.data;
      })
  );

  const { isLoading: isLoadingFactions, data: dataFactions } = useQuery(
    ["dashboard/getTopFactions"],
    () =>
      makeRequest.get("/dashboard/getTopFactions").then((res) => {
        return res.data;
      })
  );

  const { isLoading: isLoadingBusinesses, data: dataBusinesses } = useQuery(
    ["dashboard/getTopBusinesses"],
    () =>
      makeRequest.get("/dashboard/getTopBusinesses").then((res) => {
        return res.data;
      })
  );

  return (
    <>
      {isLoadingMoney || isLoadingActivity || isLoadingFactions || isLoadingBusinesses ? (
        <CircularProgress />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid
            sm={1}
            sx={{
              minWidth: "50%",
              "@media (max-width: 850px)": {
                minWidth: "100%",
              },
            }}
          >
            <Typography
              variant='subtitle1'
              color='text.main'
              mb={2}
              mt={1}
            >
              Gracze z największym majątkiem
            </Typography>
            <TableContainer component={Paper}>
              <Table
                aria-label='simple table'
                size='small'
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.dark" }}>
                    <TableCell align='left'>Miejsce</TableCell>
                    <TableCell align='left'>Imię i nazwisko</TableCell>
                    <TableCell align='left'>Kwota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataMoney.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:nth-of-type(odd)": {
                          backgroundColor: "primary.different",
                        },
                      }}
                    >
                      <TableCell align='left'>{index + 1 + "."}</TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        align='left'
                      >
                        {row.charactername}
                      </TableCell>
                      <TableCell align='left'>${row.bankmoney}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            sm={1}
            sx={{
              minWidth: "50%",
              "@media (max-width: 850px)": {
                minWidth: "100%",
              },
            }}
          >
            <Typography
              variant='subtitle1'
              color='text.main'
              mb={2}
              mt={1}
            >
              Gracze z największą aktywnością
            </Typography>
            <TableContainer component={Paper}>
              <Table
                aria-label='simple table'
                size='small'
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.dark" }}>
                    <TableCell>Miejsce</TableCell>
                    <TableCell>Nick</TableCell>
                    <TableCell>Rozegrane godziny</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataActivity.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:nth-of-type(odd)": {
                          backgroundColor: "primary.different",
                        },
                      }}
                    >
                      <TableCell align='left'>{index + 1 + "."}</TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row.username}
                      </TableCell>
                      <TableCell>
                        {row.hours / 2}{" "}
                        <span style={{ color: "#aaaaaa" }}>godzin</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            sm={1}
            sx={{
              minWidth: "50%",
              "@media (max-width: 850px)": {
                minWidth: "100%",
              },
            }}
          >
            <Typography
              variant='subtitle1'
              color='text.main'
              mb={2}
              mt={1}
            >
              Frakcje z największą ilością pracowników
            </Typography>
            <TableContainer component={Paper}>
              <Table
                aria-label='simple table'
                size='small'
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.dark" }}>
                    <TableCell align='left'>Miejsce</TableCell>
                    <TableCell align='left'>Frakcja</TableCell>
                    <TableCell align='left'>Pracowników</TableCell>
                    <TableCell align='left'>Stan konta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFactions.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:nth-of-type(odd)": {
                          backgroundColor: "primary.different",
                        },
                      }}
                    >
                      <TableCell align='left'>{index + 1 + "."}</TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        align='left'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='left'>{row.postacie_count}</TableCell>
                      <TableCell align='left'>${row.bankbalance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            sm={1}
            sx={{
              minWidth: "50%",
              "@media (max-width: 850px)": {
                minWidth: "100%",
              },
            }}
          >
            <Typography
              variant='subtitle1'
              color='text.main'
              mb={2}
              mt={1}
            >
              Biznesy z największą ilością pracowników
            </Typography>
            <TableContainer component={Paper}>
              <Table
                aria-label='simple table'
                size='small'
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.dark" }}>
                    <TableCell align='left'>Miejsce</TableCell>
                    <TableCell align='left'>Biznes</TableCell>
                    <TableCell align='left'>Pracowników</TableCell>
                    <TableCell align='left'>Stan konta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataBusinesses.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:nth-of-type(odd)": {
                          backgroundColor: "primary.different",
                        },
                      }}
                    >
                      <TableCell align='left'>{index + 1 + "."}</TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.postacie_count}</TableCell>
                      <TableCell>${row.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}
