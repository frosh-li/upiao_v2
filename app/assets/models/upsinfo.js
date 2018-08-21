import { queryUpsinfo, updateUpsinfo } from '../services/api';

export default {
  namespace: 'upsinfo',

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
      const response = yield call(queryUpsinfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback();
    },

    *updateUpsinfo({payload, callback}, {call, put}) {
        const response = yield call(updateUpsinfo, payload);
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
