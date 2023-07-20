import {Outlet, Navigate} from "react-router-dom"

const PrivateComponent= ()=>{
    const auth = localStorage.getItem("userData")
    
    return auth? <Outlet />:<Navigate to="/signup" />
}
export default PrivateComponent;