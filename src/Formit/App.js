import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as yup from "yup"
import "./App.css"
export default function App() {
    const validationSchema = yup.object({
        email: yup.string()
            .email("Invalid email format")
            .required("Required"),
        password: yup.string().required("Required"),
        social: yup.object({
            fb: yup.string().required("It is required").min(10, "min 10 symbols"),
            vk: yup.string().required("It is required").min(10, "min 10 symbols")
        }),
        phoneNumber: yup.array(
            yup.string()
            .required("It is required")
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(9, "Invalid Number")
            .max(9, "Invalid Number")
            
        )
    })
    const initialValues = {
        email:"",
        password:"",
        textareaValue:"1234",
        social:{
            fb: "fb",
            vk: "vk"
        },
        phoneNumber: ["", ""]
    }
    const onSubmit = values =>{
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
        >
            <Form >
                <div className="form-control">
                    <label htmlFor="email">Enter your email</label>
                    <FastField type="text" name="email" id="email"/>
                    <ErrorMessage name="email">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <FastField type="password" name="password" id="password" />
                    <ErrorMessage name="password">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                
                </div>
                <div className="form-control">
                    <label htmlFor="textareaValue">Enter your message</label>
                    <FastField name="textareaValue">
                        {(props)=>{
                            const {field} = props;
                            return(
                                <input type="text" id="textareaValue" {...field}/>
                            )
                        }}
                    </FastField>
                </div>
                <div className="form-control">
                    <label htmlFor="social.fb">Enter your FB</label>
                    <FastField type="text" name="social.fb" id="social.fb"/>
                    <ErrorMessage name="social.fb">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-control">
                    <label htmlFor="social.vk">Enter your VK</label>
                    <FastField type="text" name="social.vk" id="social.vk"/>
                    <ErrorMessage name="social.vk">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <FieldArray name="phoneNumber">
                        {props=>{
                            console.log("props ", props);
                            console.log("initialValues ", initialValues);

                            return(      
                                initialValues.phoneNumber.map((elem , index) => {
                                    return(
                                    <React.Fragment key={index}>
                                        {console.log(initialValues.phoneNumber)}
                                        <label htmlFor={`phoneNumber[${index}]`}>Enter your Phone {index}:</label>
                                        <FastField type="text" name={`phoneNumber[${index}]`} id={`phoneNumber[${index}]`}/>
                                        <ErrorMessage name={`phoneNumber[${index}]`}>
                                            {errMsg => <div className="errors">{errMsg}</div>}
                                        </ErrorMessage>
                                    </React.Fragment>
                                    )
                                })
                                
                            )
                        }}
                    </FieldArray>
                </div>

                {/* <div className="form-control">
                    <label htmlFor="phoneNumber[0]">Enter your Phone 1:</label>
                    <Field name="phoneNumber[0]">
                        {props=>{
                            console.log("props ", props);
                            const {field, meta} = props;
                            console.log("field ", field);
                            return(
                                <input type="text" id="phoneNumber[0]" {...field}/>
                            )
                        }}
                    </Field>
                    <ErrorMessage name="phoneNumber[0]">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <label htmlFor="phoneNumber[1]">Enter your Phone 1:</label>
                    <Field name="phoneNumber[1]">
                        {props=>{
                            console.log("props ", props);
                            const {field, meta} = props;
                            console.log("field ", field);
                            return(
                                <input type="text" id="phoneNumber[1]" {...field}/>
                            )
                        }}
                    </Field>
                    <ErrorMessage name="phoneNumber[1]">
                        {errMsg => <div className="errors">{errMsg}</div>}
                    </ErrorMessage>
                </div> */}
                
                <button type="submit" value="submit">Click me</button>
            </Form>
        </Formik>
    )
}
