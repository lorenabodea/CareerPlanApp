export interface AppState {
    initialized: boolean;
    loading: boolean;
    userId: string;
}

export const initialAppState: AppState  = {
    initialized: false,
    loading: false,
    userId: ''
};