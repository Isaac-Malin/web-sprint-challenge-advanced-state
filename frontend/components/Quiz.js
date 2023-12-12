import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
function Quiz(props) {
  const { fetchQuiz, quiz, selectAnswer, postQuiz, postAnswer, setMessage } = props;
  useEffect(() => {
    !quiz && fetchQuiz();
  }, []);

  

  const handleAnswerSelect = (selectedAnswer) => {
    // Dispatch the selectAnswer action with the selected answer
    selectAnswer(selectedAnswer);
  };

  const handleCorrectAnswer = () => {
    let answer = {
      quiz_id: quiz.quiz_id,
      answer_id: props.selectedAnswer
    }  

    postAnswer(answer)
    if (answer.answer_id === quiz.answers[0].answer_id) {
      setMessage("Nice job! That was the correct answer")
    } else {
      setMessage("What a shame! That was the incorrect answer")
    }
  }
  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            <div
              className={
                props.selectedAnswer === quiz.answers[0].answer_id
                  ? "answer selected"
                  : "answer"
              }
            >
              {quiz.answers[0].text}
              <button
                onClick={() => handleAnswerSelect(quiz.answers[0].answer_id)}
              >
                {props.selectedAnswer === quiz.answers[0].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>

            <div
              className={
                props.selectedAnswer === quiz.answers[1].answer_id
                  ? "answer selected"
                  : "answer"
              }
            >
              {quiz.answers[1].text}
              <button
                onClick={() => handleAnswerSelect(quiz.answers[1].answer_id)}
              >
                {props.selectedAnswer === quiz.answers[1].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
          </div>

          <button id="submitAnswerBtn" onClick={() => handleCorrectAnswer()} disabled={props.selectedAnswer ? false : true}>Submit answer</button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}
// const mapStateToProps = state => {
//   return {
//     newQuestion: state.form.newQuestion,
//     newFalseAnswer: state.form.newFalseAnswer,
//     newTrueAnswer: state.form.newTrueAnswer,
//     initialQuizState: state.quiz
//   }
// }

export default connect((st) => st, actionCreators)(Quiz);
