import { Reducer } from 'redux';
import {
  TOGGLE_EXIT_HEALTHQN_ALERT,
  TOGGLE_EXIT_HEALTHQN_EDIT_MODE
} from '../actions/healthQnActions';


// Type-safe initialState!
export const initialState: any = {
  healthqnInEditMode: false,
  showHealthQnExitAlert: false,
  healthQnExitAlertTrigger: 'HealthQn'
}


const reducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_EXIT_HEALTHQN_ALERT: {
      return { ...state, showHealthQnExitAlert: action.payload, healthQnExitAlertTrigger: action.trigger }
    }
    case TOGGLE_EXIT_HEALTHQN_EDIT_MODE: {
      return { ...state, healthqnInEditMode: action.payload }
    }
    default: {
      return state
    }
  }
}


export { reducer as healthQnReducer };

