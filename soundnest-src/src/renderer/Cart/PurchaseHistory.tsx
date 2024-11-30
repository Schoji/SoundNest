/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import '../App.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../Components/MultiLang'
import './Cart.css';
import { CircularProgress, createTheme, TableContainer, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function CustomizedTables() {
  const navigate = useNavigate();
  const genTableBody = () => {

    const [data, setData] = useState([]);
    const Fetch = () => {
      fetch(backend_address + "/api/usertransactions/" + sessionStorage.getItem('id'))
        .then((response) => response.json())
        .then((d) => setData(d))
        .catch((error) => {
          console.log(error);
        });
      console.log(data)
    };
    useEffect(() => {
      Fetch();
    }, []);

    if (data.length == 0) {
      return <CircularProgress />
    }

    const table = data.toReversed().map((row) => (
      <StyledTableRow key={row.id}>
        <StyledTableCell>{row.date}</StyledTableCell>
        <StyledTableCell>{row.album}</StyledTableCell>
        <StyledTableCell>{row.artist}</StyledTableCell>
        <StyledTableCell>{row.price.toFixed(2)} $</StyledTableCell>
      </StyledTableRow>
    ))
    return table
  }
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
    {genTableBody()}
        </TableBody>
        </Table>
      </TableContainer>
  )
}

export default function PurchaseHistory() {
  const { t } = useTranslation()
  let materialtheme = createTheme({
    palette: {
      mode: sessionStorage.getItem("theme") == "dark" ? "dark" : "light"
    }
  })
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="library">
          <ThemeProvider theme={materialtheme}>
            <div className="header">
                <h1>
                  {t("purchaseHistory")}: {sessionStorage.getItem('name')}{' '}
                  {sessionStorage.getItem('surname')}
                </h1>
            </div>
            <div className="albums">
              <CustomizedTables/>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
