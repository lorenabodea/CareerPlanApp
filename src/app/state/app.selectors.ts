import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { RootState } from "./root.state";

const selectFeature = (state: RootState) => state.app;

export class AppSelectors {
    public static initialized = createSelector(
        selectFeature,
        (state: AppState) => state.initialized
    );
    public static loading = createSelector(
        selectFeature,
        (state: AppState) => state.loading
    );
    public static userId = createSelector(
        selectFeature,
        (state: AppState) => state.userId
    );
}
