import * as PropTypes from "prop-types";

const api_key = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf"; // don't worry its READ ONLY
const url = "https://courses.ianapplebaum.com";

import React, { useEffect, useState } from "react"

export default function Event() {




    const [events, setEvents] = useState({})
    const [s, setSyllabus] = useState({})

    useEffect(()=>{
      if (JSON.stringify(events) === '{}'){
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${api_key}`);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

          fetch(url + "/api/syllabus/1/event/8", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setSyllabus(result.syllabus)
            setEvents(result.event)
          })
          .catch(error => console.log('error', error));
      }
    },[events]);


    return <>
        <b>Temple University CIS {s.course_name} {s.course_year} {s.course_semester}</b>
        <br/>
        <b>{events.event_date ? new Date(events.event_date.replaceAll("-","/")).toDateString()+", 3:30 - 4:50 pm EST" : ""}</b><br/>

        {/*{events.event_description ? events.event_description : ""}*/}
    </>
    ;
}
