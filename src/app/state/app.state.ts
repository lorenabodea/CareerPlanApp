export interface AppState {
    initialized: boolean;
    loading: boolean;
}

export const initialAppState: AppState  = {
    initialized: false,
    loading: false,
};