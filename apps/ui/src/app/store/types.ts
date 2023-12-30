export type AppStore = ReturnType<typeof import('./app-store').createStore>['store'];

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
