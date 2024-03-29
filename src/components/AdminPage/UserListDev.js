import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "../axios/axios";
import ClearIcon from "@mui/icons-material/Clear";
import { Grid } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CookieParser from "../CookieParser/CookieParser";
import { Link, Navigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { set } from "date-fns";
import Snackbar from '@mui/material/Snackbar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "No",
    numeric: false,
    disablePadding: false,
    label: "No.",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "folderCnt",
    numeric: true,
    disablePadding: false,
    label: "日記總數",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox">查看</TableCell>
        <TableCell padding="checkbox">刪除</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [gobackgoback, setgobackgoback] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const cookieParser = new CookieParser(document.cookie);
  const [onDelUser, setOnDelUser] = React.useState("");
  const [rows, setUsers] = React.useState([
    {
      email: "",
      folderCnt: 0,
    },
  ]);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [openSwitchUserAlert, setOpenSwitchUserAlert] = React.useState(false);
  const [switchedUserEmail, setSwitchedUserEmail] = React.useState("");
  const handleClickOpen = () => {
    setOpenWarn(true);
  };
  const handleClose = () => {
    setOpenWarn(false);
  };


  React.useEffect(() => {
    let notAdmin = false;
    axios
      .get("/user/" + cookieParser.getCookieByName("email"),
        {
          headers: {
            Authorization: cookieParser.getCookieByName("token"),
          },
        }
    )
      .then((res) => {
        if (res.data.user.isAdmin === false) {
          setgobackgoback(true);
          notAdmin = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (notAdmin) return;
    axios
      .get("/user", 
      {
        headers: {
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((res) => {
        document.cookie = "token=" + res.data.token;
        setUsers(
          res.data.user.map((result) => {
            let tmp = 0;
            result.folder.forEach((element) => {
              tmp += element.diary.length;
            });
            return {
              email: result.email,
              folderCnt: parseInt(tmp),
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function DelUser(){
    if (onDelUser == "") return;
    axios
      .delete(`/user/${onDelUser}`, 
      {
        headers: {
          Authorization: cookieParser.getCookieByName("token"),
        },
      })
      .then((res) => {
      })
      .catch((e) => {
        console.log(e);
      });
    setUsers(rows.filter((row) => row.email !== onDelUser));
  }

  const handleStartDelUser = (e) => {
    setOpenWarn(true);
    setOnDelUser(e);
  };
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  const OpenSwitchUserAlert = () => {
    setOpenSwitchUserAlert(true);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    {gobackgoback ? (<Navigate to={`/`} />) : (<></>)}
    <Grid   container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '85vh' }} >
      <Box alignItems="center">
        <Paper sx={{ width: "100%", mb: 2, maxWidth: "lg" }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        // selected={isItemSelected}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.email}
                        </TableCell>
                        <TableCell align="right">{row.folderCnt}</TableCell>
                        <TableCell align="right" padding="checkbox">
                          <IconButton onClick={() => { OpenSwitchUserAlert(); setSwitchedUserEmail(row.email); }}>
                            <Link to={"/user/" + row.email}>
                              <VisibilityIcon />
                              </Link>
                          </IconButton>
                        </TableCell>

                        <TableCell align="right" padding="checkbox">
                          <IconButton onClick={() => handleStartDelUser(row.email)}>
                            <ClearIcon />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
    </Grid>
    <Dialog
    open={openWarn}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"是否刪除使用者?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        真的要刪除使用者嗎?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
          <Button variant="contained" onClick={() => { handleClose(); setOnDelUser(""); }}>否</Button>
          <Button variant="contained" onClick={() => { handleClose(); DelUser(); }} autoFocus>
        是的(此操作無法復原)
      </Button>
    </DialogActions>
      </Dialog>
      
      <Snackbar
        open={openSwitchUserAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`切換到用戶${switchedUserEmail}的頁面`} 
      />
    </>
  );
}
