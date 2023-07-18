import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Darkweb({ theme, user }) {
  const [open, setOpen] = useState(false);
  const [maxAmount, setMaxAmount] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1000);
  const [drawer, setDrawer] = useState(false);
  const [cart, setCart] = useState([]);
  const amountRef = useRef(null);

  const handleClickOpen = (itemId, itemName, itemMaxAmount, itemPrice) => {
    setOpen(true);
    setId(itemId);
    setName(itemName);
    setPrice(itemPrice);
    setMaxAmount(itemMaxAmount);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (dialogAmount) => {
    if (dialogAmount > maxAmount) {
      console.log("Wpisz poprawną ilość, sklep nie ma tyle na stanie.");
    } else {
      const newCartItem = {
        id: id,
        title: name,
        amount: dialogAmount,
        price: price,
      };
      setCart([...cart, newCartItem]);
      setOpen(false);
    }
  };

  return (
    <>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: "fixed", bottom: "32px", right: "32px" }}
        onClick={() => {
          setDrawer(true);
        }}
      >
        <ShoppingCartIcon />
      </Fab>

      <Drawer
        anchor={"right"}
        open={drawer}
        onClose={() => setDrawer(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        elevation={0}
      >
        <Box
          sx={{ width: "350px" }}
          role='presentation'
        >
          <Stack>
            <Box
              sx={{
                height: "50px",
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton aria-label='cart'>
                <StyledBadge
                  badgeContent={cart.length}
                  color='error'
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Typography ml={2}>
                $
                {cart.reduce((acc, item) => {
                  return acc + item.price;
                }, 0)}
              </Typography>
            </Box>
            {cart.map((item, index) => (
              <Box
                key={index}
                sx={{
                  height: "85px",
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "left",
                  margin:'10px'
                }}
              >
                <Typography
                  variant='h6'
                  mb={1}
                >
                  {item.title}
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={5}
                >
                  <Typography>Ilość: {item.amount}</Typography>
                  <Typography>Cena: ${item.price}</Typography>
                </Stack>
              </Box>
            ))}
            <TextField id="filled-basic" label="Hasło / Numer PIN" variant="standard" width={'50%'} />
            <Button
              variant='contained'
              sx={{ borderRadius:'0' }}
            >
              Zamów
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <TableContainer component={Paper}>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id='amount'
              label='Ilość'
              type='number'
              fullWidth
              variant='standard'
              InputProps={{ inputProps: { min: 0, max: maxAmount } }}
              inputRef={amountRef}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cofnij</Button>
            <Button
              onClick={(event) => {
                handleAddToCart(amountRef.current.value);
              }}
            >
              Dodaj do koszyka
            </Button>
          </DialogActions>
        </Dialog>

        <Table aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell align='left'>Nazwa</TableCell>
              <TableCell align='left'>Opis</TableCell>
              <TableCell align='left'>Cena</TableCell>
              <TableCell align='right'>Dostępna ilość</TableCell>
              <TableCell align='right'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "primary.different",
                  },
                  cursor: "pointer",
                }}
                hover
                onClick={() => {
                  handleClickOpen(row.id, row.name, row.carbs, row.fat);
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  align='left'
                >
                  {row.name}
                </TableCell>
                <TableCell align='left'>{row.calories}</TableCell>
                <TableCell align='left'>${row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>
                  <Chip
                    label={row.protein > 5 ? "Dostępne" : "Niedostępne"}
                    color={row.protein > 5 ? "success" : "error"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
