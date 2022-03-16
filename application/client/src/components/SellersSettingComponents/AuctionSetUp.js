
import React, { useState, Component } from 'react';



const AuctionSetUp = () => {





    const [start_date, set_start_date] = useState(null)
    const [end_date, set_end_date] = useState(null); 
    const [result, setResult] = useState(''); 
    const [colorAuctionResult, setcolorAuctionResult] = useState(''); 



    function getStartTime(val) {
      set_start_date(val.target.value); 
 

    }

    function getEndTime(val) {
      set_end_date(val.target.value); 

    }




    function daysDifference(d0, d1) {
      var diff = new Date(+d1).setHours(12) - new Date(+d0).setHours(12);
      return Math.round(diff/8.64e7);
    }


    function calculate() {
      console.log("start date: " + start_date); 
      console.log("end date: " + end_date); 

       
      const firsPartOfStartDate_start = start_date.split("T");
      const dateOfStart_start = firsPartOfStartDate_start[0].split("-");
      const hoursAndMin_start = firsPartOfStartDate_start[1].split(":");
      const [year_start, month_start,day_start]=dateOfStart_start;
      const [hour_start,min_start]=hoursAndMin_start;


      const firsPartOfStartDate_end = end_date.split("T");
      const dateOfStart_end = firsPartOfStartDate_end[0].split("-");
      const hoursAndMin_end = firsPartOfStartDate_end[1].split(":");
      const [year_end, month_end,day_end]=dateOfStart_end;
      const [hour_end,min_end]=hoursAndMin_end;

      
      console.log("---Start date--")
      console.log("Year: " + year_start); 
      console.log("Month: " + month_start); 
      console.log("Day: " + day_start); 
      console.log("Hour: " + hour_start); 
      console.log("Min: " + min_start); 
      console.log("---End date---"); 
      console.log("Year: " + year_end); 
      console.log("Month: " + month_end); 
      console.log("Day: " + day_end); 
      console.log("Hour: " + hour_end); 
      console.log("Min: " + min_end); 

      var convert_start = new Date(year_start, month_start, day_start); 
      var convert_end = new Date(year_end, month_end, day_end); 

      var result = daysDifference(convert_start, convert_end); 
      console.log("days: " + result); 

      if (result > 30) {
        console.log("cannot be more than 30 days"); 
        setResult('cannot be more than 30 days'); 
        setcolorAuctionResult('red'); 
      }
      if (result <= 30) {
        console.log("you can sell this item less than or equal to 30 days"); 
        setResult("you can sell this item less than or equal to 30 days"); 
        setcolorAuctionResult('green')
      }
    }

      return (
        <div>          
            <p>Start time {start_date} | end time {end_date} </p>
            <p style={{color: colorAuctionResult}}>{result}</p>
          
  
             
      
          <input placeholder="Start Date" className="buyerInput-Settings" name="startDate"  onChange={getStartTime} type="datetime-local"/>
          <input placeholder="End Date" className="buyerInput-Settings" name="endDate"  onChange={getEndTime} type="datetime-local"/>
          <input placeholder="Starting bid" className="starting-bid" type="text"/>
          <button onClick={calculate} className="sellerSettingsButtons">Set Up Auction Duration</button>
    
        </div>
      )
    
}

export default AuctionSetUp;
