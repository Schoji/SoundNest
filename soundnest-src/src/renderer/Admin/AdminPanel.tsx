import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

import UpdateUserInfo from '../Components/UpdateUserInfo';
import { backend_address } from '../Components/Global';
import default_album from '../../../assets/album.png';

import '../App.css';
import './AdminPanel.css'
import "../Components/MultiLang";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { Alert, Avatar, colors, createTheme, LinearProgress, MenuItem, Select, Skeleton, Table, TableCell, TableRow, ThemeProvider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

import { useTranslation } from 'react-i18next';
import { useCustomEventListener } from 'react-custom-events';

export default function AdminPanel() {
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [selectedStudio, setSelectedStudio] = useState(1);
  const [response, setResponse] = useState({"status":"", "content":""});
  const [response1, setResponse1] = useState({"status":"", "content":""});
  const [stats, setStats] = useState({})
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
        setResponse({"status":"success", "content": t("adminAddedSuccessfully")})
      }
      else {
        setResponse({"status":"error", "content": t("adminNotAdded")})
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
          setResponse({"status":"success", "content": t("adminDeletedSuccessfully")})
        }
        else {
          setResponse({"status":"error", "content": t("adminNotDeleted")})
        }
        updateSite()
        if (parseInt(user_id) == parseInt(sessionStorage.getItem("id"))) {
          UpdateUserInfo()
        }
      })
      .then(() => {
        if (parseInt(user_id) == parseInt(sessionStorage.getItem("id")))
        navigate("/store")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getStats = () => {
    fetch(backend_address + "/api/stats/")
    .then(response => response.json())
    .then(data => setStats(data))
    .catch(error => console.log(error))
  }
  function updateSite() {
    getUser();
    getProducts();
    getStudios();
    getStats();
  }
  useEffect(() => {
    updateSite()
  }, []);

  const DeleteUser = (user_id) => {
    fetch(backend_address + "/api/fully_delete_user/" + user_id)
    .then(response => {
      if (response.ok) {
        setResponse({"status":"success", "content": t("userDeletedSuccessfully")})
      }
      else {
        setResponse({"status":"error", "content": t("userNotDeleted")})
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
    fetch(backend_address + "/api/change_product_ownership/" + selectedStudio + "/" + selectedProduct + "/")
    .then(response => {
      if (response.ok) {
        setResponse1({"status":"success", "content": t("ownershipChangedSuccessfully")})
      }
      else {
        setResponse1({"status":"error", "content": t("ownershipNotChanged")})
      }
    })
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
  let materialtheme1 = createTheme({
    palette: {
      mode: sessionStorage.getItem("theme") == "dark" ? "light" : "dark",
    }
  })
  return (
    <ThemeProvider theme={materialtheme}>
      <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
        <TopBar />
        <SideBar />
        <div className="main">
          <div className='adminpanel'>
            {stats.hasOwnProperty("users") ?
            <div className='stats'>
              <div className='stat'>
                <div className='amount'>
                  <h3>{t("adminPanelUsersCount")}</h3>
                  <LinearProgress variant="determinate" value={parseFloat(stats.users_no_keys) / parseFloat(stats.users) * 100} sx={{height: "10px", borderRadius: "10px"}}/>
                  <p>{stats.users_no_keys}/{stats.users}</p>
                </div>
                <div className='icon'>
                  <PersonIcon fontSize='large' color="primary"/>
                </div>
              </div>
              <div className='stat'>
                <div className='amount'>
                  <h3>{t("adminPanelTotalCredits")}</h3>
                  <LinearProgress id="credits" variant="determinate" value={parseFloat(stats.total_balance) / 20000 * 100} sx={{height: "10px", borderRadius: "10px"}}/>
                  <p>{stats.total_balance}/20000$</p>
                </div>
                <div className='icon'>
                  <AttachMoneyRoundedIcon fontSize='large' sx={{color: colors.yellow[500]}}/>
                </div>
              </div>
              <div className='stat'>
                <div className='amount'>
                <h3>{t("adminPanelTopContributors")}</h3>
                </div>
                  <div className='kobuch'>
                    <PieChart series={[
                        {
                          arcLabel: (item) => `${item.name.charAt(0)}.${item.surname.charAt(0)}`,
                          data: stats?.user_contribution
                        },
                      ]}
                      width={100}
                      height={100}
                      margin={{ right: 0 }}
                      slotProps = {{
                        legend: { hidden: true } }}
                    />
                  </div>
              </div>
              <div className='stat'>
                <div className='amount'>
                  <h3>{t("adminPanelTopUser")}</h3>
                  <p>1. {stats.top_user.name} {stats.top_user.surname}</p>
                </div>
                <div className='icon'>
                  <Avatar sx={{ width: 64, height: 64 }} src={`data:image/jpeg;base64,${stats.top_user.avatar_dir}`}/>
                </div>
              </div>
            </div>
            :
            <div className='stats'>
              {[...Array(4)].map((element, index) =>
                <div className='stat'>
                  <div className='amount'>
                    <Skeleton sx={{marginBottom: "5px"}} animation="wave" variant="rounded" width={"100px"} height={"30px"} />
                    <Skeleton sx={{marginBottom: "5px"}} animation="wave" variant="rounded" width={"100px"} height={"30px"} />
                    <div className='kobuch'>
                      <Skeleton animation="wave" variant="rounded" width={"50px"} height={"30px"} />
                    </div>
                  </div>
                  <div className='icon'>
                    <Skeleton sx={{margin: "10px"}}animation="wave" variant="rounded" width={"75px"} height={"75px"} />
                  </div>
                </div>
              )}
            </div>}
            {user.length > 0 ?
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
            <ThemeProvider theme={materialtheme1}>
            <Alert variant="filled" severity={response.status}>{response.content}</Alert>
            </ThemeProvider>
            : null }
            </div>
            :
            <div className='users'>
              <Table>
                {[...Array(5)].map((element, index) =>
                <TableRow>
                  {[...Array(10)].map((element, index) =>
                  <TableCell>
                    <Skeleton animation="wave" variant="rounded" width={"60px"} height={"40px"} />
                  </TableCell>
                  )}
                </TableRow>
                )}
              </Table>
              <Skeleton animation="wave" variant="rounded" width={"10px"} height={"10px"} />
            </div>}
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
                        label="Product"
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
                  <Button variant='contained' type='submit'>{t("save")}</Button>
                </div>
                {response1.status != "" ?
                <ThemeProvider theme={materialtheme1}>
                <Alert variant="filled" severity={response1.status}>{response1.content}</Alert>
                </ThemeProvider>
                : null}

              </form>
              :
              <div className='productAssignment formAssignment'>
                <div className='productSection'>
                  <Skeleton animation="wave" variant="rounded" width={"60px"} height={"40px"} />
                  <Skeleton animation="wave" variant="rounded" width={"200px"} height={"40px"} />
                  <div className='imageContainer'>
                    <Skeleton animation="wave" variant="rounded" width={"200px"} height={"200px"} />
                  </div>
                </div>
                <div className='productSection'>
                  <Skeleton animation="wave" variant="rounded" width={"60px"} height={"40px"} />
                  <Skeleton animation="wave" variant="rounded" width={"200px"} height={"40px"} />
                  <div className='imageContainer'>
                    <Skeleton animation="wave" variant="rounded" width={"200px"} height={"200px"} />
                  </div>
                </div>
                <br></br>
              </div>
               }
          </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
