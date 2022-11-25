import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, loginWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('Login successful')
            })
            .catch(e => setLoginError(e.message));
    }

    const handleWithGoogle = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(e => console.error(e))
    }
    return (
        <div>
            <div className='w-1/2 text-center mx-auto my-28'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:w-1/2 mx-auto">
                    <div className='className="form-control w-full max-w-xs'>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", {
                            required: 'Email address is required',
                            pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email' }
                        })} placeholder="email" className="input input-bordered w-full" required /> <br />
                        {errors?.email && <small className='text-red-700 font-semibold'>{errors?.email?.message}</small>}
                    </div>
                    <div className='className="form-control w-full max-w-xs'>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' {...register("password")} placeholder="password" className="input input-bordered w-full" /> <br />
                    </div>
                    <input className='btn btn-md btn-primary w-full' type="submit" value='Login' />
                    {loginError && <small className='font-semibold text-red-700'>{loginError}</small>}
                    <p className='font-bold text-center'><small>I have no account. please</small> <Link className='underline text-primary' to='/signUp'>Sign up</Link></p>
                </form>
                <div className="divider text-primary w-1/2 mx-auto">OR</div>
                <button onClick={handleWithGoogle} className='btn w-full lg:w-1/2' type='submit'>Login With Google</button>
            </div>
        </div>
    );
};

export default Login;