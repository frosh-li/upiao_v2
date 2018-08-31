import { queryRealtime, queryHistory, queryCautions} from '../services/api';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';

export default {
  namespace: 'realtime',

  state: {
    status: false,
    cautions: [],
    list: [],
    roleList: [],
    userList: [],
    currentUser: {},
    history: [],
    pagination: {
        total: 0,
        currentPage: 1,
    }
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRealtime);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchHistory({payload, callback}, {call, put}) {
        const response = yield call(queryHistory, payload);
        yield put({
            type: 'saveHistory',
            payload: response
        })
    },
    *cautions({payload, callback}, {call, put}) {
        const response = yield call(queryCautions, payload);
        yield put({
            type: 'saveCautions',
            payload: response
        })
    }

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    saveCautions(state, action) {
        return {
          ...state,
          cautions: action.payload.data.list,
          pagination: {
              currentPage: action.payload.data.page,
              pageSize: action.payload.data.pageSize,
              total: action.payload.data.totals,
          }
        };
    },
    saveHistory(state, action) {
      return {
        ...state,
        history: action.payload.data.list,
        pagination: {
            currentPage: action.payload.data.page,
            pageSize: action.payload.data.pageSize,
            total: action.payload.data.totals,
        }
      };
    },
  },
};
