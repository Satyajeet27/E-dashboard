import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import ProductItem from "./ProductItem"

const Products= ()=>{
    const [products, setProducts]= useState([])
   const params= useParams()

    
    useEffect(()=>{
        getProducts()
    },[params])
    
    const getProducts= async()=>{
        const response=await fetch("http://localhost:3000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const result= await response.json()
        console.log(result)
        setProducts(result)
    }
    const deleteProduct= async(id)=>{
        // console.log(id)
        const response= await fetch(`http://localhost:3000/product/${id}`,{
            method:"delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        await response.json();
        getProducts()
        // navigate("/")
    }
    const handleSearch= async(e)=>{
        const key= e.target.value
        if(key){
            const response=await fetch(`http://localhost:3000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            const result= await response.json()
            // console.log(result)
            setProducts(result)
        }
        else{
            getProducts()
        }
    }
   
    return(
        <div className="mb-5 container">
            <h1 className="text-center">Products</h1>
            
            <input type="search" className="form-control w-75 mb-4 mx-auto" placeholder="Search" onChange={(e)=>handleSearch(e)}/>
           
            {
                (products.length>0 && <ProductItem products={products} deleteProduct={deleteProduct}/>)
            }


            
        </div>
    )
}
export default Products