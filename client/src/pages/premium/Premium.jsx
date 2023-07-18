import React from "react";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import MultiActionAreaCard from "./MultiActionAreaCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const premiumFunctions = [
  {
    field: "charactername",
    imageSrc: "premiumstandard",
    headerName: "Konto Premium 7d",
    description: [
      "Lista dostępnych funkcji w koncie premium może ulec zmianie, w takim przypadku wzbgogacisz się o nowe funkcje bez potrzeby dodatkowego zakupu.",
      "- Darmowe rozmowy telefoniczne",
      "- Darmowe paliwo",
      "- Czat donatorów",
      "- Dodatkowa ilość punktów premium co godzine gry",
      "- Unikalny wybór postaci",
      "- Automatyczne otwieranie bramek przejazdowych bez potrzeby klikania",
    ],
    price: 100,
  },
  {
    field: "charactername",
    imageSrc: "premiumgold",
    headerName: "Konto Premium 30d",
    description: [
      "Lista dostępnych funkcji w koncie premium może ulec zmianie, w takim przypadku wzbgogacisz się o nowe funkcje bez potrzeby dodatkowego zakupu.",
      "- Darmowe rozmowy telefoniczne",
      "- Darmowe paliwo",
      "- Czat donatorów",
      "- Dodatkowa ilość punktów premium co godzine gry",
      "- Unikalny wybór postaci",
      "- Automatyczne otwieranie bramek przejazdowych bez potrzeby klikania",
    ],
    price: 300,
  },
  {
    field: "charactername",
    imageSrc: "znizka",
    headerName: "Karta zniżkowa",
    description: [
      "Karta zniżkowa to specjalny dokument lub kod, który upoważnia do otrzymywania rabatów w sklepach partnerskich.",
      "Karta zniżkowa oznacza, że jej posiadacz może skorzystać z 20% obniżki cenowej na wszystkie produkty w sklepach biorących udział w programie.",
    ],
    price: 50,
  },
  {
    field: "charactername",
    imageSrc: "pakiettani",
    headerName: "Paczka obiektów L",
    description:
      "Paczka obiektów - 5 to możliwość postawienia pięciu doniczek w grze, które są potrzebne do siania marihuany.",
    price: 50,
  },
  {
    field: "charactername",
    imageSrc: "pakietsredni",
    headerName: "Paczka obiektów XL",
    description:
      "Paczka obiektów - 10 to możliwość postawienia dziesięciu doniczek w grze, które są potrzebne do siania marihuany.",
    price: 100,
  },
  {
    field: "charactername",
    imageSrc: "pakietpremium",
    headerName: "Paczka obiektów XXL",
    description:
      "Paczka obiektów - 10 to możliwość postawienia dziesięciu doniczek w grze, które są potrzebne do siania marihuany.",
    price: 100,
  },
  {
    field: "charactername",
    imageSrc: "pakietpremium", //do zrobienia
    headerName: "Własne radio",
    description: [
      "Zakup własnego radia umożliwia stworzenie stacji radiowej na serwerze, którą kontroluje właściciel.",
      "Dzięki niej można włączyć dowolną muzykę, warto dodać, że należy najpierw posiadać swój serwis z taką stacją.",
    ],
    price: 150,
  },
  {
    field: "charactername",
    imageSrc: "przeniesieniemajatku",
    headerName: "Przeniesienie majątku",
    description:
      "Funkcja ta, pozwala przenieść wszystkie przedmioty, nieruchomości oraz pojazdy z jednej postaci na drugą.",
    price: 100,
  },
  {
    field: "charactername",
    imageSrc: "customintek",
    headerName: "Niestandardowy interior",
    description: [
      "Zakup tej funkcji umożliwia zastąpienie domyślnego interioru twoim własnym.",
      "Pamiętaj, że musisz mieć swój interior, będziesz mógł ustawić interior tylko raz!",
    ],
    price: 150,
  },
];

function Premium({ theme, user }) {
  const navigate = useNavigate();

  const handlePremiumShop = () => {
    navigate("/premium/shop");
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
        <Tooltip
          title='Zakup Punkty Premium'
          placement='left'
        >
          <SpeedDial
            ariaLabel='SpeedDial shop'
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<AddShoppingCartIcon />}
            onClick={handlePremiumShop}
          ></SpeedDial>
        </Tooltip>

        <Grid
          container
          spacing={2}
          columns={4}
        >
          <Grid
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              "@media (max-width: 600px)": {
                "& > :nth-child(2)": {
                  marginTop: "16px",
                },
              },
            }}
          >
            <Typography variant='h6'>
              Wszystkie usługi które nie są kontem premium, będą działać 14 dni
              od momentu zakupu.
            </Typography>
            <Typography
              color={"primary.main"}
              variant='h6'
              fontWeight={"bold"}
            >
              Twoje Punkty Premium: {user.hours}
            </Typography>
          </Grid>

          {premiumFunctions.map((data, index) => {
            return (
              <Grid
                key={index}
                sm={1}
                sx={{ minWidth: 420 }}
              >
                <MultiActionAreaCard
                  imageSrc={data.imageSrc}
                  headerName={data.headerName}
                  description={data.description}
                  price={data.price}
                />
              </Grid>
            );
          })}
        </Grid>
      </ThemeProvider>
    </motion.div>
  );
}

export default Premium;
