// ❗ You don't need to add extra action creators to achieve MVP\
import axios from "axios";
import {
  MOVE_CLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_QUESTION_CHANGE,
  TRUE_QUESTION_CHANGE,
  FALSE_QUESTION_CHANGE,
  MOVE_COUNTERCLOCKWISE,
  RESET_FORM,
} from "./action-types";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE, payload: 1 };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE, payload: 1 };
}

export function setQuiz(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData };
}

export function selectAnswer(selectedAnswer) {
  return { type: SET_SELECTED_ANSWER, payload: selectedAnswer };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

// Action Creators
export function inputQuestionChange(newFormState) {
  return { type: INPUT_QUESTION_CHANGE, payload: newFormState };
}

export function trueQuestionChange(newFormState) {
  return { type: TRUE_QUESTION_CHANGE, payload: newFormState };
}

export function falseQuestionChange(newFormState) {
  return { type: FALSE_QUESTION_CHANGE, payload: newFormState };
}

export function resetForm() {
  return {
    type: RESET_FORM,
    payload: {
      newQuestion: "",
      newTrueAnswer: "",
      newFalseAnswer: "",
    },
  };
}

// ❗ Async action creators

// export function fetchQuiz() {
//   console.log("hello");
//   return function (dispatch) {
//     // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
//     dispatch({type: SET_QUIZ_INTO_STATE, payload: "Loading next quiz..."});
//     axios
//       .get("http://localhost:9000/api/quiz/next")
//       .then((res) => {
//         // On successful GET, dispatch the obtained quiz to its state
//         dispatch(
//           setMessage(`Congrats: "${res.data.question}" is a great question`)
//         );
//         dispatch(setQuiz(res.data));
//       })
//       .catch((error) => {
//         // Handle error if the next quiz couldn't be fetched
//         dispatch(setMessage(error.response.data.message));
//       });
//   };
// }

export function fetchQuiz() {
  return function (dispatch) {
    // dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        console.log(res);
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        const errToDisplay = err.response
          ? err.response.data.message
          : err.message;
        dispatch(setMessage(errToDisplay));
      });
  };
}

export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then((res) => {
        dispatch(selectAnswer(res.data.answers));
        dispatch(setMessage("Nice job! That was the correct answer"));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        setMessage(err);
      });
  };
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post("http://localhost:9000/api/quiz/new", quiz)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}