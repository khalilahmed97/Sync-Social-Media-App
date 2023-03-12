import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
    <div className="app">

      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
 
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/"/>}
            />
            {console.log(isAuth)}
            <Route
              path="/profile/:userID"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;