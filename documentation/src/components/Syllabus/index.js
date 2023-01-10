import * as PropTypes from "prop-types";

const api_key = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf"; // don't worry its READ ONLY
const url = "https://ians-courses.ddns.net";

import React, { useEffect, useState } from "react"
import Mermaid from "@theme/Mermaid";
import CodeBlock from "@theme/CodeBlock";

function SyllabusTable(props) {
    return <table>
        <thead>
        <tr>
            <th scope="col">
                Week
            </th>
            <th scope="col">
                Type
            </th>
            <th scope="col">
                Event
            </th>
            <th scope="col">
                <div className="flex items-center">
                    Description
                </div>
            </th>
            <th scope="col">
                <div className="flex items-center">
                    Date
                </div>
            </th>
        </tr>
        </thead>
        <tbody>
        {
            props.events != null ? props.events.map(props.prop1) : <></>
        }
        </tbody>
    </table>;
}
function SyllabusGantt(props) {
    let chart = `gantt
    title Schedule Gantt Chart
    dateFormat  YYYY-MM-DD
    ${props.events != null ? props.events.map(props.prop1).join(''):``}`;
    return  <details><summary>Click here for Mermaid Diagram markdown.
        <Mermaid value={chart}
    />
    </summary>
    <CodeBlock>
        {chart}
    </CodeBlock>
    </details>

    // <Mermaid value={`gantt
    // title Projects in Computer Science Spring 2023 Syllabus
    // dateFormat  YYYY-MM-DD
    // ${props.events != null ? props.events.map(event=>formatEvent(event.toString())):``}
    // `
    // }/>
        ;
}

SyllabusTable.propTypes = {
    events: PropTypes.func,
    prop1: PropTypes.func
};
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
export default function Syllabus() {




    const [events, setEvents] = useState()
    const [s, setSyllabus] = useState({})

    useEffect(()=>{
      if (events == null){
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${api_key}`);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

          fetch(url + "/api/syllabus/1", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setSyllabus(result.syllabus)
            setEvents(result.events)
          })
          .catch(error => console.log('error', error));
      }
    },[events]);

  function removeEmoji(s) {
        return s.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      }


    function formatEvent(s,event) {
        let event_date = new Date(event.event_date);
        let today = Date.now();
        let status = ``
        if(today === event_date)
        {
            status = `active`
        }
        if(today > event_date)
        {
            status = `done`
        }

        let classType = (event.class_type !== "N/A" && !event.event_name.includes("Demo")) ? event.class_type : "";
        return `section Week ${weeksBetween(s.start_date, event.event_date)} 
         ${event.event_name} ${classType}:${event.event_name.includes("Demo") ? `milestone,`:``} ${status}, ${event.event_date}, 1d
        `;
        // return `${event.event_name}:${event.event_date}, 1d \n`;
    }
    return <>
        <SyllabusGantt events={events} prop1={(event) => {
            return formatEvent(s,event)
        }} />
        <SyllabusTable events={events} prop1={(event) => {
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
            <td>
                {event.event_description}
            </td>
            <td>
                {event.event_date}
            </td>
        </tr>
    }}/>
    </>
    ;
}
