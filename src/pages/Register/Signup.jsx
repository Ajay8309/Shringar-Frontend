import React from 'react';
import { Button, HelpText, Input, Label } from '@windmill/react-ui';
import API from '../../api/axios.config';
import { useUser } from '../../context/UserContext';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import styles from './Signup.module.css'; // Import CSS module for Signup component

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { state } = useLocation();
    const { isLoggedIn, setUserState } = useUser();

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
                role: "customer",
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
        <div className={styles.MainContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.SignupForm}>
                <h1 className={styles.SignupTitle}>Create Account</h1>
                <div className={styles.FormField}>
                    <Label className={styles.FormLabel}>
                        <span>Username</span>
                    </Label>
                    <input
                        className={styles.FormInput}
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
                    <HelpText className={styles.FormError} valid={false}>
                        {errors.username.message}
                    </HelpText>
                )}

                <div className={styles.FormField}>
                    <Label className={styles.FormLabel}>
                        <span>Fullname</span>
                    </Label>
                    <input
                        className={styles.FormInput}
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
                    <HelpText className={styles.FormError} valid={false}>
                        {errors.name.message}
                    </HelpText>
                )}

                <div className={styles.FormField}>
                    <Label className={styles.FormLabel}>
                        <span>Email</span>
                    </Label>
                    <input
                        className={styles.FormInput}
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
                    <HelpText className={styles.FormError} valid={false}>
                        {errors.email.message}
                    </HelpText>
                )}

                <div className={styles.FormField}>
                    <Label className={styles.FormLabel}>
                        <span>Password</span>
                    </Label>
                    <input
                        className={styles.FormInput}
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
                    <HelpText className={styles.FormError} valid={false}>
                        {errors.password.message}
                    </HelpText>
                )}

                <div className={styles.FormField}>
                    <Label className={styles.FormLabel}>
                        <span>Confirm Password</span>
                    </Label>
                    <input
                        className={styles.FormInput}
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
                    <HelpText className={styles.FormError} valid={false}>
                        {errors.password2.message}
                    </HelpText>
                )}

                <Button type="submit" className={styles.SubmitButton}>
                    {isLoading ? (
                        <PulseLoader color="blue" size={10} loading={isLoading} />
                    ) : (
                        'Create Account'
                    )}
                </Button>
                {error && (
                    <HelpText className={styles.FormError} valid={false}>
                        {error}
                    </HelpText>
                )}
                <p className={styles.LoginLink}>
                    Have an Account?{' '}
                    <Link to="/login" className={styles.Link}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
