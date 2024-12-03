import { useEffect, useState } from 'react';
import '../App.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../Components/MultiLang'
import './Cart.css';
import { Avatar, CircularProgress, createTheme, Skeleton, TableContainer, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import default_album from "../../../assets/album.png"
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

export default function PurchaseHistory() {
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const [dataStatus, setDataStatus] = useState("loading")
  const Fetch = () => {
    fetch(backend_address + "/api/usertransactions/" + sessionStorage.getItem('id'))
      .then((response) => {
        if (response.ok) {
          setDataStatus("ok")
          return response.json()
        }
        else throw new Error("User has no products.")
      })
      .then((d) => setData(d))
      .catch((error) => {
        setDataStatus("error")
        console.log(error);
      });
  };
  useEffect(() => {
    Fetch();
  }, []);
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
            {dataStatus == "ok" && data.length > 0 ?
            <div className="albums">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                {data.toReversed().map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>
                    <Avatar src={row.item_path != "/" ? `data:image/jpeg;base64,${row.item_path}` : default_album}/>
                    </StyledTableCell>
                    <StyledTableCell>{row.album}</StyledTableCell>
                    <StyledTableCell>{row.artist}</StyledTableCell>
                    <StyledTableCell>{row.price.toFixed(2)} $</StyledTableCell>
                  </StyledTableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            : dataStatus == "error" ?
            <p>You have no purchases</p>
            :
            <TableContainer component={Paper}>
              <Table>
              {[...Array(8)].map((element, index) =>
                <TableRow>
                  {[...Array(5)].map((element, index) =>
                  <TableCell>
                    <Skeleton animation="wave" variant="rounded" width={"160px"} height={"30px"} />
                  </TableCell>
                  )}
                </TableRow>
              )}
              </Table>
            </TableContainer>
            }
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
