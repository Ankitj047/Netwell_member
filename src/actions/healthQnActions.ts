
export const TOGGLE_EXIT_HEALTHQN_ALERT = 'TOGGLE_EXIT_HEALTHQN_ALERT';
export const TOGGLE_EXIT_HEALTHQN_EDIT_MODE = 'TOGGLE_EXIT_HEALTHQN_EDIT_MODE';

export const toggleExitHealthqnAlert = (value: string, trigger: string) => {

    return (dispatch: any) => {
        dispatch({
            type: TOGGLE_EXIT_HEALTHQN_ALERT,
            payload: value,
            trigger: trigger ? trigger : 'HealthQn'
        });
    };
};

export const toggleHealthQnEditMode = (value: string) => {

    return (dispatch: any) => {
        dispatch({
            type: TOGGLE_EXIT_HEALTHQN_EDIT_MODE,
            payload: value
        });

    };
};