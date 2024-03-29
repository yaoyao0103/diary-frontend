import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ActivatePage from "./components/ActivatePage/ActivatePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import NewDiaryPage from "./components/NewDiaryPage/NewDiaryPage";
import CalenderSearchPage from "./components/CalenderSearchPage/CalenderSearchPage";
import FolderPage from "./components/FolderPage/FolderPage";
import DiaryPage from "./components/BrowseDiaryPage/DiaryPage";
import EditDiaryPage from "./components/NewDiaryPage/EditDiaryPage";
import ShareDiaryPage from "./components/ShareDiaryPage/ShareDiaryPage";
import EnhancedTable from "./components/AdminPage/UserListDev";
import "./App.css"
import SearchDiaryPage from "./components/SearchDiaryPage/SearchDiaryPage";
import AdminInUserPage from "./components/AdminPage/AdminInUserPage";
import AdminDiaryPage from "./components/AdminPage/AdminDiaryPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import axios from "./components/axios/axios";
import CookieParser from "./components/CookieParser/CookieParser";
import ExportDiaryPage from "./components/ExportDiaryPage/ExportDiaryPage";
import AdminSeeDiaryPage from "./components/AdminPage/AdminSeeDiaryPage";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();
  let cookieParser = new CookieParser(document.cookie);
  useEffect(() => {
    setInterval(() => {
      if (cookieParser.getCookieByName("token") == "undefined" || cookieParser.getCookieByName("token") == null) {
        return;
      }
      axios
          .get(`/user/${cookieParser.getCookieByName("email")}/Uncategorized`, {
            headers: {
              'Authorization': cookieParser.getCookieByName("token"),
            }
          })

          .then((res) => {
            document.cookie = "token=" + res.data.token;
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });

    }, 245000);
  }, []);



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
        {/* <HeaderTTT
          onChangeDarkMode={changeDarkMode}
          propsDarkMode={darkMode}
          onShowSearchResult={showSearchResult} /> */}
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
          <Route path="user/:email" element={<AdminInUserPage/>} />
          <Route path="user/:email/editDiary/:inFolder/:diaryName" element={<AdminDiaryPage/>} />
          <Route path="user/:email/DiaryPage/:inFolder/:diaryName" element={<AdminSeeDiaryPage/>} />
          <Route path="favorite" element={<FavoritePage/>} />
          {/* <Route path="exportDiary/:path" element={<ExportDiaryPage/>} /> */}

        </Routes>
        {redirect ? <Navigate to={`SearchDiaryPage/${keyWord}`} /> : ""}
        {/* {window.location.pathname === '/newDiary' ? "" : <Fab color="primary" sx={{
          position:'sticky',
          bottom: 16,
          left:"95%"
        }}
          href="/newDiary"
        >
          <SaveAltIcon />
        </Fab>} */}

      </Paper>
    </ThemeProvider>
  );
}
export default App;
