import { queryStation, queryStationById, updateStation, addStation, removeStation, queryOnlines } from '../services/api';

export default {
  namespace: 'station',

  state: {
    totalStations: 0,
    onlineStations: 0,
    cautions: 0,
    list: [],
    detail: {
        station: {},
        upsinfo: {},
        batteryinfo: {}
    },
    localStorageCache: {
    },
    status: undefined,
    pagination: {
        total: 0,
        currentPage: 1,
    }
  },

  effects: {
    *fetchStatus({payload, callback}, {call, put}) {
        const response = yield call(queryOnlines, payload);
        yield put({
          type: 'onlineStatus',
          payload: response.data,
        });
        callback && callback();
    },
    *fetch( {payload, callback}, { call, put }) {
      const response = yield call(queryStation, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      callback && callback();
    },

    *fetchLocal({payload, callback}, {call, put}) {
        let response = yield call(()=>{
            try{
                let upsinfo = JSON.parse(localStorage.getItem('create:upsinfo') || {});
                let batteryinfo = JSON.parse(localStorage.getItem('create:batteryinfo') || {});
                let station = JSON.parse(localStorage.getItem('create:station') || {});

                return {
                    upsinfo: upsinfo,
                    batteryinfo: batteryinfo,
                    station: station,
                }
            }catch(e){

                console.log(e);
                return {}
            }
        });
        yield put({
            type: 'saveLocal',
            payload: response
        })
        callback && callback();
    },

    *fetchDetail( {payload, callback}, { call, put }) {
      const response = yield call(queryStationById, payload);
      yield put({
        type: 'one',
        payload: response,
      });
      callback && callback(response.data);
    },

    *updateStation({payload, callback}, {call, put}) {
        const response = yield call(updateStation, payload);
        yield put({
            type: 'change',
            payload: response
        });
        callback && callback(response.status);
    },

    *removeStation({payload, callback}, {call, put}) {
        const response = yield call(removeStation, payload);
        yield put({
            type: 'change',
            payload: response
        });
        callback && callback(response.status);
    },

    *addStation({payload, callback}, {call, put}) {
        const response = yield call(addStation, payload);
        yield put({
            type: 'change',
            payload: response
        })

        callback && callback(response.status);
    }
  },

  reducers: {
    saveLocal(state, action) {
        return {
            ...state,
            localStorageCache: action.payload,
        }
    },
    onlineStatus(state, action) {
        return {
          ...state,
          totalStations: action.payload.totalStations,
          onlineStations: action.payload.onlineStations,
          cautions: action.payload.cautions,
        };
    },
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
    one(state, action) {
        return {
            ...state,
            detail: action.payload.data || {
                station: {},
                upsinfo: {},
                batteryinfo: {}
            }
        }
    },
    change(state, action) {
        return {
            ...state,
            status: action.payload.status,
        }
    }
  },
};
