import { queryStationAlertDesc, updateStationAlertDesc } from '../services/api';

export default {
  namespace: 'station_alert_desc',

  state: {
    list: [],
    status: undefined,
  },

  effects: {
    *fetch( {payload, callback}, { call, put }) {
      const response = yield call(queryStationAlertDesc, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback();
    },

    *updateStationAlertDesc({payload, callback}, {call, put}) {
        const response = yield call(updateStationAlertDesc, payload);
        yield put({
            type: 'change',
            payload: response
        });
        callback && callback(response.status);
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data.list || [],
      };
    },
    change(state, action) {
        return {
            ...state,
            status: action.payload.status,
        }
    }
  },
};
