import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function Time() {
  const [time, setTime] = useState('00:00:00 xm');
  const [date, setDate] = useState('day, month, 00, 0000');


  const [quote, setQuote] = useState('');
  

  //    function setQuote(quotes) {
  //     return quotes[Math.floor(Math.random() * quotes.length)];
  // }

  // function getRandomQuote() {
  //   setQuotes(getRandomQuote(quotes));
  //
  useEffect(()=>{
    const getQuote = () => {
      axios.get("https://type.fit/api/quotes")
      .then(res => {
        console.log(res.data[0])
        //setQuote([0]);
        setQuote(res.data[0])
      }).catch(err => {
        console.log(err)
      });
     };
      getQuote();
      
      
   },[quote])
 
   

  // // fetch method
  
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote();
      setQuote(quote + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [quote]);
  

  


useEffect(() => {
  setInterval(() => {


    const dt = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //Time
    let hour = dt.getHours();
    let minute = dt.getMinutes();
    let second = dt.getSeconds();


    let xm = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour < 10) ? '0' + hour : hour;
    minute = (minute < 10) ? '0' + minute : minute;
    second = (second < 10) ? '0' + second : second;

    let newTime = `${hour}:${minute}:${second} ${xm}`;
    setTime(newTime);

    // Date
    let dayIndex = dt.getDay();
    let dayName = dayNames[dayIndex];

    let monthIndex = dt.getMonth();
    let monthName = monthNames[monthIndex];

    let today = dt.getDate();
    let year = dt.getFullYear();

    today = (today < 10) ? '0' + today : today;

    let newDate = `${dayName}, ${monthName}, ${today} ${year}`;
    setDate(newDate);


  }, 1000);
})
return (
  <div className="text">
         <div className="quote">
           {/* <button onClick={getQuote}>Get Quote</button> */}
           {/* { quote &&  } */}
      
           <h3>
            <span>"</span>
            {quote?.text}
           </h3>
           <i>- {quote?.author}</i>
           </div>
    
    <div className="clock">

      <h1>{time}</h1>
      <p>{date}</p>
    </div>
  </div>
)
}
