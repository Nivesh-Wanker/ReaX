import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/navbar/NavBar";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import UserDashboard from "./components/dashboard/UserDashboard";
import Logout from "./components/logout/Logout";
import PrivateRoute from "./components/routes/PrivateRoute";
// import CreateForm from "./components/forms/CreateForm";
import PreviewForm from "./components/forms/PreviewForm";
import { FormProvider }   from "./contexts/FormContext";
import UpsertForm from "./components/forms/UpsertForm";
import FetchAndRenderForm from "./components/forms/FetchAndRenderForm";



function App() {
  return (
    <Router>
      <AuthProvider>
        <FormProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/user/createform"
            element={
              <PrivateRoute>
                <CreateForm />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/user/previewform"
            element={
              <PrivateRoute>
                <PreviewForm />
              </PrivateRoute>
            }
          />
            <Route 
            path="/user/createform" 
            element={
              <PrivateRoute>
              <UpsertForm mode="create" />
              </PrivateRoute>
            } />
            <Route
             path="/user/updateform/:formId" 
             element={
              <PrivateRoute>
             <FetchAndRenderForm />
             </PrivateRoute>
             } />
            {/* other routes */}

        </Routes>
        </FormProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;