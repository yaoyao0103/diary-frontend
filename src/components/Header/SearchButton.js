import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

export default function SearchButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [searchKeyWord, setSearchKeyWord] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchKeyWord(e.target.value)
  }
  const search = () => {
    let keyWord = document.getElementById("keyword").value;
    props.onShowSearchResult(keyWord);
    setOpen(false);
  }

  return (
    <div>
      <IconButton variant="contained" onClick={handleClickOpen}>
        <SearchIcon fontSize='large' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            請輸入搜尋文字
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="keyword"
            label="keyword"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={search}>search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
