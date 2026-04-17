import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
//import { Shopperhome } from "./shopper.home";
//import { Shopperj } from "./shopperj";
import ApplicationForm from "../app-sign/applicationform";
import AdminDashboard from "../app-sign/admin/Admdashboard";
import "../route/route-page.css"
import About from "../about/about";
import DeptsPage from "../depts/depts";
import HomePage from "../home/header";
import Nav from "../home/nav";
import LoginPage from "../sign-in/login";
import ApplicationSuccess from "../appsuccess/applicationsuccess";
import TransferCertificate from "../tc/TransferCertificate";

function Routepage() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <div><Nav /></div>
                <div className="mt-3">
                    <Routes>
                        <Route path="/" element={<HomePage />} ></Route>
                        <Route path="home" element={<HomePage />} />
                        <Route path="tc" element={<ApplicationForm />} />
                        <Route path="success" element={<ApplicationSuccess />} />
                        <Route path="depts" element={<DeptsPage />} />
                        <Route path="about" element={<About />} />
                        <Route path="admn" element={<AdminDashboard />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="generate-tc/:id" element={<TransferCertificate />} />

                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    )
}
export default Routepage;