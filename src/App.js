import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AboutPage from "./components/AboutPage/AboutPage";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ActivatePage from "./components/ActivatePage/ActivatePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import NewDiaryPage from "./components/NewDiaryPage/NewDiaryPage";
import UserListDataGrid from "./components/AdminPage/UserIdListDataGrid";
import CalenderSearchPage from "./components/CalenderSearchPage/CalenderSearchPage";
import FolderPage from "./components/FolderPage/FolderPage";
import DiaryPage from "./components/BrowseDiaryPage/DiaryPage";
import EditDiaryPage from "./components/NewDiaryPage/EditDiaryPage";
import ShareDiaryPage from "./components/ShareDiaryPage/ShareDiaryPage";
import EnhancedTable from "./components/AdminPage/UserListDev";
import "./App.css"
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import SearchDiaryPage from "./components/SearchDiaryPage/SearchDiaryPage";


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [redirect, setRedirect] = useState(false);

  let localDarkMode = localStorage.getItem("darkMode");
  // darkMode theme's parameter
  let theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1B92D1",
        light: "#37AEF2",
        dark: "#1B92D1",
        contrastText: "#fff",
      },
      background: {
        paper: "#0c1929",
        default: "#0c1929",
      },
    },
    mixins: {
      toolbar: 0,
    },
  })

  // lightMode theme's parameter
  if (darkMode === false) {
    let root = document.documentElement;
    root.style.setProperty('--background-color', '#FAEBD7');
    root.style.setProperty('--primary-color', '#db9ca7');
    theme = (createTheme({
      palette: {
        mode: "light",
        primary: {
          // main: "#37AEF2",
          main: "#ffb6c1",
          light: "#37AEF2",
          dark: "#1B92D1",
          contrastText: "#fff",
        },
        background: {
          // paper: "#fff",
          paper: "#FAEBD7",
          // default: "#fff",
          default: "#FAEBD7",
        },
      },
      mixins: {
        toolbar: 0,
      },
    }))
  } else {
    let root = document.documentElement;
    root.style.setProperty('--background-color', '#0c1929');
    root.style.setProperty('--primary-color', '#1B92D1');
  }

  useEffect(() => {
    setRedirect(false);
    if (localDarkMode === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [localDarkMode, redirect, keyWord])

  // to recive the param from child
  const changeDarkMode = (enteredDarkMode) => {
    const darkMode = enteredDarkMode;
    setDarkMode(darkMode);
    localStorage.setItem("darkMode", darkMode);
    console.log("App is " + darkMode);
  };

  const showSearchResult = (enteredKeyWord) => {
    setKeyWord(enteredKeyWord);
    setRedirect(true);
  }


  //let isLogin = false;
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", height: "100%" }} id='page' elevation={0}>
        <Header
          //isLogin={isLogin}
          onChangeDarkMode={changeDarkMode}
          propsDarkMode={darkMode}
          onShowSearchResult={showSearchResult}
        />
        <Routes>
          {/* <Route path="/" element={<Header
            //isLogin={isLogin}
            onChangeDarkMode={changeDarkMode}
            propsDarkMode={darkMode}
            onShowSearchResult={showSearchResult}
          />} > */}
          <Route path="/" element={<HomePage />} />
          {/* <Route  path="about" element={<AboutPage />} /> */}
          <Route path="about" element={<EnhancedTable />} />
          <Route path="login" element={<LoginPage />} /> {/* 注意此頁不用登入 */}
          <Route path="register" element={<RegisterPage />} /> {/* 注意此頁不用登入 */}
          <Route path="activate" element={<ActivatePage />} /> {/* 注意此頁不用登入 */}
          <Route path="forgotpassword" element={<ForgotPasswordPage />} /> {/* 注意此頁不用登入 */}
          <Route path="resetpassword" element={<ResetPasswordPage />} />
          <Route path="newDiary" element={<NewDiaryPage />} />
          <Route path="calenderSearch" element={<CalenderSearchPage />} />
          <Route path="folderPage" element={<FolderPage />} />
          <Route path="DiaryPage/:inFolder/:diaryName" element={<DiaryPage />} />
          <Route path="editDiary/:inFolder/:diaryName" element={<EditDiaryPage />} />
          <Route path="ShareDiaryPage/:path" element={<ShareDiaryPage />} /> {/* 注意此頁不用登入 */}
          <Route path="SearchDiaryPage/:keyWord" element={<SearchDiaryPage />} />
          <Route path="user" element={<EnhancedTable />} />
        </Routes>
        {redirect ? <Navigate to={`SearchDiaryPage/${keyWord}`} /> : ""}
        {/* {window.location.pathname === '/newDiary' ? "" : <Fab color="primary" sx={{
          position:'sticky',
          bottom: 16,
          left:"95%"
        }}
          href="/newDiary"
        >
          <EditIcon />
        </Fab>} */}

      </Paper>
    </ThemeProvider>
  );
}
export default App;
