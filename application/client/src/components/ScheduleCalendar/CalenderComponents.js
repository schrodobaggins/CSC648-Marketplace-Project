import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { v4 as uuidv4 } from 'uuid';

//import CalendarLists from '../ScheduleCalendar/CalendarListsDisplay'; 
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
  } from '@devexpress/dx-react-scheduler-material-ui';
import { GiConsoleController } from 'react-icons/gi';


 export default class CalenderComponents extends React.PureComponent {





    constructor(props) {
      super(props);
  
      this.state = {
        data: [   
        ],

        currentDate: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      };
      // startDate.split("/"); 12 32 2021
    
      /*
      startDate: new Date(2021, 6, 15, 9, 35),
      endDate: new Date(2021, 6, 15, 12, 30),
      */
      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
     // this.getDate = this.getDate.bind(this); 
    }

    /*
    getDate(str) {
      console.log("calling: " + str); 
      var format = "dd/mm/yyyy hh:ii:ss"; 
      var normalized     = str.replace(/[^a-zA-Z0-9]/g, '-');
      var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
      var formatItems     = normalizedFormat.split('-');
      var dateItems       = normalized.split('-');
  
      var monthIndex  = formatItems.indexOf("mm");
      var dayIndex    = formatItems.indexOf("dd");
      var yearIndex   = formatItems.indexOf("yyyy");
      var hourIndex     = formatItems.indexOf("hh");
      var minutesIndex  = formatItems.indexOf("ii");
      var secondsIndex  = formatItems.indexOf("ss");
  
      var today = new Date();
  
      var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
      var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
      var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();
  
      var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
      var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
      var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();
  
  
    return new Date(year,month,day,hour,minute,second);
  
  }
*/


  
convertDate(dataAsString)
{
  
 const firsPartOfStartDate = dataAsString.split("T");
 const dateOfStartDate = firsPartOfStartDate[0].split("-");
 const hoursAndMin = firsPartOfStartDate[1].split(":");
 const [year, month,day]=dateOfStartDate;
 const [hour,min]=hoursAndMin;
 const convertedDate= new Date(year,month - 1,day,hour,min);
 return convertedDate;
}

    handleChange(event) {

      // console.log(event.target.name)
      // console.log(event.target.value)

      this.setState({
        [event.target.name]: event.target.value
      }); 



    //   console.log("title: " + this.state.title); 

    //   console.log("start date: " + this.state.startDate); 
    //   console.log("end date: " + this.state.endDate); 

    //  console.log("location: " + this.state.location); 


     // console.log()
     // console.log(this.getDate(this.state.startDate)); 
  

    }

    handleSubmit(event) {
    const id =uuidv4();
    const {title, startDate, endDate, location } = this.state;

    const finalStartDate= this.convertDate(startDate);
    const finalEndDate= this.convertDate(endDate);
     let scheduleData = { title: this.state.title, startDate: finalStartDate, endDate: finalEndDate, location: this.state.location,id };

   //console.log(finalStartDate);
   //console.log(finalEndDate);
    //  const startDateObj = new Date()
    //  console.log("start Date:"+ startDate); 
    //  console.log("end Date:"+ endDate); 
     // let scheduleData = { title: title, startDate: startDate, endDate: endDate, location: location };
      //let scheduleData = { title: title, location: location };

      /*
      this.setState({
        data: [ scheduleData ] 
      });
      */

      this.setState(prevState => ({
        data: [ ...prevState.data, scheduleData ] 
      })); 


      event.preventDefault();
    }



    deleteHandle(id) {
      console.log(id);
        const updateData = this.state.data.filter((datas) => { return datas.id !== id})
       
        this.setState({
          data: updateData 
        });
        
    }

  
  
    render() {
      const { data, currentDate } = this.state;

  
      return (
        <div className="setUp-Schedule-wrapper">
            <NavBar page={"workSchedule"}/>
            <h1>Set Up Schedule</h1>
            <div className="setUp_Schedule-containerOne">
                <Paper>
                <Scheduler
                    data={data}
                    height={660}
                >
                    <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={this.currentDateChange}
                    />
                    <WeekView
                    startDayHour={6}
                    endDayHour={24}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
                </Paper>
            </div>
            <div className="setUp_Schedule_containerTwo">
              <h3>Set Up</h3>
              <div>
                <input placeholder="Title" className="buyerInput-Settings" name="title" value={this.state.title} onChange={this.handleChange} type="text"/>
                <input placeholder="Start Date" className="buyerInput-Settings" name="startDate" value={this.state.startDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="End Date" className="buyerInput-Settings" name="endDate" value={this.state.endDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="Location" className="buyerInput-Settings" name="location" value={this.state.location} onChange={this.handleChange} type="text"/>
                <button className="sellerSettingsButtons" onClick={this.handleSubmit}>Submit</button>
              </div>
              <h3>Meeting Notes</h3>
              <div className="listsMeetingNotes_container">
                {/*<CalendarLists handleDelete={this.handleDelete} items={this.state.data}/>*/}

                {console.log(this.state.data)}
                {this.state.data==null?<div></div>:
          this.state.data.map((datas) => <div className="listsMeetingNotes" >
                    <li key={datas.id} className="itemMeetingNotes">{datas.title} <button className="listsMeetingsNotes_button" onClick={() => this.deleteHandle(datas.id)}>Delete</button></li>
                  
                </div>)}
    
              </div>
            </div>
        </div>
      );
    }
  }
