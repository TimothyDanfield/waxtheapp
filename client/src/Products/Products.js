import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { TiDelete } from "react-icons/ti";
import "./Products.css"
import axios from '../utils/axiosConfig'
import fileAxios from '../utils/axiosFileConfig'

const Products = () => {
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [photo, setPhoto] = useState()
    const [products, setProducts] = useState([])
    const [user, setUser] = useState()


    const fetchProducts = async () => {
        const productList = await axios.get('http://localhost:3001/product')
        if(productList) {
            setProducts(productList.data)
        }
        
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("User")))
        fetchProducts()
    }, [])

    const nameInput = (e) => {
        setName(e.target.value)
    }

    const priceInput = (e) => {
        setPrice(e.target.value)
    }

    const descriptionInput = (e) => {
        setDescription(e.target.value)
    }

    const handleSelectedFiles = (e) => {
        setPhoto(e.target.files[0])
    }

    const deleteProduct = async (_id) => {
        await axios.delete(`http://localhost:3001/product/${_id}`)
            .then((res) => {
                if (res.status === 200) {
                    fetchProducts()
                    toast.success("Product deleted")
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error(error)
            })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const form = new FormData()
        form.append("file", photo)
        form.append("name", name)
        form.append("price", price)
        form.append("description", description)

        await fileAxios.post('http://localhost:3001/product', form)
            .then((res) => {
                fetchProducts()
                toast.success("Product created")
            })
            .catch((error) => {
                toast.error(error.response.data.message || error.response.data.error || error.statusText)
            })
    }


    return (
        <div className="products">
            <h2 style={{ textAlign: "center" }}>Your Products</h2>
            <div className='productList'>
                {products && products.map((product) => {
                    return (
                        <div key={product._id} className='productCard'>
                            <img src={product.photo.path} />
                            <div className="productTitle">{product.name}</div>
                            <div className='productDelete' onClick={() => deleteProduct(product._id)}>Delete</div>
                        </div>
                    )
                })}
            </div>
            <h2 style={{ textAlign: "center" }}>Create New Product</h2>
            <form className="applyForm" >
                <div className='applySection1'>
                    <label htmlFor='name'>Product Name </label>
                    <input type="text" name="name" placeholder='Product Name...' onChange={(e) => nameInput(e)} />
                </div>
                <div className='applySection1'>
                    <label htmlFor="email">Product Price </label>
                    <input type="number" name="price" placeholder='Product Price...' onChange={(e) => priceInput(e)} />
                </div>
                <div className='applySection1'>
                    <label htmlFor='message'>Product Description </label>
                    <input type="text" name="message" placeholder='Product Description...' onChange={(e) => descriptionInput(e)} />
                </div>
                <div className='applySection1'>
                    <label htmlFor=''>Upload a picture </label>
                    <input type="file" name="file" onChange={handleSelectedFiles} />

                </div>

                <div type="submit" onClick={(e) => handleSave(e)} className='createProduct'>Create Product</div>
            </form>
            <Toaster />
        </div>
    )
}

export default Products