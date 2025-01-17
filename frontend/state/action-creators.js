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
  return { type: RESET_FORM };
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
        dispatch(setQuiz(null))
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
    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then((res) => {
        console.log(res.data); // Check the structure of res.data

        if (res.data.answers) {
          dispatch(selectAnswer(res.data.answers));
        }

        if (res.data.message) {
          dispatch(setMessage(res.data.message));
        }

        dispatch(fetchQuiz());
      })
      .catch((err) => {
        dispatch(setMessage(err.toString())); // Ensure the error message is a string
      });
  };
}

export function postQuiz(quiz) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", quiz)
      .then((res) => {
        console.log(res);
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`)); // or use a message from the server response
        dispatch(resetForm());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMessage(err.toString())); // display the error message
      });
  };
}