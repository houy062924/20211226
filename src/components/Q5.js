import { useState, useEffect } from 'react';

const Q5 = () => {
	const [funcCallTimes, setFuncCallTimes] = useState(0);
	const [throttleFuncCallTimes, setThrottleFuncCallTimes] = useState(0);
	const [isThrottling, setIsThrottling] = useState(false);
	const [throttlingTimeout, setThrottlingTimeout] = useState(undefined);
	
	useEffect(() => {
		if (isThrottling) {
			const timeoutFunc = setTimeout(() => {
				setIsThrottling(false);
			}, throttlingTimeout);
			
			return () => clearTimeout(timeoutFunc);
		}
	}, [isThrottling, throttlingTimeout]);
	
	const funcCall = () => {
		setThrottleFuncCallTimes(throttleFuncCallTimes + 1);
	}
	
	const throttle = (func, timeout) => {
		return () => {
			if(!isThrottling) {
				setIsThrottling(true);
				setThrottlingTimeout(timeout);
				func();
			}
		}
	}
	
	const throttleFunc = throttle(funcCall, 1000)
	
	const onClickThrottleBtn = () => {
		setFuncCallTimes(funcCallTimes + 1);
		throttleFunc();
	}

	return (
		<div className="Q5">
			<h2>Throttling Demo</h2>
			<div className="demo-cont">
				<button onClick={onClickThrottleBtn}>
					Click me to see throttle
				</button>
				<p>{`Function called: ${funcCallTimes} times`}</p>
				<p>{`Throttled Function called: ${throttleFuncCallTimes} times`}</p>
			</div>
		</div>
	);
};

export default Q5;