import { Link } from "react-router-dom"

const ProductItem= (props)=>{
    // eslint-disable-next-line react/prop-types
    const {products, deleteProduct}= props
    // console.log(products)
    return(
        <table className="table table-hover mx-auto  w-75 border">
                <thead>
                    <tr className="bg-secondary-subtle">
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Company</th>
                    <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                {
                    // eslint-disable-next-line react/prop-types
                    products.map((product, index)=>
                    <tbody key={product._id}>
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.company}</td>
                        <td className="text-center">
                            <button className="btn btn-danger px-3 me-2 rounded-pill btn-sm" onClick={()=>deleteProduct(product._id)}>Delete</button>
                            <Link to={`/update/${product._id}`} className="btn btn-success px-3 rounded-pill btn-sm">Update </Link>
                        </td>
                        </tr>
                    </tbody>
                )
                }
            </table>
    )
}
export default ProductItem