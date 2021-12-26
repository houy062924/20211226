const QuestionTitle = ({ id, title, content }) => {

	if (!id || !title) return null;
	
	return (
		<div className="question-title-cont">
			<h1 className="question-title">{`${id}. ${title}`}</h1>
			<p className="question-content">{content}</p>
		</div>
	);
};

export default QuestionTitle;