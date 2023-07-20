import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct= ()=>{
    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [category, setCategory]= useState("");
    const [company, setCompany]= useState("");
    const {id}= useParams()
    const navigate= useNavigate()

    useEffect(()=>{
        getProductData(id)
    },[id])
   
    const getProductData= async(id)=>{
        
        const response= await fetch(`http://localhost:3000/update/${id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const result = await response.json();
        
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

        // console.log(result)
    }

    const handleUpdateProduct= async(e)=>{
        e.preventDefault();
        const userId= JSON.parse(localStorage.getItem('userData'))._id
        if(!name || !price || !category || !company){
           
            return alert("You have not entered every field")
        }
        const data ={
            name, price, category, company, userId
        }
        
        // console.log(data)
        const response= await fetch(`http://localhost:3000/update/${id}`,{
            method:"put",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        await response.json();
        navigate("/")
    }
    return(
        <div className="container mt-5">
            <h2 className=" text-center">UPDATE PRODUCT</h2>
            <form className="form w-50   mx-auto" onSubmit={(e)=>handleUpdateProduct(e)} style={{minWidth:"300px"}}>

            <input type="text" className="form-control mt-2" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Product Name"/>

            <input type="text" className ="form-control mt-2" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price"/>

            <input type="text" className="form-control mt-2" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category"/>

            <input type="text" className="form-control mt-2" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company"/>

            <button type="submit" className="btn text-light bg-dark bg-gradient mt-2">Update Product</button>
        </form>
        </div>
    )
}
export default UpdateProduct