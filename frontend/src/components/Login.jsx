import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

const Login= ()=>{
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const navigate= useNavigate()
    useEffect(()=>{
        const auth= localStorage.getItem("userData")
        // console.log(auth)
        if(auth) {
            navigate("/")
        }
    },[navigate])
    const handleLogin=async(e)=>{
        e.preventDefault() 
        const data= {email, password}
        console.log(data)
        const response=await fetch("http://localhost:3000/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result= await response.json()
        // console.log(result)
        if(result.data.name){
            localStorage.setItem("userData",JSON.stringify(result.data))
            localStorage.setItem("token",JSON.stringify(result.token))
            navigate("/")
        }
    }
    return(
        <div className="container  mt-3">
        <h3 className="text-center fw-boldfont-monospace" >LOGIN</h3>
        <form className="form mx-auto mw-100 " style={{width: "500px"}}onSubmit={(e)=>handleLogin(e)}>
            
            <input type="email" className="form-control mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            <input type="password" className="form-control mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <button type="submit" className="btn btn-primary bg-gradient text-light w-100">Login</button>
        </form>

    </div>
    )
}
export default Login