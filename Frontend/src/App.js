import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./HomePage";
import Events from "./components/Events/Events";
import SignIn from "./components/SignIn/signin";
import Footer from "./components/footer";
import Organizers from "./components/organizers/OrganizersSignIn";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./Bookings/Booking";
import UserProfile from "./components/profile/UserProfile";
import AddEvent from "./components/Events/AddEvent";
import OrganizerProfile from "./components/profile/OrganizerProfile";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />

          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/Admin" element={<Organizers />} />
            </>
          )}

          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/user" element={<UserProfile />} />
            </>
          )}

          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path="/user-organizer" element={<OrganizerProfile />} />
              <Route path="/add" element={<AddEvent />} />
            </>
          )}
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
