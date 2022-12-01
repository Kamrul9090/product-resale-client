import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const Users = () => {
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })

    const handleAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast('admin successful');
                refetch()
            })
    }

    const handleDelete = (user) => {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete success');
                    refetch()
                }
            })
    }


    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Role</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{1 + i}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='bg-red-200 text-center font-semibold'>{
                                    user?.role !== 'admin' ? <span>{user.select}</span>
                                        :
                                        <span className='font-semibold text-primary bg-black p-2 rounded-md'>Admin</span>
                                }</td>
                                <td>{user?.role !== 'admin' ? <button onClick={() => handleAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                                    :
                                    <button className='btn btn-sm btn-secondary' disabled>Admin</button>
                                }</td>
                                <td><button onClick={() => handleDelete(user)} className='btn btn-xs btn-info'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;