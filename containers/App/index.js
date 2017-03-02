import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CONST from '../../constants';
import Table from '../../components/Table';
import * as actions from '../../actions';

import '../../extra/bootstrap.css';
import './App.css';

class App extends Component{
    constructor(props){
        super(props);

        this.handlerOnRead = this.handlerOnRead.bind(this);
        this.handlerOnCreate = this.handlerOnCreate.bind(this);
        this.handlerOnUpdate = this.handlerOnUpdate.bind(this);
        this.handlerOnRemove = this.handlerOnRemove.bind(this);

        this.handlerOnEntityClick = this.handlerOnEntityClick.bind(this);
    }
    componentDidMount(){
        this.props.actions.setEntity(CONST.ENTITY_DEPARTMENTS);
    }
    handlerOnCreate(){
        this.props.actions.create(this.props.state.api, this.props.state.fields);
    }
    handlerOnRead(){
        this.props.actions.read(this.props.state.api);
    }
    handlerOnUpdate(data){
        this.props.actions.update(this.props.state.api, data);
    }
    handlerOnRemove(){
        var selectedRow = this.table.state.selectedRow;
        if(selectedRow == null) return;
        
        this.props.actions.remove(
            this.props.state.api, 
            selectedRow.props.data, 
            this.props.state.fields);
    }
    handlerOnEntityClick(e){
        this.props.actions.setEntity(e.currentTarget.innerText);
    }
    render (){
        const {entity, fields, data, dataLoading,status} = this.props.state;
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-3">
                        <ul className="nav nav-pills nav-stacked">
                            <li role="presentation"
                                className={entity == CONST.ENTITY_DEPARTMENTS ? 'active' : ''}>
                                <a onClick={this.handlerOnEntityClick}>
                                    {CONST.ENTITY_DEPARTMENTS}
                                </a>
                            </li>
                            <li role="presentation"
                                className={entity == CONST.ENTITY_EMPLOYEE ? 'active' : ''}>
                                <a onClick={this.handlerOnEntityClick}>
                                    {CONST.ENTITY_EMPLOYEE}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-9">
                        <button type="button" className="btn btn-default"
                                onClick={this.handlerOnRead}>Update</button>
                        <button type="button" className="btn btn-primary"
                                onClick={this.handlerOnCreate}>Add</button>
                        <button type="button" className="btn btn-success"
                                onClick={this.handlerOnRemove}>Remove</button>
                        <p>
                            <span className="bg-primary text-center">{status}</span>
                        </p>
                        <Table
                            data={data}
                            fields={fields}
                            dataLoading={dataLoading}
                            onChange={this.handlerOnUpdate}
                            ref={(input) => { this.table = input; }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps (state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);