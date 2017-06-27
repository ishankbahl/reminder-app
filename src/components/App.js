import React,{Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {addReminder,deleteReminder,clearReminders} from "../actions";

class App extends Component{
  constructor(){
      super();
      this.state={
        text:"",
        dueDate:""
      };
      this.addReminder=this.addReminder.bind(this);
      this.renderReminders=this.renderReminders.bind(this);
      this.deleteReminder=this.deleteReminder.bind(this);
  }

  addReminder(){
    const {addReminder}=this.props;
    const {text,dueDate}=this.state;
    addReminder(text,dueDate);
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const {reminders}=this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder)=>{
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              <div className="list-item delete-button" onClick={()=>{this.deleteReminder(reminder.id)}}>&#x2715;</div>
            </li>
          );
        })}
      </ul>
    );
  }

  render(){
    return(
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input className="form-control" onChange={(event)=>this.setState({text:event.target.value})} placeholder="I have to..." />
            <input className="form-control" type="datetime-local" onChange={(event)=>this.setState({dueDate:event.target.value})} />
            <button type="button" onClick={()=>this.addReminder()} className="btn btn-success">Add Reminder</button>
          </div>
        </div>
        {this.renderReminders()}
        <div className="btn btn-danger" onClick={()=>this.props.clearReminders()} >Clear Reminders</div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    reminders:state
  }
}

export default connect(mapStateToProps,{addReminder,deleteReminder,clearReminders})(App);
