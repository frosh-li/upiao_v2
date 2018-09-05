import { stringify } from 'qs';
import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('http://127.0.0.1:7001/api_v2/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogout(params) {
  return request('http://127.0.0.1:7001/api_v2/loginOut/account', {
    method: 'POST',
    body: params,
  });
}

// 获取树形结构图
export async function queryTree(params) {
  return request('http://127.0.0.1:7001/api_v2/trees', {
    method: 'GET',
  });
}

// 修改某单个节点
export async function saveTreeNode(params) {
  return request('http://127.0.0.1:7001/api_v2/trees', {
    method: 'POST',
    body: params
  });
}

// 删除某单个节点
export async function removeTreeNode(params) {
  return request('http://127.0.0.1:7001/api_v2/trees/remove', {
    method: 'POST',
    body: params
  });
}

// 新增单个节点
export async function addTreeNode(params) {
  return request('http://127.0.0.1:7001/api_v2/trees/add', {
    method: 'POST',
    body: params
  });
}

// 获取站点列表结构图
export async function queryStation(params) {
  return request(`http://127.0.0.1:7001/api_v2/station?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryStationById(params) {
  return request(`http://127.0.0.1:7001/api_v2/station_by_id?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryOnlines(params) {
  return request(`http://127.0.0.1:7001/api_v2/connects?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryRealtime(params) {
  return request(`http://127.0.0.1:7001/api_v2/realtime?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryRealtimeCapacity(params) {
  return request(`http://127.0.0.1:7001/api_v2/capacity/top10?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryRealtimeLifetime(params) {
  return request(`http://127.0.0.1:7001/api_v2/lifetime/top10?${stringify(params)}`, {
    method: 'GET',
  });
}



export async function queryHistory(params) {
  return request(`http://127.0.0.1:7001/api_v2/history?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function queryCautions(params) {
  return request(`http://127.0.0.1:7001/api_v2/realtime/cautions?${stringify(params)}`, {
    method: 'GET',
  });
}


// 修改某单个节点
export async function updateStation(params) {
  return request('http://127.0.0.1:7001/api_v2/station', {
    method: 'POST',
    body: params
  });
}

// 删除某单个节点
export async function removeStation(params) {
  return request('http://127.0.0.1:7001/api_v2/station/remove', {
    method: 'POST',
    body: params
  });
}

// 新增单个节点
export async function addStation(params) {
  return request('http://127.0.0.1:7001/api_v2/station/add', {
    method: 'POST',
    body: params
  });
}

// 查询电池
export async function queryBattery(params) {
    console.log('query params', params)
  return request(`http://127.0.0.1:7001/api_v2/battery_info?${stringify(params)}`, {
    method: 'GET',
  });
}

// 更新电池信息
export async function updateBattery(params) {
  return request(`http://127.0.0.1:7001/api_v2/battery_info`, {
    method: 'POST',
    body: params
  });
}

// 查询电池
export async function queryUpsinfo(params) {
    console.log('query params', params)
  return request(`http://127.0.0.1:7001/api_v2/ups_info?${stringify(params)}`, {
    method: 'GET',
  });
}

// 更新电池信息
export async function updateUpsinfo(params) {
  return request(`http://127.0.0.1:7001/api_v2/ups_info`, {
    method: 'POST',
    body: params
  });
}

// 报警设置相关
export async function queryStationAlertDesc(params) {
  return request(`http://127.0.0.1:7001/api_v2/station_alert_desc?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function updateStationAlertDesc(params) {
  return request(`http://127.0.0.1:7001/api_v2/station_alert_desc`, {
    method: 'POST',
    body: params
  });
}
