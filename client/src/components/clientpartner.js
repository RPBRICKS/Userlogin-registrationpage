import react from "react";
import "./loginform.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginform.css";

const ClientPartner = () => {

    const navigate = useNavigate();
    const [clientid, setClientid] = useState("");
    const [partnerid, setPartnerid] = useState("");

function handleClick (){
    navigate("/APIKEY")
    toast.success("Correct Clientid and Partnerid")
}
function logout (){
    navigate("/login")
}
    


    return (
        <>
        <div className="cover">
            <h1>Client and Partner ID</h1>
            <div className="input-group">
                <label htmlFor="clientid">ClientID:</label>
                <input
                    type="text"
                    id="clientid"
                    placeholder="Enter your clientID"
                    name="clientID"
                    value={clientid}
                    onChange={(e) => setClientid(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="partnerid">Partnerid:</label>
                <input
                    type="partnerid"
                    id="partnerid"
                    placeholder="Enter your PartnerID"
                    name="partnerID"
                    value={partnerid}
                    onChange={(e) => setPartnerid(e.target.value)}
                />
            </div>
            <div
            
            className={`login-btn ${!clientid || !partnerid ? "disabled" : ""}`}
            onClick={handleClick}
            style={{ pointerEvents: !clientid || !partnerid ? "none" : "auto" }}
            
            
            >
            
            Submit
            
                
            </div>
        </div>
        <div className="logout-btn" onClick={logout}>logout</div>
        </>
    )
}

export default ClientPartner