import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../../extra/bootstrap.css';

class TableRow extends Component{
    constructor(props){
        super(props);

        this.state = {
            active: false,
            textCell: null
        };

        this.handlerOnClick = this.handlerOnClick.bind(this);
        this.handlerOnDoubleClick = this.handlerOnDoubleClick.bind(this);
        this.handlerOnBlur = this.handlerOnBlur.bind(this);
        this.handlerOnKeyPress = this.handlerOnKeyPress.bind(this);
    }
    handlerOnClick(){
        this.props.onClick(this);
    }
    handlerOnDoubleClick(e){
        var self = this;

        var item = e.currentTarget;

        var input = document.createElement('input');
        input.type = 'text';
        input.value = item.innerHTML;
        input.onblur = function(e){ self.handlerOnBlur(e) };
        input.onkeypress = function(e){ self.handlerOnKeyPress(e) };

        this.setState({
            textCell: item.innerHTML
        });
        item.innerHTML = '';
        item.appendChild(input);
        input.focus();
    }
    handlerOnBlur(e){
        var input = e.currentTarget,
            item = input.parentNode;

        if(this.state.textCell != input.value){
            var data = {...this.props.data};
            var ind = item.cellIndex;

            data[this.props.fields[ind]] = input.value;

            this.props.onChange(data);
        }

        var text = input.value;
        item.removeChild(input);
        item.innerHTML = text;
    }
    handlerOnKeyPress(e){
        if(e.keyCode == 13 || e.keyCode == 27)
            e.currentTarget.blur();
    }
    render(){
        const data = this.props.data,
            fields = this.props.fields,
            active = this.state.active;

        var item = [];
        for(var i=0; i<fields.length; i++)
            item.push(
                <td key={i}
                    onDoubleClick={ i > 0 ? this.handlerOnDoubleClick : ''}>
                    {data[fields[i]]}
                </td>
            );

        return (
            <tr className={active ? 'active' : ''}
                onClick={this.handlerOnClick}
            >
                { item }
            </tr>);
    }
}

class Table extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedRow: null
        };

        this.handlerRowOnClick = this.handlerRowOnClick.bind(this);
    }
    handlerRowOnClick(tableRow){
        var selectedRow = this.state.selectedRow;

        if(selectedRow) selectedRow.setState({active: false});

        tableRow.setState({active: true});
        this.state.selectedRow = tableRow;
    }
    renderLoadingImage(){
        return (
            <div class="img-block">
                <img src="loading.gif"></img>
            </div>
        );
    }
    renderHeader(){
        var headers = this.props.fields,
            items = [];

        for(var i=0; i<headers.length; i++)
            items.push(
                <th key={ i }>
                    { headers[i] }
                </th>
            );

        return (
            <thead>
                <tr>{items}</tr>
            </thead>);
    }
    renderBody(){
        var data = this.props.data,
            fields = this.props.fields,
            rows = [];

        for(var i=0; i<data.length; i++)
            rows.push(
                <TableRow
                    key={i} data={data[i]} fields={fields}
                    onClick={this.handlerRowOnClick}
                    onChange={this.props.onChange}
                />
            );

        return <tbody>{ rows }</tbody>;
    }
    renderTable(){
        return (
            <div className="table-responsive ">
                <table className="table table-striped table-bordered">
                    { this.renderHeader() }
                    { this.renderBody() }
                </table>
            </div>
        );
    }
    render(){
        return this.props.dataLoading
            ? this.renderLoadingImage()
            : this.renderTable();
    }
}

export default Table;