import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Companies from "scenes/companies";
import Trending from "scenes/trending";

import CompanyDetail from "scenes/companydetail";
import LoginPage from "scenes/loginPage";
import Setting from "scenes/setting";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(localStorage.getItem("token"));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={isAuth ? <Layout /> : <Navigate to="/login" />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company" element={<Companies />} />

              {/* path should container both company name and its id */}
              <Route path="/company/:id/:name" element={<CompanyDetail />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/settings" element={<Setting />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
