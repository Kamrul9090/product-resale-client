import React from 'react';


const ProductTable = ({ allSellerProducts, handleDeleteProduct }) => {


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Phone</th>
                        <th>advertise</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allSellerProducts.map(product => <tr>
                            <td>
                                <div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={product.image} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.location}</td>
                            <td>{product.price}</td>
                            <td>{product.phone}</td>
                            <td><button className="btn btn-sm btn-primary">add</button></td>
                            <td><button onClick={() => handleDeleteProduct(product)} className='btn btn-sm btn-danger'>Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;