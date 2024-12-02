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
import { Alert, Avatar, createTheme, LinearProgress, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from '@mui/material';
import default_album from '../../../assets/album.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UpdateUserInfo from '../Components/UpdateUserInfo';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang";
import { useCustomEventListener } from 'react-custom-events';
import { backend_address } from '../Components/global';
import PersonIcon from '@mui/icons-material/Person';

export default function AdminPanel() {
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [selectedStudio, setSelectedStudio] = useState(1);
  const [response, setResponse] = useState({"status":"", "content":""});
  const navigate = useNavigate()
  const getUser = () => {
    fetch(backend_address + "/api/users/")
      .then((response) => response.json())
      .then((d) => setUser(d))
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
    .then(response => {
      if (response.ok) {
        setResponse({"status":"success", "content": "Admin was added successfully."})
      }
      else {
        setResponse({"status":"error", "content": "Admin could not be added."})
      }
      updateSite()
    })
      .catch((error) => {
        console.log(error);
      });

  }

  const deleteAdmin = (user_id) => {
    fetch(backend_address + "/api/make_admin/" + parseInt(user_id) +  "/", {method: "DELETE"})
      .then(response => {
        if (response.ok) {
          setResponse({"status":"success", "content": "Admin was deleted successfully."})
        }
        else {
          setResponse({"status":"error", "content": "Admin could not be deleted."})
        }
        updateSite()
        if (parseInt(user_id) == parseInt(sessionStorage.getItem("id"))) {
          UpdateUserInfo()
        }
      })
      .then(() => navigate("/store"))
      .catch((error) => {
        console.log(error);
      });
  }
  function updateSite() {
    getUser();
    getProducts();
    getStudios();
  }
  useEffect(() => {
    updateSite()
  }, []);

  const DeleteUser = (user_id) => {
    fetch(backend_address + "/api/users/" + user_id, {method: "DELETE"})
    .then(response => {
      if (response.ok) {
        setResponse({"status":"success", "content": "User was deleted successfully."})
      }
      else {
        setResponse({"status":"error", "content": "User could not be deleted."})
      }
      updateSite()
    })
    .catch((error) => {
      console.log(error);
    })
  };
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'avatar_dir', headerName: "Image", width: 60,
      renderCell: (params) => (
      <div className='kobuch'>
        <Avatar variant='circular' src={`data:image/jpeg;base64,${params.value}`}/>
      </div>
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
      <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
        <TopBar />
        <SideBar />
        <div className="main">
          <h1>Dashboard</h1>
          <div className='stats'>
            <div className='stat'>
              <div className='amount'>
                <h1>Users</h1>
                <LinearProgress variant="determinate" value={50}/>
                <p>1</p>
              </div>
              <div className='icon'>
                <PersonIcon fontSize='large'/>
              </div>
            </div>
            <div className='stat'>
              <div className='amount'>
                <h1>Users</h1>
                <p>1</p>
              </div>
              <div className='icon'>
                <PersonIcon fontSize='large'/>
              </div>
            </div>
            <div className='stat'>
              <div className='amount'>
                <h1>Users</h1>
                <p>1</p>
              </div>
              <div className='icon'>
                <PersonIcon fontSize='large'/>
              </div>
            </div>
            <div className='stat'>
              <div className='amount'>
                <h1>Users</h1>
                <p>1</p>
              </div>
              <div className='icon'>
                <PersonIcon fontSize='large'/>
              </div>
            </div>
          </div>
          <div className="users">
            <DataGrid
              rows={user}
              columns={columns}
              disableRowSelectionOnClick={true}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              />
          {response.status != "" ?
           <Alert variant="filled" severity={response.status}>{response.content}</Alert>
           : null }
          </div>
          <h1>{t("album")}</h1>
            {products.length > 0 && studios.length > 0 ?
            <form onSubmit={changeOwnership} className='formAssignment'>
              <div className='productAssignment'>
                <div className='productSection'>
                  <p>{t("studio")}</p>
                    <Select
                      id="studio"
                      // value={selectedStudio}
                      onChange={handleStudioChange}
                      defaultValue={1}
                    >
                    {studios.length > 0 && studios?.map((studio, index) => (
                      <MenuItem value={studio.id}>{studio.id} - {studio.name}</MenuItem>
                    ))}
                    </Select>
                    <div className='imageContainer'>
                    {studios[selectedStudio] === '/' || studios[selectedStudio - 1] === undefined ? (
                        <img src={default_album} />
                      ) : (
                        <img src={`data:image/jpeg;base64,${studios[selectedStudio - 1].studio_dir}`} />
                      )}
                    </div>
                </div>
                <div className='productSection'>
                <p>{t("product")}</p>
                  <Select
                      id="product"
                      label="Studio"
                      // value={selectedProduct}
                      onChange={handleChange}
                      defaultValue={1}
                    >
                    {products.length > 0 && products?.map((product, index) => (
                      <MenuItem value={product.id}>{product.id} - {product.album}</MenuItem>
                    ))}
                  </Select>
                  <div className='imageContainer'>
                  {products[selectedProduct] === '/' || products[selectedProduct - 1] === undefined ? (
                    <img src={default_album} />
                  ) : (
                    <img src={`data:image/jpeg;base64,${products[selectedProduct - 1].item_path}`} />
                  )}
                  </div>
                </div>
              </div>
              <div className='successButton'>
                <Button variant='contained' type='submit'>Save</Button>
              </div>

            </form>
            : <h1>Loading</h1> }
        </div>
      </div>
    </ThemeProvider>
  );
}
