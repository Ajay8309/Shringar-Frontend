import React from 'react';
import { Button, HelpText, Input, Label } from '@windmill/react-ui';
import API from '../../api/axios.config';
import { useUser } from '../../context/userContext';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

const Signup = () => {
    console.log('Is this Working');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { state } = useLocation();
    const { isLoggedIn, setUserState } = useUser();
    // setUserState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    const password = useRef({});
    password.current = watch('password', '');

    const onSubmit = (data) => {
        const { password, password2, username, name, email } = data;
        setError('');
        if (password === password2) {
            setIsLoading(!isLoading);
            API.post('auth/signup', {
                username,
                email,
                password,
                fullname: name,
            })
                .then((data) => {
                    setError('');
                    toast.success('Account created Successfully');
                    setTimeout(() => {
                        setUserState(data);
                        setIsLoading(!isLoading);
                    }, 1000);
                })
                .catch(({ response }) => {
                    setIsLoading(false);
                    setError(response.data.message);
                });
        } else {
            setError('Password does not match:');
        }
    };

    if (isLoggedIn) {
        return <Navigate to={state?.from || '/'} />;
    }

    return (
        <div className="MainContainer">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h1 className="">Create Account</h1>
                <div className="">
                    <Label className="">
                        <span>Username</span>
                    </Label>
                    <input
                        className=""
                        type="text"
                        name="username"
                        {...register('username', {
                            minLength: {
                                value: 4,
                                message: 'Username must be greater than 3 characters:',
                            },
                            required: 'Username is required',
                        })}
                    />
                </div>
                {errors.username && (
                    <HelpText className="" valid={false}>
                        {errors.username.message}
                    </HelpText>
                )}

                <div className="">
                    <Label>
                        <span>Fullname</span>
                    </Label>
                    <input
                        className=""
                        type="text"
                        name="name"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 4,
                                message: 'Name must be greater than 3 characters:',
                            },
                        })}
                    />
                </div>

                {errors.name && (
                    <HelpText className="" valid={false}>
                        {errors.name.message}
                    </HelpText>
                )}

                <div className="">
                    <Label>
                        <span>Email</span>
                    </Label>
                    <input
                        className=""
                        type="email"
                        name="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: 4,
                                message: 'Invalid email format:',
                            },
                        })}
                    />
                </div>

                {errors.email && (
                    <HelpText className="" valid={false}>
                        {errors.email.message}
                    </HelpText>
                )}

                <div className="">
                    <Label>
                        <span>Password</span>
                    </Label>
                    <input
                        className=""
                        type="password"
                        name="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 7,
                                message: 'Password must be greater than 6 characters:',
                            },
                        })}
                    />
                </div>

                {errors.password && (
                    <HelpText className="" valid={false}>
                        {errors.password.message}
                    </HelpText>
                )}

                <div className="">
                    <Label>
                        <span>Confirm Password</span>
                    </Label>
                    <input
                        className=""
                        type="password"
                        name="password2"
                        {...register('password2', {
                            required: 'Password confirmation is required',
                            validate: (value) =>
                                value === password.current || 'Passwords do not match',
                        })}
                    />
                </div>

                {errors.password2 && (
                    <HelpText className="" valid={false}>
                        {errors.password2.message}
                    </HelpText>
                )}

                <Button type="submit" className="">
                    {isLoading ? (
                        <PulseLoader color="blue" size={10} loading={isLoading} />
                    ) : (
                        'Create Account'
                    )}
                </Button>
                {error && (
                    <HelpText className="" valid={false}>
                        {error}
                    </HelpText>
                )}
                <p className="">
                    Have an Account?{' '}
                    <Link to="/login" className="">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
