import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddProduct= ()=>{
    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [category, setCategory]= useState("");
    const [company, setCompany]= useState("");
    const [error, setError]= useState(false)
    const navigate= useNavigate()
    const handleAddProduct= async(e)=>{
        e.preventDefault();
        const userId= JSON.parse(localStorage.getItem('userData'))._id
        if(!name || !price || !category || !company){
            setError(true)
            return
        }
        const data ={
            name, price, category, company, userId
        }
        setError(false)
        // console.log(data)
        const response= await fetch("http://localhost:3000/add-product",{
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`                
            }
        })
        const result= await response.json();
        console.log(result)
        navigate("/")
    }
    return(
        <div className="container mt-5">
            <h2 className=" text-center">ADD PRODUCT</h2>
            <form className="form w-50   mx-auto" onSubmit={(e)=>handleAddProduct(e)} style={{minWidth:"300px"}}>

            <input type="text" className={(error && !name)? "form-control mt-2 is-invalid": "form-control mt-2"} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Product Name"/>
            {error && !name && <div className="invalid-feedback mt-0"> Enter valid name!</div>}

            <input type="text" className={(error && !price)? "form-control mt-2 is-invalid": "form-control mt-2"} value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price"/>
            {error && !price && <div className="invalid-feedback mt-0"> Enter valid Price!</div>}

            <input type="text" className={(error && !category)? "form-control mt-2 is-invalid": "form-control mt-2"} value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category"/>
            {error && !category && <div className="invalid-feedback mt-0"> Enter valid category!</div>}

            <input type="text" className={(error && !company)? "form-control mt-2 is-invalid": "form-control mt-2"} value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company"/>
            {error && !company && <div className="invalid-feedback mt-0"> Enter valid company!</div>}

            <button type="submit" className="btn text-light bg-dark bg-gradient mt-2">Add Product</button>
        </form>
        </div>
    )
}
export default AddProduct