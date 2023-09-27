import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import "./Login.scss";
import { Container } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { AdminLogin } from "../Services/authServices";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../Redux/Slices/authSlice";
import { useMutation } from 'react-query'
import { Button } from "react-bootstrap";
import loginSchema from "../Validators/loginSchema";

const Login = () => {

    const [invaliderror, setinvaliderror] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();
    const { token } = useSelector(x => x.authReducer)

    const { mutate, isLoading, isError } = useMutation((values) => AdminLogin(values), {
        onSuccess: (resp) => {
            dispatch(loginAction(resp.data));
            history.push('/admin/dashboard');
        },
    });

    const formik = useFormik({
        initialValues: {
            UsernameOrEmail: '',
            password: '',
        },
        onSubmit: (values) => {
            mutate(values);
        },
        validationSchema: loginSchema
    });

    useEffect(() => {
        if (isError) {
            setinvaliderror(true);
        }
    }, [isError]);

    return (
        <>
            <div className='login_section'>

                <form className='login_form' onSubmit={formik.handleSubmit}>
                    <h3>Login</h3>
                    <label htmlFor="email">Email</label>
                    <>{formik.touched.UsernameOrEmail && formik.errors.UsernameOrEmail}</>
                    <input
                        type='text'
                        isInvalid={formik.errors.UsernameOrEmail && formik.touched.UsernameOrEmail}
                        name='UsernameOrEmail'
                        value={formik.values.UsernameOrEmail}
                        onChange={formik.handleChange}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                    {invaliderror === true ? <>Invalid Account</> : <></>}

                    <label htmlFor="password">Password</label>
                    <>{formik.touched.password && formik.errors.password}</>
                    <input
                        type='password'
                        isInvalid={formik.errors.password && formik.touched.password}
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                    {invaliderror===true ? <>Invalid Account</> : <></>}
                    <Button isLoading={isLoading} type='submit' onClick={formik.handleSubmit}>Log In</Button>
                </form>
            </div>
        </>
    );
};

export default Login;