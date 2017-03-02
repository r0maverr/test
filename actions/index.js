import * as CONST from '../constants';

function sendAjaxRequest(method, url, parameters, handler) {
    if(['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) == -1)
        console.error('Error in sendAjaxRequest!')

    var ajaxRequest = new XMLHttpRequest();

    var postfix = '?';
    for(var key in parameters){
        postfix += postfix == '?' ? '' : '&';
        postfix += key + '=' + parameters[key];
    }
    postfix = postfix=='?' ? '' : postfix;

    ajaxRequest.open(method, url + postfix, true);
    ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState != 4) return;

        if (ajaxRequest.status != 200) {
            console.log('URL: ' + url + '\n' + ajaxRequest.status + ': ' + ajaxRequest.statusText);
            handler('{"status": "' + ajaxRequest.status + '", "message": "' + ajaxRequest.statusText + '"}');
            // return;
        }

        handler(ajaxRequest.responseText);
    };
    ajaxRequest.send();
}

export function setEntity(entity){
    return (dispatch) => {
        var state = {};

        if(entity == CONST.ENTITY_DEPARTMENTS) {
            dispatch({
                type: CONST.SET_ENTITY,
                entity: CONST.ENTITY_DEPARTMENTS,
                api: CONST.ENTITY_DEPARTMENTS_API,
                fields: CONST.ENTITY_DEPARTMENTS_FIELDS
            });

            sendAjaxRequest('GET', CONST.ENTITY_DEPARTMENTS_API, {},
                (resText) => {
                    var res = JSON.parse(resText);
                    if (res.status == 200)
                        dispatch({
                            type: CONST.READ_SUCCESS,
                            data: res.data
                        });
                    else
                        dispatch({
                            type: CONST.READ_FAIL
                        });
                });
        }
        else if(entity == CONST.ENTITY_EMPLOYEE) {
            dispatch({
                type: CONST.SET_ENTITY,
                entity: CONST.ENTITY_EMPLOYEE,
                api: CONST.ENTITY_EMPLOYEE_API,
                fields: CONST.ENTITY_EMPLOYEE_FIELS
            });

            dispatch({
                type: CONST.REQUEST
            });

            sendAjaxRequest('GET', CONST.ENTITY_EMPLOYEE_API, {},
                (resText) => {
                    var res = JSON.parse(resText);
                    if (res.status == 200)
                        dispatch({
                            type: CONST.READ_SUCCESS,
                            data: res.data
                        });
                    else
                        dispatch({
                            type: CONST.READ_FAIL
                        });
                });
        }
        else {
        dispatch({
                type: CONST.SET_ENTITY_FAIL,
                entity: state.entity,
                api: state.api,
                fields: state.fields
            });
        }
    }
}

export function create(api, fields){
    return (dispatch) => {
        dispatch({
            type: CONST.REQUEST
        });

        var data = {};
        for(var i=1; i<fields.length; i++)
            // data[fields[i]] = fields[i];
            data[fields[i]] = i;

        sendAjaxRequest('PUT', api, data,
            (responseText) => {
                var res = JSON.parse(responseText);
                if(res.status == 200)
                    dispatch({
                        type: CONST.CREATE_SUCCESS,
                        data: res.data
                    });
                else
                    dispatch({
                        type: CONST.CREATE_FAIL
                    });
            });
    };
}

export function read(api){
    return (dispatch) => {
        dispatch({
            type: CONST.REQUEST
        });

        sendAjaxRequest('GET', api, {},
            (resText) => {
                var res = JSON.parse(resText);
                if(res.status == 200)
                    dispatch({
                        type: CONST.READ_SUCCESS,
                        data: res.data
                    });
                else
                    dispatch({
                        type: CONST.READ_FAIL
                    });
            });
    };
}

export function update(api, data){
    return (dispatch) => {
        dispatch({
            type: CONST.REQUEST
        });

        sendAjaxRequest('POST', api, data,
            (responseText) => {
                var res = JSON.parse(responseText);
                if(res.status == 200)
                    dispatch({
                        type: CONST.UPDATE_SUCCESS,
                        data: data
                    });
                else
                    dispatch({
                        type: CONST.UPDATE_FAIL
                    });
            });
    };
}

export function remove(api, data, fields){
    return (dispatch) => {
        dispatch({
            type: CONST.REQUEST
        });
        
        var params = {};
        params[fields[0]] = data[fields[0]];
        
        sendAjaxRequest('DELETE', api, params,
            (responseText) => {
                var res = JSON.parse(responseText);
                if(res.status == 200)
                    dispatch({
                        type: CONST.DELETE_SUCCESS,
                        data: data
                    });
                else
                    dispatch({
                        type: CONST.DELETE_FAIL
                    });
            });
    };
}