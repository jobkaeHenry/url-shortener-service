import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Modal } from "./components/GlobalModal/Modal";
import NestedLayout, {
  HeaderLayout,
  LogOutOnly,
  UserOnly,
} from "./layouts/router/Layout";
import Missing from "./pages/Error/MissingPage";
import Main from "./pages/Main/Main";
import Dashboard from "./pages/user/Dashboard";
import Login from "./pages/user/login";
import Signup from "./pages/user/Signup";

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <Routes>
        {/* 헤더 */}
        <Route element={<HeaderLayout />}>
          {/* 메인라우트 */}
          <Route path="/" element={<NestedLayout />}>
            <Route index element={<Main />} />
          </Route>
          {/* 유저라우트 */}
          <Route path="/user" element={<NestedLayout />}>
            <Route index element={<Missing />} />
            <Route element={<UserOnly />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<LogOutOnly />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
