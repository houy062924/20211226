import Q5 from './Q5';
import Q6 from './Q6';

const QuestionContent = ({ id, answers = [] }) => {
		
	const renderContent = (id) => {
		if (['Q1', 'Q2', 'Q3', 'Q4'].includes(id)) {
			return (
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
			)
		}
		
		if (id === 'Q5') {
			return (
				<Q5 />
			)
		}
		
		if (id === 'Q6') {
			return (
				<Q6 
					answers={answers}
				/>
			)
		}
	}

	return (
		<div className="question-content-cont">
			{renderContent(id)}
		</div>
	);
};

export default QuestionContent;