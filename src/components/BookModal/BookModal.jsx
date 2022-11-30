import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import { ClipLoader } from 'react-spinners';

const BookModal = ({ categoryWatchData, setCategoryWatchData }) => {
    const { user, loader } = useContext(AuthContext);
    const { email } = user;
    const { name: watchName, registered } = categoryWatchData;
    console.log(registered);
    if (loader) {
        return <ClipLoader></ClipLoader>
    }
    const handleBookingData = event => {
        event.preventDefault();
        const form = event.target;
        const categoryName = form.name.value;
        const email = form.email.value;
        const location = form.location.value;
        const phone = form.phone.value;
        console.log(categoryName);
        const booking = {
            name: categoryName,
            email: email,
            location: location,
            phone: phone
        }
        console.log(booking);

        fetch(`http://localhost:5000/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Booking confirm')
                    form.target = '';
                    setCategoryWatchData(null)
                } else {
                    toast.error(`${data.message}`)
                }
            })
    }


    return (
        <div>
            <input type="checkbox" id="watchBooing" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="watchBooing" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Please Booking</h3>
                    <form onSubmit={handleBookingData} className='my-5 space-y-4'>
                        <input name='name' defaultValue={watchName} disabled type="text" className="input input-bordered w-full" />
                        <input name='email' defaultValue={email} disabled type="text" className="input input-bordered w-full" />
                        <input placeholder='location' name='location' type="text" className="input input-bordered w-full" />
                        <input placeholder='number' type="text" name='phone' className="input input-bordered w-full" />
                        <button type='submit' className='btn btn-primary w-full'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookModal;