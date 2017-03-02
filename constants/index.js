// первое поле в массиве FIELDS является ключом
export const ENTITY_DEPARTMENTS = 'departments';
export const ENTITY_DEPARTMENTS_API = '/api/departments';
export const ENTITY_DEPARTMENTS_FIELDS = ['id', 'name', 'description'];
export const ENTITY_EMPLOYEE = 'employee';
export const ENTITY_EMPLOYEE_API = '/api/employee';
export const ENTITY_EMPLOYEE_FIELS = ['id', 'firstName', 'lastName', 'departmentId'];

export const SET_ENTITY = 'SET_ENTITY';
export const SET_ENTITY_FAIL = 'SET_ENTITY_FAIL';

export const REQUEST = 'REQUEST';

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAIL = 'CREATE_FAIL';

export const READ_SUCCESS = 'READ_SUCCESS';
export const READ_FAIL = 'READ_FAIL';

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAIL = 'UPDATE_FAIL';

export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAIL = 'DELETE_FAIL';