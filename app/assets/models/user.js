import { query as queryUsers, queryCurrent, queryRoles, updateUser, createUser } from '../services/user';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';

export default {
  namespace: 'user',

  state: {
    status: false,
    list: [],
    roleList: [],
    userList: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *updateUser({payload, callback}, {call, put}) {
        const response = yield call(updateUser, payload);
        yield put({
          type: 'update',
          payload: response,
        });
        callback && callback(response.status);
    },

    *createUser({payload, callback}, {call, put}) {
        const response = yield call(createUser, payload);
        yield put({
          type: 'update',
          payload: response,
        });
        callback && callback(response.status);
    },

    *fetchRoles(_, { call, put }) {
      const response = yield call(queryRoles);
      yield put({
        type: 'saveRoles',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if(response && response.status === 401){
          yield put(
            routerRedux.push({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            })
          );
          // return;
      }

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data.list,
      };
    },
    update(state, action) {
      return {
        ...state,
        status: action.payload.status,
      };
    },
    saveRoles(state, action) {
        return {
            ...state,
            roleList: action.payload.data.list || [],
        }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
