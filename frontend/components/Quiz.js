import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from "../state/action-creators";
function Quiz(props) {
  const { fetchQuiz, quiz } = props;
  useEffect(() => {
   !quiz&& fetchQuiz()
  }, [])


  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            <div className="answer ">
              {quiz.answers[0].text}
              <button>Select</button>
            </div>

            <div className="answer">
              {quiz.answers[1].text}
              <button>Select</button>
            </div>
          </div>

          <button id="submitAnswerBtn">Submit answer</button>
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