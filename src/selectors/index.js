import { createSelector } from 'reselect';

export const commonSelect = state => state.common;
export const homeSelect = state => state.home;

export const tokenSelect = createSelector(
    commonSelect,
    common => common.token
);

export const appNameSelect = createSelector(
    commonSelect,
    common => common.appName
);

export const appLoadedSelect = createSelector(
    commonSelect,
    common => common.appLoaded
);

export const currentUserSelect = createSelector(
    commonSelect,
    common => common.currentUser
);

// components selectors
export const homeComponentSelect = createSelector(
    homeSelect,
    appNameSelect,
    tokenSelect,
    (homeState, appName, token) => ({ ...homeState, appName, token })
);