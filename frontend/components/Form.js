import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { postQuiz, resetForm } = props

  const questionInputChange = (evt) => {
    props.inputQuestionChange({ newQuestion: evt.target.value });
  };

  const trueInputChange = (evt) => {
    props.trueQuestionChange({ newTrueAnswer: evt.target.value });
  };

  const falseInputChange = (evt) => {
    props.falseQuestionChange({ newFalseAnswer: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault()

    const quiz = {
      question_text: props.form.newQuestion,
      true_answer_text : props.form.newTrueAnswer,
      false_answer_text : props.form.newFalseAnswer
    }

    postQuiz(quiz)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        value={props.form.newQuestion}
        onChange={questionInputChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        value={props.form.newTrueAnswer}
        onChange={trueInputChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        value={props.form.newFalseAnswer}
        onChange={falseInputChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={props.form.newQuestion.trim().length > 0 && props.form.newTrueAnswer.trim().length > 0 && props.form.newFalseAnswer.trim().length > 0 ? false : true}>Submit new quiz</button>
    </form>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     newQuestion: state.form.newQuestion,
//     newTrueAnswer: state.form.newTrueAnswer,
//     newFalseAnswer: state.form.newFalseAnswer,
//   };
// };
export default connect((st) => st, actionCreators)(Form);
