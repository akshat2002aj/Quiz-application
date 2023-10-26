import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Store from "./Redux/Store";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { useEffect } from "react";
import { loadUser } from "./Redux/Actions/auth";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import Loader from "./Components/Layout/Loader/Loader";
import AdminQuizViewPage from "./Pages/AdminQuizViewPage";
import AdminQuizQuestionPage from "./Pages/AdminQuizQuestionPage";
import AdminAddQuestionPage from "./Pages/AdminAddQuestionPage";
import AdminQuizUserPage from "./Pages/AdminQuizUserPage";
import AdminCreateQuizPage from "./Pages/AdminCreateQuizPage";
import AdminCreateUserPage from "./Pages/AdminCreateUserPage";
import UserHomePage from "./Pages/UserHomePage";
import AdminQuizPage from "./Pages/AdminQuizPage";
import AdminUserPage from "./Pages/AdminUserPage";
import UserQuizViewPage from "./Pages/UserQuizViewPage";
import PageNotFound from "./Pages/404Page";
import AdminUpdatePasswordPage from "./Pages/AdminUpdatePasswordPage";
import BasicModal from "./Components/Layout/Modal/Modal";
import DashboardCard from "./Components/DashboradCard/DashBoardCard";
function App() {
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  const handleBlockInspect=(e) => {
    e.preventDefault();
  }

  // useEffect(() => {
  //   window.addEventListener('contextmenu', handleBlockInspect);
  //   return function cleanup(){
  //     window.removeEventListener('contextmenu', handleBlockInspect);
  //   }
  // },[])
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (e.key === 'Escape' || e.key === 'Win' || e.key === 'F12') {
        console.log("are you sure?")
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dc" element={<DashboardCard />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* User Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UserHomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <ProtectedRoute>
                  <UserQuizViewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-quiz"
              element={
                <AdminProtectedRoute>
                  <AdminQuizPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-user"
              element={
                <AdminProtectedRoute>
                  <AdminUserPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-quiz/:id"
              element={
                <AdminProtectedRoute>
                  <AdminQuizViewPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-quiz-question/:id"
              element={
                <AdminProtectedRoute>
                  <AdminQuizQuestionPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-add-quiz-question/:id"
              element={
                <AdminProtectedRoute>
                  <AdminAddQuestionPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-view-users/:id"
              element={
                <AdminProtectedRoute>
                  <AdminQuizUserPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-create-quiz"
              element={
                <AdminProtectedRoute>
                  <AdminCreateQuizPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-create-user"
              element={
                <AdminProtectedRoute>
                  <AdminCreateUserPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-update-password"
              element={
                <AdminProtectedRoute>
                  <AdminUpdatePasswordPage />
                </AdminProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster position="bottom-center" reverseOrder={false} />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
