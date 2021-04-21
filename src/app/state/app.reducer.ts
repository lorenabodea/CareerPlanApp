import { createReducer, on, Action } from "@ngrx/store";
import { AppActions } from "./app.actions";
import { AppState, initialAppState } from "./app.state";

const AppReducers = createReducer(
    initialAppState,
    on(
        AppActions.initialized,
        (state: AppState, { initialized }) => ({
            ...state,
            initialized
        })
    ),
    on(
        AppActions.loading,
        (state: AppState, { loading }) => ({
            ...state,
            loading
        })
    )
);

//or export const AppReducers, you don t need to have a wrapper around it
export function appReducer(state: AppState | undefined, action: Action): AppState {
    return AppReducers(state, action);
}