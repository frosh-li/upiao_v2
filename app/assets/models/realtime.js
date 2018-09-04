import { queryRealtime, queryHistory, queryCautions, queryRealtimeLifetime,queryRealtimeCapacity} from '../services/api';
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
    },
    lifetimeTop10: [],
    capacityTop10: [],
    dataIndex: {
        startId: "",
        oldStartId: "",
        endId: "",
        startIndex: 0,
        endIndex: 0,
        oldStartIndex: 0,
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
    *fetchLifetime(_, { call, put }) {
      const response = yield call(queryRealtimeLifetime);
      yield put({
        type: 'saveLifetime',
        payload: response,
      });
    },
    *fetchCapacity(_, { call, put }) {
      const response = yield call(queryRealtimeCapacity);
      yield put({
        type: 'saveCapacity',
        payload: response,
      });
    },
    *fetchHistory({payload, callback}, {call, put}) {
        const response = yield call(queryHistory, payload);
        yield put({
            type: 'saveHistory',
            payload: response
        })
        callback && callback(response.data);
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
    saveLifetime(state, action) {
      return {
        ...state,
        lifetimeTop10: action.payload.data,
      };
    },
    saveCapacity(state, action) {
      return {
        ...state,
        capacityTop10: action.payload.data,
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
        dataIndex: {
            startId: action.payload.data.startId,
            oldStartId: action.payload.data.oldStartId,
            endId: action.payload.data.endId,
            startIndex: action.payload.data.startIndex,
            endIndex: action.payload.data.endIndex,
            oldStartIndex: action.payload.data.oldStartIndex,
        }
      };
    },
  },
};
