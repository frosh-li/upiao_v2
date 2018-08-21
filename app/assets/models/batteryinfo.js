import { queryBattery, updateBattery} from '../services/api';

export default {
  namespace: 'batteryinfo',

  state: {
    list: [],
    pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
    },
    status: undefined,
  },

  effects: {
    *fetch( {payload, callback}, { call, put }) {
      const response = yield call(queryBattery, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback();
    },

    *updateBattery({payload, callback}, {call, put}) {
        const response = yield call(updateBattery, payload);
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
        pagination: {
            currentPage: action.payload.data.page,
            pageSize: action.payload.data.pageSize,
            total: action.payload.data.totals,
        }
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
