import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
    Initialized = '[App] app initialized',
    Loading = '[App] app loading',
}

export class AppActions {
    public static initialized = createAction(
        AppActionTypes.Initialized,
        props<{ initialized: boolean }>()
    );
    public static loading = createAction(
        AppActionTypes.Loading,
        props<{ loading: boolean }>()
    )
}