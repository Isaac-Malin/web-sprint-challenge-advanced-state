import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Message from "./Message";
import {
  inputQuestionChange,
  trueQuestionChange,
  falseQuestionChange,
  resetForm,
  setMessage,
  setQuiz,
} from "../state/action-creators";

export function Form(props) {
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
    evt.preventDefault();
    // console.log("Payload Data:", {
    //   question_text: props.newQuestion,
    //   true_answer_text: props.newTrueAnswer,
    //   false_answer_text: props.newFalseAnswer,
    // });

    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text: props.newQuestion,
        true_answer_text: props.newTrueAnswer,
        false_answer_text: props.newFalseAnswer,
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
        setQuiz(response.data)
        setMessage(response.data.question)
        // console.log(response.data.question);
      })
      .catch((error) => {
        // Handle errors
        setMessage(error.response.data.message);
      });
    props.resetForm();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        value={props.newQuestion}
        onChange={questionInputChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        value={props.newTrueAnswer}
        onChange={trueInputChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        value={props.newFalseAnswer}
        onChange={falseInputChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, {
  inputQuestionChange,
  trueQuestionChange,
  falseQuestionChange,
  resetForm,
  setMessage,
  setQuiz,
})(Form);
