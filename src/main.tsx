import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LogoDesignPage from "./pages/LogoDesignPage.tsx";
import Header from "./components/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/logo-design"
          element={<LogoDesignPage />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
