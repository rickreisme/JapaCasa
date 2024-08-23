import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
