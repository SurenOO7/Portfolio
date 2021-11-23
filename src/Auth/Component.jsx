import React, { useState } from 'react'
import Button from './Button/Button'
import axios from "axios"
function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const API_KEY = process.env.REACT_APP_FIREBASE_ACCESS_KEY;
console.log(API_KEY)
export default function App4() {
	const [mainForm, setmainForm] = useState({
		email:{
			value: "",
			name: "email",
			type: "email",
			isValid:false,
			errorMessage: "invalid Email format",
			touched:false,
			label:"Enter Your Email",
			validation: {
				email:true,
				required:true
			}
		},
		password:{
			value: "",
			name: "password",
			type: "password",
			isValid: false,
			errorMessage: "invalid password",
			touched: false,
			label: "password",
			validation: {
				required: true,
				hasNumber:true,
				minlength:10,
				upperCase:true,
				symbol:true
			}
		}
	})
	const [isFormValid, setisFormValid] = useState(false)
	const validateControl = (value,validation) => {
		let isValid = true;

		if (!validation) return true;
		if (validation.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (validation.email) {
			isValid = validateEmail(value) && isValid;
		}
		if (validation.hasNumber) {
			isValid = !!value.match(/\d/g) && isValid;
		}
		if (validation.minlength) {
			isValid = value.length >= validation.minlength && isValid;
		}
		if (validation.upperCase) {
			isValid = !!value.match(/[A-Z]/g) && isValid;
		}
		if (validation.symbol) {
			isValid = !!value.match(/\W/g) && isValid;
		}
		
		return isValid;
		
	}
	const handleChange = (e, name) => {
		let copy = Object.assign({}, mainForm[name] )
		copy.touched = true;
		copy.isValid = validateControl(e.target.value, copy.validation);
		copy.value = e.target.value;
		setmainForm(prevState => {
			return { ...prevState, [name]: copy }
		})
		checkmainForm()
	
	}
	const checkmainForm = () => {
		let result = true;
		for (const key in mainForm) {
			if (!mainForm[key].isValid) {
				result = false
			}
		}
		setisFormValid(result);
	}
	const renderInputs = () => {
		return Object.keys(mainForm).map((elem,index) => {
			const INPUT = mainForm[elem]
			return (
					<>
					<input
						key={index}
						type={INPUT.type}
						value={INPUT.value}
						name={INPUT.name}
						onChange={(e) => handleChange(e, elem)}
					/>
					{!INPUT.isValid && INPUT.touched ? <p>{INPUT.errorMessage}</p> : null}
					</>
			)
		})
	}


	const handlerLogin = (e) => {
		const Payload = {
			returnSecureToken: true,
			email: mainForm.email.value,
			password: mainForm.password.value,
		}
		axios.get(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, Payload)
		.then(response => console.log(response))

	}
	const handlerRegister = (e) => {
		const Payload = {
			returnSecureToken:true,
			email: mainForm.email.value,
			password: mainForm.password.value,
		}
		axios.get(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, Payload)
		.then(response => console.log(response))
		.catch(err => console.log(err))
	}
	const handlerSubmit = (e) => {
		e.preventDefault()
	}
	return (
		<div>
			<form onSubmit={handlerSubmit}>
				{renderInputs()}

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
			</form>
		</div>
	)
}


//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

