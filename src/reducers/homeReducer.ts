import { any } from 'prop-types';
import { Reducer } from 'redux';
// import { HeroesState, HeroesActionTypes } from '../actions/types'
import {
  FETCHING_EXPENSE_LIMIT,
  FETCHING_EXPENSE_LIMIT_FAILED,
  FETCHING_EXPENSE_LIMIT_SUCCESS, FETCHING_GUIDELINES_SUCCESS, FETCHING_HEALTH_CARD,
  FETCHING_HEALTH_CARD_FAILED,
  FETCHING_HEALTH_CARD_SUCCESS, FETCHING_LOGIN_COUNT, FETCHING_LOGIN_COUNT_FAILED, FETCHING_LOGIN_COUNT_SUCCESS, SET_HEALTHQN_OPENED_VALUE, SET_HEALTH_QN_MODULE_INFO, TOGGLE_EXPENSE_LIMIT_MODAL, TOGGLE_FIRST_LOGIN_MODAL, TOGGLE_GLOBAL_LOADER, TOGGLE_HEALTH_CARD_MODAL
} from '../actions/homeActions';

// Type-safe initialState!
export const initialState: any = {
  healthCard: null,
  healthCardFetching: false,
  healthCardFetched: false,
  healthCardFetchingFailed: false,
  toggleHealthCard: false,

  toggleExpenseLimit: false,
  expenseList: [],
  expenseLimitFetching: false,
  expenseLimitFetched: false,
  expenseLimitFetchingFailed: false,
  showGlobalLoader: false,

  toggleFirstLogin: false,
  firstLogin: [],
  firstLoginFetching: false,
  firstLoginFetched: false,
  firstLoginFetchingFailed: false,
  guidelinePdfName: false,
  token: any,

  healthQnOpened: false,
  healthQnModuleInfo: []
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {

    case FETCHING_HEALTH_CARD: {
      return { ...state, healthCardFetching: true }
    }
    case FETCHING_HEALTH_CARD_FAILED: {
      return { ...state, healthCardFetched: false, healthCardFetchingFailed: true, healthCard: null }
    }
    case FETCHING_HEALTH_CARD_SUCCESS: {
      return { ...state, healthCardFetching: false, healthCardFetched: true, healthCardFetchingFailed: false, healthCard: action.payload }
    }
    case TOGGLE_HEALTH_CARD_MODAL: {
      return { ...state, toggleHealthCard: action.payload }
    }
    //for expense limit
    case TOGGLE_EXPENSE_LIMIT_MODAL: {
      return { ...state, toggleExpenseLimit: action.payload }
    }
    case FETCHING_EXPENSE_LIMIT: {
      return { ...state, expenseLimitFetching: true }
    }
    case FETCHING_EXPENSE_LIMIT_FAILED: {
      return { ...state, expenseLimitFetched: false, expenseLimitFetchingFailed: true, expenseList: null }
    }
    case FETCHING_EXPENSE_LIMIT_SUCCESS: {
      return { ...state, expenseLimitFetching: false, expenseLimitFetched: true, expenseLimitFetchingFailed: false, expenseList: action.payload }
    }
    //for fst login
    case TOGGLE_FIRST_LOGIN_MODAL: {
      console.log('inside dispatcher')
      return { ...state, toggleFirstLogin: action.payload }
    }
    case FETCHING_LOGIN_COUNT: {
      return { ...state, firstLoginFetching: true }
    }
    case FETCHING_LOGIN_COUNT_FAILED: {
      return { ...state, firstLoginFetched: false, firstLoginFetchingFailed: true, firstLogin: null }
    }
    case FETCHING_LOGIN_COUNT_SUCCESS: {
      return { ...state, firstLoginFetching: false, firstLoginFetched: true, firstLoginFetchingFailed: false, toggleFirstLogin: action.payload }
    }
    case FETCHING_GUIDELINES_SUCCESS: {
      return { ...state, guidelinePdfName: action.payload.fieldValue }
    }
    case TOGGLE_GLOBAL_LOADER: {
      return { ...state, showGlobalLoader: action.payload }
    }
    case SET_HEALTH_QN_MODULE_INFO: {
      return { ...state, healthQnModuleInfo: action.payload }
    }
    case SET_HEALTHQN_OPENED_VALUE: {
      return { ...state, healthQnOpened: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as homeReducer };

