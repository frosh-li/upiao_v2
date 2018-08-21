import request from '../utils/request';

export async function query() {
  return request('http://127.0.0.1:7001/api_v2/users');
}

export async function queryCurrent() {
  return request('http://127.0.0.1:7001/api_v2/currentUser');
}

export async function queryRoles() {
    return request('http://127.0.0.1:7001/api_v2/roles')
}

export async function updateUser(params) {
    return request('http://127.0.0.1:7001/api_v2/users/update', {
        method: 'POST',
        body: params
    });
}

export async function createUser(params) {
    return request('http://127.0.0.1:7001/api_v2/users', {
        method: 'POST',
        body: params
    });
}
