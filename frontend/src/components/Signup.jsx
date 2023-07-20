import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
export const SignUp= ()=>{
    const [name, setName]= useState("")
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
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const body={
            name, email, password
        }
        const response =await fetch("http://localhost:3000/register",{
            method:"POST",
            //api object ko stringify krke leti h
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }

        })
        const result= await response.json()
        console.log(result)
        const user= result.user
        localStorage.setItem("userData",JSON.stringify(user))
        localStorage.setItem("token",JSON.stringify(result.token))
        navigate("/")
    }

    return(
        <div className="container  mt-3">
            <h3 className="text-center fw-boldfont-monospace" >REGISTER</h3>
            <form className="form mx-auto mw-100 " style={{width: "500px"}}onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
                <input type="email" className="form-control mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
                <input type="password" className="form-control mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                <button type="submit" className="btn btn-success bg-gradient text-light w-100">SIGN UP</button>
            </form>

        </div>
    )
}
