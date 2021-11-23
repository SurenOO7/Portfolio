import React, { useState, useEffect } from 'react'
import "./App.css"
import Button from './Button/Button'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'

const API_KEY = process.env.REACT_APP_FIREBASE_ACCESS_KEY;

export default function App() {
useEffect(() => {
    console.log(API_KEY)},
    [])
    const [isFormValid, setisFormValid] = useState(false)
    const initialValues = {
        email: "",
        password:""
    }

    const checkmainForm = () => {
        // ստուգում եմ, եթե input֊ը դատարկ չի ու error չունի, ապա valid է, աշխատում է
        // errors֊ի փոփոխությունից
            //1. նոր ենք կայք մուտք գործել, value-ն դատարկ է(false) && error չունի (true) => valid չէ
            //2. հենց սկսում ենք գրել value-ն true է, և արդեն errors֊ը կլինի դատարկ(true) միայն եթե ճիշտ արժեք գրած լինի
        let isEmpty = false;
        let result = false
        for(const key in initialValues){
            if(!formik.values[key]){
                isEmpty=true;
                break
            }
        }
        // console.log("errors: ", formik.errors)
        // console.log("we are in isEmpty: ", isEmpty)
        // console.log("Object.keys(formik.errors).length: ", Object.keys(formik.errors).length)
		if(Object.keys(formik.errors).length===0 && !isEmpty){
            result=true
        }
		setisFormValid(result);
	}

    const onSubmit = (value) =>{
        // console.log(value)
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email adress").required("It is required"),
        password: yup.string()
            .required("Password is Required")
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?=.*[\S]).{8,}$/g, {message: "Invalid Password"})
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        })

    // console.log("formik.values", formik.values)
    // console.log("formik.errors", formik.errors)
    // console.log("formik.touched", formik.touched)

    useEffect(() => {
        checkmainForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.errors])

    const handlerLogin = (e) =>{
        const payLoad ={
            returnSecureToken: true,
            email: formik.values.email,
            password: formik.values.password
        }
        
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, payLoad)
            .then( res => console.log(res))
    }

    const handlerRegister = (e) =>{
        const payLoad ={
            returnSecureToken: true,
            email: formik.values.email,
            password: formik.values.password
        }
        
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, payLoad)
            .then( res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email"></label>
                    <input 
                        type="email"
                        name="email"
                        value={formik.value}
                        placeholder="Enter Email address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>
                <div className="form-control">
                    <label htmlFor="password"></label>
                    <input 
                        type="password"
                        name="password"
                        value={formik.value}
                        placeholder="Enter Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>
				<div className="buttonSection">
                    <Button 
                        type="primary" 
                        disabled={!isFormValid}
                        onClick={handlerLogin}
                    >
                        Sigh in	
                    </Button>
                    <Button 
                        type="success"
                        disabled={!isFormValid}
                        onClick={handlerRegister}
                    >
                        Register
                    </Button>
                </div>
			</form>
        </div>
    )
}

/*  ERROR

    Access to XMLHttpRequest at 'https://identitytoolkit.googleapis.com
    /v1/accounts:signUp?key=AIzaSyBK_qRdyweirzzULZWcUPqIITDVBp4pt5s' from origin  
    'http://localhost:3000' has been blocked by CORS policy: 
    No 'Access-Control-Allow-Origin' header is present on the requested resource. */