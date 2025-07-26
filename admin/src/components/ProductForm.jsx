import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ProductForm = ({ product }) => {

    const navigate = useNavigate();


    const [id, setId] = useState(product.id || '1000');
    const [title, setTitle] = useState(product.title);
    const [brand, setBrand] = useState(product.brand);
    const [category, setCategory] = useState(product.category);
    const [type, setType] = useState(product.type);
    const [img1, setImg1] = useState(product.img1);
    const [img2, setImg2] = useState(product.img2);
    const [price, setPrice] = useState(product.price || 0);
    const [stock, setStock] = useState(product.stock || 1);
    const [description, setDescription] = useState(product.description);
    const [isOnSale, setIsOnSale] = useState(product.isOnSale || false);

    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (fnc) => (event) => fnc(event.target.value);

    const handleCheckbox = (event) => {
        setIsOnSale(event.target.checked)
    };


    const saveProduct = () => {
        setIsLoading(true);

        axios.post('http://localhost:5000/products/create',
            { id, title, brand, category, type, img1, img2, price, stock, description, isOnSale }
        ).then(res => {
            console.log(res)
            setIsLoading(false);
            navigate('/products')
        }).catch(err => {
            console.log(err)
            setIsLoading(false);
        })

    }


    const deleteProduct = async (id) => {
        // console.log(id)

        if (window.confirm('Are you sure you want to delete ' + product.title + '?')) {
            setIsLoading(true);

            try {
                await axios.delete('http://localhost:5000/products/product/' + id);
                setIsLoading(false);
                navigate('/products')
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
        }
    }


    const updateProduct = async () => {

        setIsLoading(true);

        try {
            await axios.put('http://localhost:5000/products/update/' + id, {
                title, brand, category, type, img1, img2, price, stock, description, isOnSale
            });


            setIsLoading(false);
            navigate('/products')
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }

    }



    return (

        <section className='product-form'>

            <div className='product-input'>
                <label>ID:</label>
                <input type='text' value={id} disabled={product.id}
                    onChange={handleInputChange(setId)}
                />
            </div>

            <div className='product-input'>
                <label>Title:</label>
                <input type='text' value={title}
                    onChange={handleInputChange(setTitle)}
                />
            </div>

            <div className='product-input'>
                <label>Brand:</label>
                <input type='text' value={brand}
                    onChange={handleInputChange(setBrand)}
                />
            </div>

            <div className='product-input'>
                <label>Category:</label>
                <input type='text' value={category}
                    onChange={handleInputChange(setCategory)}
                />
            </div>

            <div className='product-input'>
                <label>Type:</label>
                <input type='text' value={type}
                    onChange={handleInputChange(setType)}
                />
            </div>

            <div className='product-input'>
                <label>Img1:</label>
                <input type='text' value={img1}
                    onChange={handleInputChange(setImg1)}
                />
            </div>

            <div className='product-input'>
                <label>Img2:</label>
                <input type='text' value={img2}
                    onChange={handleInputChange(setImg2)}
                />
            </div>

            <div className='product-input'>
                <label>Price:</label>
                <input type='number' value={price}
                    onChange={handleInputChange(setPrice)}
                />
            </div>


            <div className='product-input'>
                <label>Stock:</label>
                <input type='number' value={stock}
                    onChange={handleInputChange(setStock)}
                />
            </div>


            <div className='product-input'>
                <label>Description:</label>
                <textarea type='text' value={description} rows={1}
                    onChange={handleInputChange(setDescription)}

                />
            </div>

            <div className='product-input'>
                <label>Is On Sale:</label>
                <input type='checkbox' checked={isOnSale}
                    onChange={handleCheckbox}
                />
            </div>



            <div className='product-buttons'>

                {
                    !product.id
                        ? (
                            <button className={isLoading ? 'yellow' : 'green'}
                                onClick={saveProduct} disabled={isLoading}
                            >
                                {isLoading ? 'LOADING...' : 'Save'}

                            </button>
                        )
                        : (
                            <>
                                <button onClick={updateProduct} className={isLoading ? 'yellow' : 'green'}>Update</button>
                                &nbsp;
                                <button onClick={(e) => deleteProduct(product.id)}
                                    className='red'>Delete</button>
                            </>
                        )
                }


            </div>

        </section>


    )
}

export default ProductForm