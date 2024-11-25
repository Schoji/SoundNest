/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../App.css';
import { Form, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import './AdminPanel.css'
import { DataGrid, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, MuiEvent } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Avatar, createTheme, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from '@mui/material';
import default_album from '../../../assets/album.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UpdateUserInfo from '../Components/UpdateUserInfo';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang";
import { useCustomEventListener } from 'react-custom-events';
import { backend_address } from '../Components/global';

export default function AdminPanel() {
  const { t } = useTranslation();
  UpdateUserInfo();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedStudio, setSelectedStudio] = useState(0);
  const Fetch = () => {
    fetch(backend_address + "/api/users/")
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    fetch(backend_address + "/api/products/")
      .then((response) => response.json())
      .then((d) => setProducts(d))
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudios = () => {
    fetch(backend_address + "/api/studios/")
      .then((response) => response.json())
      .then((d) => setStudios(d))
      .catch((error) => {
        console.log(error);
      });
  };

  const makeAdmin = (user_id) => {
    fetch(backend_address + "/api/make_admin/" + user_id)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteAdmin = (user_id) => {
    fetch(backend_address + "/api/make_admin/" + user_id +  "/", {method: "DELETE"})
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    Fetch();
    getProducts();
    getStudios();
  }, []);

  const DeleteUser = (user_id) => {
    fetch(backend_address + "/api/users/" + user_id, {method: "DELETE"})
    .catch((error) => {
      console.log(error);
    })
    Fetch();
    Fetch();
  };
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'avatar_dir', headerName: "Image", width: 60,
      renderCell: (params) => (
      <Avatar variant='rounded' src={`data:image/jpeg;base64,${params.value}`}/>
    ),},
    {field: 'username', headerName: "Username", width: 125},
    {field: 'surname', headerName: "Surname", width: 70},
    {field: 'email', headerName: "Email", width: 170},
    {field: 'prefered_theme', headerName: "Prefered Theme", width: 50},
    {field: 'credits', headerName: "Credits", width: 50},
    {field: 'is_admin', headerName: "Admin", width: 70},
    {field: 'Delete', headerName: "Delete", width: 105, renderCell: (params) => (
      params.row.id != sessionStorage.getItem("id") ? <Button variant='contained' color='error' onClick={() => {
        DeleteUser(params.row.id)
        }}>
          {t("delete")}</Button>: null
    ),},
    {field: 'Admin', headerName: "Add Admin", width: 155 ,renderCell: (params) => (
      params.row.is_admin != true ? <Button variant='contained' color='info' onClick={() => {
        makeAdmin(params.row.id)
      }}>
          {t("addAdmin")}</Button> : <Button variant='contained' color='error' onClick={() => {
            deleteAdmin(params.row.id)
          }}>{t("deleteAdmin")}</Button>
    ),},
  ]
  const paginationModel = { page: 0, pageSize: 5 };

  const handleChange = (event) => {
    setSelectedProduct(event.target.value as string);
  };

  const handleStudioChange = (event) => {
    setSelectedStudio(event.target.value as string);
  };

  const changeOwnership = (event) => {
    event.preventDefault()
    fetch(backend_address + "/api/change_product_ownership/" + event.target.studio.value + "/" + event.target.product.value + "/")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"))
  useCustomEventListener("changeTheme", (theme) => {
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <ThemeProvider theme={materialtheme}>
      <div className="all">
        <TopBar />
        <SideBar />
        <div className="main">
          <div className="users">
            <h1>{t("users")}</h1>
            <DataGrid
              rows={data}
              columns={columns}
              disableRowSelectionOnClick={true}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              />
          </div>
          <div>
            <h1>{t("album")}</h1>
            {products.length > 0 && studios.length > 0 ?
            <form onSubmit={changeOwnership}>
              <p>{t("studio")}</p>
                <select
                  id="studio"
                  // value={selectedStudio}
                  onChange={handleStudioChange}
                >
                {studios.length > 0 && studios?.map((studio, index) => (
                  <option value={studio.id}>{studio.id}-{studio.name}</option>
                ))}
                </select>

              <p>{t("product")}</p>
              <select
                  id="product"
                  // value={selectedProduct}
                  onChange={handleChange}
                >
                {products.length > 0 && products?.map((product, index) => (
                  <option value={product.id}>{product.id}-{product.album}</option>
                ))}
                </select>



                  <div>

                    {studios[selectedStudio] === '/' || studios[selectedStudio - 1] === undefined ? (
                      <img src={default_album} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${studios[selectedStudio - 1].studio_dir}`} />
                    )}
                    <ArrowForwardIcon/>
                    {products[selectedProduct] === '/' || products[selectedProduct - 1] === undefined ? (
                      <img src={default_album} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${products[selectedProduct - 1].item_path}`} />
                    )}

                  </div>
                  <Button variant='contained' color='success' type='submit'>Save</Button>

            </form>
            : <h1>Loading</h1> }
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
