import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import { lazy, Suspense } from "react";
import Spiner from "./Loader/Spiner";
import SinglePage from "./Pages/SinglePage";
import NotFound from "./Pages/NotFound";
import Account from "./Pages/Account";

function App() {
  const Layout = lazy(() => import("./Layout/Layout"));
  const Home = lazy(() => import("./Pages/Home"));
  const SinglePage = lazy(() => import("./Pages/SinglePage"));
  const Login = lazy(() => import('./Pages/Login'));
  const Account = lazy(() => import('./Pages/Account'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spiner />}>
              <Layout />
            </Suspense>
          }
        >
          <Route index element={<Home />} />
          <Route path="products/:id" element={<SinglePage />} />
          <Route path="contact" element={<Login />} />
          <Route path="profile" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;