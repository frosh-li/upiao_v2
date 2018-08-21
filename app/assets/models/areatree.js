import { queryTree, saveTreeNode, addTreeNode, removeTreeNode } from '../services/api';

export default {
  namespace: 'areatree',

  state: {
    list: [],
    status: undefined,
  },

  effects: {
    *fetch( {payload, callback}, { call, put }) {
      const response = yield call(queryTree);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback();
    },

    *saveNode({payload, callback}, {call, put}) {
        const response = yield call(saveTreeNode, payload);
        yield put({
            type: 'change',
            payload: response
        });
        callback && callback(response.status);
    },

    *removeNode({payload, callback}, {call, put}) {
        const response = yield call(removeTreeNode, payload);
        yield put({
            type: 'change',
            payload: response
        });
        callback && callback(response.status);
    },

    *addNode({payload, callback}, {call, put}) {
        const response = yield call(addTreeNode, payload);
        yield put({
            type: 'change',
            payload: response
        })

        callback && callback(response.status);
    }
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
