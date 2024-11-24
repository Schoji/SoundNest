/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../App.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import './Cart.css';
import { Avatar, Box, CircularProgress, Snackbar, TableContainer } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang"
import { backend_address } from '../Components/global';
import { emitCustomEvent } from 'react-custom-events';

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
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("")

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const Fetch = () => {
    fetch(backend_address + "/api/products")
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    Fetch();
  }, []);
  var total_cost = 0;
  const genTableBody = () => {

    function cartRemove(item) {
      console.log("item", item)
      const cart_items = JSON.parse("[" + sessionStorage.getItem('cart') + "]")
      console.log("Cart items", cart_items)
      const new_cart_items = cart_items.filter(x => x !== item);
      console.log("New cart items", new_cart_items)
      sessionStorage.setItem('cart', new_cart_items)
      emitCustomEvent("updateCart", new_cart_items)
      navigate("/cart", { replace: true });
    }
    const cart_items = JSON.parse("[" + sessionStorage.getItem('cart') + "]")
    data.map((row) => (
      cart_items.indexOf(parseInt(row.id)) != -1 ? total_cost = total_cost + row.price : null
    ))
    console.log(data)
    if (data.length == 0) {
      return <CircularProgress />
    }

    const PurchaseButton = (
      <div>
      <Button variant="contained" color="success" onClick={() => purchase()}>Purchase</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert severity='success'>Purchase was made successfully</Alert>
      </Snackbar>
    </div>
    )
    const purchase = () => {
      if (total_cost > parseInt(sessionStorage.getItem('credits'))) {
        setError("Transaction error, insufficient funds.")
        return
      }
      else {
        // Transaction request
        cart_items.map((row, key) => {
          if (row != 0) {
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id_user: sessionStorage.getItem("id"),
                id_product: row
              })
            };
            console.log(backend_address + "/api/transactions")
            fetch(backend_address + "/api/transactions/", requestOptions)
              .then((response) => response.json())
              .then((response) => console.log("Request number", key, " Response from server", response));

          }})
        }
        //Update user balance
        sessionStorage.setItem("cart", "0")
        var new_balance = parseInt(sessionStorage.getItem('credits')) - total_cost
        fetch(backend_address + "/api/users/" + sessionStorage.getItem("id"), {
          headers: {
            'Content-Type': 'application/json',
          },
          method:"PATCH",
          body: JSON.stringify({
            'id' : sessionStorage.getItem("id"),
            'username' : sessionStorage.getItem("username"),
            'name' : sessionStorage.getItem("name"),
            'surname' : sessionStorage.getItem("surname"),
            'email' : sessionStorage.getItem("email"),
            'credits' : new_balance
          })
        }).catch((error) => console.log(error))
        sessionStorage.setItem('credits', new_balance)

        setOpen(true);
        navigate("/cart", {replace:true});
      }

    const table = data.map((row) => (
      cart_items.indexOf(parseInt(row.id)) != -1 ? (
      <StyledTableRow key={row.id}>
        <StyledTableCell>
          <Avatar src={`data:image/jpeg;base64,${row.item_path}`} />
        </StyledTableCell>
        <StyledTableCell>{row.album}</StyledTableCell>
        <StyledTableCell>{row.artist}</StyledTableCell>
        <StyledTableCell>{row.price.toFixed(2)} $</StyledTableCell>
        <StyledTableCell>
          <Button variant='contained' color='error' onClick={() => {
            cartRemove(row.id)}
            }>{t("remove")}</Button>
        </StyledTableCell>
      </StyledTableRow>
    ) : null))
    return (
      total_cost != 0 ? (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {table}
              <StyledTableRow>
                <StyledTableCell colSpan={3} align='right'>{t("totalCost")}</StyledTableCell>
                <StyledTableCell>{total_cost.toFixed(2)} $</StyledTableCell>
                <StyledTableCell>
                  {PurchaseButton}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {error.length > 0 ?
        <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
        : null
        }
      </div>
    ) : <p>{t("noCartItems")}</p>
    )
  }
  return (
    genTableBody()
  );
}

export default function Cart() {
  const { t } = useTranslation()
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="library">
          <div className="header">
              <h1>
                {t("cartOf")} {sessionStorage.getItem('name')}{' '}
                {sessionStorage.getItem('surname')}
              </h1>
          </div>
            <Box>
              <CustomizedTables/>
            </Box>
        </div>
      </div>
    </div>
  );
}
