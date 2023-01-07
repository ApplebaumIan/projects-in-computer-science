const api_key = "rxtVZfqg4YzLysJn2Z4lTsWPN0bZSbD5orRbUPOb"; // don't worry its READ ONLY

import React, { useEffect, useState } from "react"


export default function Syllabus() {
  function weeksBetween(startDate, endDate) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the number of milliseconds between the two dates
    const milliseconds = end.getTime() - start.getTime();

    // Divide the number of milliseconds by the number of milliseconds in a week
    const weeks = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));

    return weeks + 1;
}



    const [events, setEvents] = useState()
    const [s, setSyllabus] = useState({})

    useEffect(()=>{
      if (events == null){
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer rxtVZfqg4YzLysJn2Z4lTsWPN0bZSbD5orRbUPOb");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://9e47-2607-fb90-37c-2b1a-9006-ba88-94f7-c4d4.ngrok.io/api/syllabus/1", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setSyllabus(result.syllabus)
            setEvents(result.events)
          })
          .catch(error => console.log('error', error));
      }
    },[events]);

    return <table>
                    <thead>
                    <tr>
                        <th scope="col" >
                            Week
                        </th>
                        <th scope="col" >
                            Type
                        </th>
                        <th scope="col">
                            Event
                        </th>
                        <th scope="col" >
                            <div className="flex items-center">
                                Description
                            </div>
                        </th>
                        <th scope="col" >
                            <div className="flex items-center">
                                Date
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
      {
      events != null ? events.map((event) => {
          return <tr key={event.id}>
          <th scope="col">
              {
                  weeksBetween(s.start_date, event.event_date)
              }
          </th>
          <th scope="row"
              >
              {event.class_type}
          </th>
          <th scope="row"
              >
              {event.event_name}
          </th>
          <td >
              {event.event_description}
          </td>
          <td >
              {event.event_date}
          </td>
      </tr>
      }) : <></>
    }
      </tbody>
      </table>
    ;
}
