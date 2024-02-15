export interface AppState {
  username: string;
  date: string;
  time: string;
  devices: string[];
}

export enum ActionType {
  SET_USERNAME = 'SET_USERNAME',
  SET_DATE = 'SET_DATE',
  SET_TIME = 'SET_TIME',
  SET_DEVICES = 'SET_DEVICES',
}
export const setUsernameAction = (username: string) => ({
  type: ActionType.SET_USERNAME,
  payload: username,
});

export const setDateAction = (date: string) => ({
  type: ActionType.SET_DATE,
  payload: date,
});

export const setTimeAction = (time: string) => ({
  type: ActionType.SET_TIME,
  payload: time,
});

export const setSelectedDevicesAction = (devices: string[]) => ({
  type: ActionType.SET_DEVICES,
  payload: devices,
});
