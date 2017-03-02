import * as CONST from '../constants';

const initialState  = {
    entity: '',
    api: '',
    fields: '',
    data: [],
    dataLoading: false,
    status: 'status'
};

export default function(state = initialState, action) {
    switch(action.type){
        case CONST.SET_ENTITY:
            return {...state,
                entity: action.entity,
                api: action.api,
                fields: action.fields,
                status: 'New entity setted!'
            };

        case CONST.SET_ENTITY_FAIL:
            return {...state,
                status: 'Error! New entity not setted!'
            };

        case CONST.REQUEST:
            return {...state,
                data: state.data,
                dataLoading: true};

        case CONST.CREATE_SUCCESS:
            var data = state.data;
            data.push(action.data);

            return {...state,
                data: data,
                dataLoading: false,
                status: 'Row is created!'};

        case CONST.CREATE_FAIL:
            return {...state,
                data: state.data,
                dataLoading: false,
                status: 'Error! Row is not created!'};

        case CONST.READ_SUCCESS:
            console.log(action.data);
            return {...state,
                data: action.data,
                dataLoading: false,
                status: 'Table is updated!'};

        case CONST.READ_FAIL:
            return {...state,
                data: state.data,
                dataLoading: false,
                status: 'Error! Table is not updated!'};
        
        case CONST.UPDATE_SUCCESS:
            var data = state.data,
                modifiedRow = action.data,
                fields = state.fields;

            for(var i=0; i<data.length; i++)
                if(data[i][fields[0]] == modifiedRow[fields[0]])
                    for(var j=0; j<fields.length; j++)
                        data[i][fields[j]] = modifiedRow[fields[j]];

            return {...state,
                data: data,
                dataLoading: false,
                status: 'Row is updated!'};
            
        case CONST.UPDATE_FAIL:
            return {...state,
                data: state.data,
                dataLoading: false,
                status: 'Error! Row is not updated!'};

        case CONST.DELETE_SUCCESS:
            var field0 = action.data[state.fields[0]],
                data = state.data;
            
            // console.log(field0);
            // console.log(data);
            
            for(var i=0; i<data.length; i++){
                var row = data[i];
                if(row[state.fields[0]] == field0)
                    data.splice(i,1);
            }
            // console.log(data);

            return {...state,
                data: data,
                dataLoading: false,
                status: 'Row is deleted!'};

        case CONST.DELETE_FAIL:
            return {...state,
                data: state.data,
                dataLoading: false,
                status: 'Error! Row is not deleted!'};

        default:
            return state;
    }
}