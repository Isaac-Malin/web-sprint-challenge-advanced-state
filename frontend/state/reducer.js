// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import {
  MOVE_CLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  SET_SELECTED_ANSWER,
  INPUT_QUESTION_CHANGE,
  TRUE_QUESTION_CHANGE,
  FALSE_QUESTION_CHANGE,
  MOVE_COUNTERCLOCKWISE,
  RESET_FORM,
} from "./action-types";

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (state + action.payload) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return (state - action.payload + 6) % 6;

    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      console.log(action);
      return action.payload
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      console.log(action);
      return action.payload
    default:
      return state;
  }
}

// Reducer
const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};

function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_QUESTION_CHANGE:
      return {
        ...state,
        newQuestion: action.payload.newQuestion,
      };
    case TRUE_QUESTION_CHANGE:
      return {
        ...state,
        newTrueAnswer: action.payload.newTrueAnswer,
      };
    case FALSE_QUESTION_CHANGE:
      return {
        ...state,
        newFalseAnswer: action.payload.newFalseAnswer,
      };
    case RESET_FORM:
      return {
        ...state,
        newQuestion: action.payload.newQuestion,
        newTrueAnswer: action.payload.newTrueAnswer,
        newFalseAnswer: action.payload.newFalseAnswer,
      };
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});
