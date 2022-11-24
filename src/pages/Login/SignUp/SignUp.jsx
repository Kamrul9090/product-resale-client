import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)

    const onSubmit = data => {
        console.log(data);
        if (data.password.length === data.confirmPassword.length) {
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    updateUser(data.name)
                        .then(() => {
                            toast.success('Sign Up successful')
                        })
                        .catch(error => console.error(error))
                })
                .catch(error => console.error(error))
        }

    }
    return (
        <div className='w-full lg:w-1/2 mx-auto mt-28'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-1/2 mx-auto">
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input {...register("name")} placeholder="Full Name" className="input input-bordered w-full" /> <br />
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email", {
                        required: 'Email address is required',
                        pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email' }
                    })} placeholder="email" className="input input-bordered w-full" /> <br />
                    {errors?.email && <span>{errors?.email?.message}</span>}
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type='password' {...register("password",
                        {
                            minLength: { value: 6, message: 'Your password should be at least 6 character' }
                        })} placeholder="password" className="input input-bordered w-full" /> <br />
                    {errors?.password && <small className='text-red-500 font-semibold'>{errors?.password?.message}</small>}
                </div>
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type='password' {...register("confirmPassword")} placeholder="confirmPassword" className="input input-bordered w-full" required /> <br />
                    {errors?.password?.length !== errors?.confirmPassword?.length && <small>Invalid password</small>}
                </div>
                <input className='btn btn-md w-full' type="submit" value='create an account' />
                <p className='font-semibold text-center'><small>Already have an account? please</small> <Link to='/login' className='underline text-primary'>Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;