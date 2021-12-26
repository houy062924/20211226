import { useState, useEffect } from 'react';
import { questions } from './utils';
import QuestionTitle from './components/QuestionTitle';
import QuestionContent from './components/QuestionContent';
import './App.css';

const App = () => {
	const [questionList, setQuestionList] = useState([]);
	const [activeQuestion, setActiveQuestion] = useState({});
	
	useEffect(() => {
		if (questionList.length === 0) {
			setQuestionList(questions);
			setActiveQuestion(questions[0]);
		}
	}, [questionList])
	
	return (
		<div className="App">
			<nav className="nav-cont">
				<ul>
					{ questionList.map(question => (
						<li 
							key={question.id}
							className={activeQuestion.id === question.id ? "is-active" : null}
							onClick={() => setActiveQuestion(question)}>
								{question.id}
						</li>
					))}
				</ul>
			</nav>
			
			<main>
				<QuestionTitle
					id={activeQuestion.id}
					title={activeQuestion.title}
					content={activeQuestion.content}
				/>
				<QuestionContent 
					id={activeQuestion.id}
					answers={activeQuestion.answers}
				/>
			</main>
		</div>
	);
}

export default App;
