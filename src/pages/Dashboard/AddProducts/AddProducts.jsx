import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProducts = () => {
    const { register, handleSubmit, reset } = useForm();
    const imageHostKey = process.env.REACT_APP_image_bb_key;
    const { user } = useContext(AuthContext);
    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: (formData)
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const product = {
                        name: data.name,
                        price: data.price,
                        location: data.location,
                        phone: data.phone,
                        email: user.email,
                        purchase: data.purchase,
                        select: data.select,
                        image: imageData.data.url,
                        description: data.description

                    }
                    fetch(`https://resale-server-lilac.vercel.app/addProducts`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)

                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Added your product successfully')
                                reset()
                            }
                        });
                }
            })
        reset();
    }
    return (
        <div className='text-center mt-20'>
            <h1 className='text-3xl font-bold'>Add Your Products</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-20'>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input {...register('name')} type="text" placeholder="Product name" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input {...register('price')} type="text" placeholder="Price" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input {...register('location')} type="text" placeholder="Location" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input {...register('phone')} type="text" placeholder="Phone" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Year of purchase</span>
                    </label>
                    <input {...register('year')} type="text" placeholder="Year of purchase" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">select one</span>
                    </label>
                    <select {...register('select')} className="select select-bordered w-full max-w-xs">
                        <option selected value='excellent'>excellent</option>
                        <option selected value='good'>good</option>
                        <option selected value='fair'>fair</option>
                    </select>
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Product image</span>
                    </label>
                    <input type="file" {...register('image')} />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea {...register('message')} className="textarea textarea-bordered w-80 h-48" placeholder="Description" required></textarea>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;