import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// PAGES
import Home from "./pages/Home/Home.index";
import Register from "./pages/Register/Register.index";
import Login from "./pages/Login/Login.index";
import Profile from "./pages/Profile/Profile.index";
import { Provider } from "react-redux";
import store from "./redux/store";

// COMPONENTS
import Layout from "./components/Layout/Layout.index";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <main className="p-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/" element={<Profile />}>
                <Route path="/profile/:userId" element={<Profile />} />
              </Route>{" "}
              />
            </Routes>
          </main>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
