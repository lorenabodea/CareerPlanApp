import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
    Initialized = '[App] app initialized',
    Loading = '[App] app loading',
    UserId = '[App] user id'
}

export class AppActions {
    public static initialized = createAction(
        AppActionTypes.Initialized,
        props<{ initialized: boolean }>()
    );
    public static loading = createAction(
        AppActionTypes.Loading,
        props<{ loading: boolean }>()
    );
    public static userId = createAction(
        AppActionTypes.UserId,
        props<{ userId: string }>()
    )
}