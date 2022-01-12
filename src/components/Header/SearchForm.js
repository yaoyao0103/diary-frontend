import * as React from "react";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import axios from "../axios/axios"

function SearchForm(props) {
  // const email = "allen3325940072@gmail.com";

  const [searchKeyWord, setSearchKeyWord] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchKeyWord(e.target.value)
  }
  const search = () => {
    props.onShowSearchResult(searchKeyWord);
  }

  return (
    <TextField
      margin="normal"
      fullWidth
      id="input-with-icon-textfield"
      label="搜尋欄"
      color="secondary"
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <Button onClick={search}>
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          </Button>
        ),
      }}
      variant="standard"
    />
  );
}

export default SearchForm;
