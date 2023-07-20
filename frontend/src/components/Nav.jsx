import { Link, useNavigate } from "react-router-dom"

export const Nav= ()=>{
const auth= localStorage.getItem("userData")
const navigate= useNavigate()
console.log(auth)
const logout= ()=>{
    
    localStorage.clear()
    navigate("/signup")
}
    return(
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                
                    <a className="navbar-brand" href="#">Logo</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                auth?  
                    <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to={"/"}>Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={"/add"}>Add Product</Link></li>
                        {/* <li className="nav-item"><Link className="nav-link" to={"/update"}>Update Product</Link></li>   */}
                        <li className="nav-item"><Link className="nav-link" onClick={logout} to={"/signup"}>Logout</Link></li>
                    </ul>
                    <div className="navbar-nav">
                        <Link className="nav-link" to={"/profile"}>{JSON.parse(auth).name.toUpperCase()}</Link>
                    </div>
                    </>
                    :
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to={"/login"}>Login</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={"/signup"}>Signup</Link></li>
                    </ul>
                }
                </div>
            </div>
        </nav>

    )
}
