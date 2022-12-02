import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [SignUpError, setSignUpError] = useState('');
    const { createUser, updateUser } = useContext(AuthContext)
    const [checked, setChecked] = useState(!"checked");
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }
    const onSubmit = data => {
        console.log(data);
        if (data.password.length === data.confirmPassword.length) {
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    updateUser(data.name)
                        .then(() => {
                            console.log(user);
                            toast.success('Sign Up successful');
                            saveUser(data.name, data.email, data.select)
                        })
                        .catch(error => {
                            setSignUpError(error.message)
                        })
                })
                .catch(error => {
                    setSignUpError(error.message)
                })
        }

    }

    const handleCheck = () => {
        setChecked(!checked)
    }

    const saveUser = (name, email, select) => {
        const user = { name, email, select };
        fetch(`https://resale-server-lilac.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                setUserEmail(email)
            });
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
                <div className='className="form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">select</span>
                    </label>
                    <select {...register("select")} className="select select-bordered w-full max-w-xs">
                        <option selected>Buyer</option>
                        <option>Seller</option>
                    </select>
                </div>
                <p className='flex font-semibold text-primary'><Link to='/termsAndConditions'><small className='underline'>Accept out terms and conditions</small></Link><input type="checkbox" onClick={handleCheck} checked={checked} className="checkbox ml-2" /></p>

                <input className='btn btn-md w-full' type="submit" value='create an account' disabled={!checked} />
                {
                    SignUpError &&
                    <p className='text-red-600 font-semibold'>{SignUpError}</p>
                }
                <p className='font-semibold text-center'><small>Already have an account? please</small> <Link to='/login' className='underline text-primary'>Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;