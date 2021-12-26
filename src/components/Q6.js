import { useState } from 'react';

const useForm = (data) => {
	const [values, setValues] = useState(data.initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		
		setValues({
			...values,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = data.validation(values);
		setErrors(errors);
		
		if (Object.values(errors).length === 0) {
			data.onSubmit(values);
			alert("Login Success");
		}
	}
	
	return { handleChange, handleSubmit, values, errors };
}

const Q6 = ({ answers }) => {

	const { handleChange, handleSubmit, values, errors } = useForm({
		initialValues: {
			account: "", 
			password: "", 
			rememberMe: false 
		},
		validation: (values) => {
			const errors = {}
			if (!values.account) {
				errors.account = "請輸入帳號"
			} else if (!values.password) {
				errors.password = "請輸入密碼"
			}
			return errors
		},
		onSubmit: (values) => console.table(values),
	})

	return (
		<div className="Q6">
			<div>
				{ answers.map(ans => (
					<div className="answer-block" key={ans.title}>
						<h2>{ans.title}</h2>
						<pre>
							<code>{ans.content}</code>
						</pre>
					</div>
				))}
			</div>
			
			<div>
				<h2>useForm Custom Hook Demo</h2>
				<form className="form-cont">
					<div className="input-block">
						<input 
							name="account"
							onChange={handleChange} 
							value={values.account}
							placeholder="Account"
						/>
						
						{errors.account && (
							<span>{errors.account}</span>
						)}
					</div>
					
					<div className="input-block">
						<input 
							name="password"
							onChange={handleChange} 
							value={values.password}
							placeholder="Password"
						/>
						
						{errors.password && (
							<span>{errors.password}</span>
						)}
					</div>
					
					<div className="input-block">
						<label>
							<input 
								type="checkbox"
								name="rememberMe"
								onChange={handleChange}
								checked={values.rememberMe} 
							/>
							Remember Me
						</label>
					</div>
					
					<button onClick={handleSubmit}>Login</button>
				</form>
			</div>
		</div>
	)
}

export default Q6;