import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from "react";
import ContactModal from "./common/contactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  // State for controlling the contact modal
  const [contactModalShow, setContactModalShow] = useState(false);

  // Event handler for closing the contact modal
  const handleClose = () => setContactModalShow(false);

  // Event handler for showing the contact modal
  const handleShow = () => setContactModalShow(true);

  return (
    <>
      <header>
        {/* Display the navbar */}
        <Navbar />
      </header>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
      <main className="flex-fill container-fluid  p-0">
        {/* Render the nested routes */}
        <Outlet />
        {/* Display the contact modal */}
        <ContactModal show={contactModalShow} handleClose={handleClose} />
      </main>
      <footer>
        {/* Display the footer */}
        <Footer handleShow={handleShow} />
      </footer>
    </>
  );
}
