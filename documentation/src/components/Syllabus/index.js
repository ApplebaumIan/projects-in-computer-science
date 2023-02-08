import * as PropTypes from "prop-types";

const api_key = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf"; // don't worry its READ ONLY
const url = "https://courses.ianapplebaum.com";

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
    excludes 2023-03-07 2023-03-08 2023-03-09 2023-03-10 2023-03-11 2023-03-12
    ${props.events != null ? props.events.map(props.prop1).join(''):``}`;
    return  <details><summary>Click here for Mermaid Diagram markdown.
        <Mermaid value={chart}
    />
    </summary>
    <CodeBlock>
    ```mermaid{`\n`}
        {chart+"\n"}
    ```
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
export default function Syllabus(props) {




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

          fetch(url + `/api/syllabus/${props.courseid}`, requestOptions)
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


    function phase(phase) {
        if (phase <= 2) {
            return `Inception Phase`
        } else if (phase > 2 && phase <= 6) {
            return `Elaboration Phase`
        } else {
            return `Construction Phase`
        }
    }
    function formatEvent(s,event) {
        let event_date = new Date(event.event_date);
        let today = new Date();
        let status = ``
        if(event.class_type !== "Sprint") {
            if (event_date.getFullYear() === today.getFullYear() &&
                event_date.getMonth() === today.getMonth() &&
                event_date.getDate() === today.getDate()) {
                status = `active`
            }
            else if (today.getTime() > event_date.getTime()) {
                status = `done`
            }
        }



        let classType = (event.class_type !== "N/A" && !event.event_name.includes("Demo")) ? event.class_type : "";
        let isMilestoneDemo = `${event.event_name.includes("Demo") ? `crit, milestone,` : ``}`;
        let isAssignment = `${event.class_type === "Assignment" ? `milestone,` : ``}`;
        let lab = `${event.event_name} ${classType}:${isMilestoneDemo} ${isAssignment} ${status}, ${event.event_date}, 1d`;
        let lecture = `${event.event_name} ${classType}:${isMilestoneDemo} ${isAssignment} ${status}, ${event.event_date}, 1d`;
        let assignment = `${event.event_name} ${classType}:${isMilestoneDemo} ${isAssignment} ${status}, ${event.event_date}, 12h`;
        let sprint = props.oneWeekSprints ? `${event.event_name}: ${status}, ${event.event_date}, 1w`: `${event.event_name}: ${status}, ${event.event_date}, 2w`;
        let break_sprint = `${event.event_name}: ${status}, ${event.event_date}, 1w`;
        let three_week_sprint = `${event.event_name}: ${status}, ${event.event_date}, 16d`;
        let sbreak = `${event.event_name}: done, ${event.event_date}, 1d`;
        let week = weeksBetween(s.start_date, event.event_date);
        var phaseStr = phase(week);
        var gantt_event = ""
        switch (event.class_type){
            case "Lab":
                gantt_event = lab
                break
            case "Lecture":
                gantt_event = lecture
                break
            case "Sprint":
                gantt_event = (event.event_name === "Sprint 2" || event.event_name === "Sprint 0") ? break_sprint : sprint
                if  (event.event_name === "Sprint 5" && !props.oneWeekSprints){
                    gantt_event = three_week_sprint
                }
                break
            case "Break!":
                gantt_event = sbreak
                break
            // case "Assignment":
            //     gantt_event = assignment
            //     break
            default:
                gantt_event = lab
                break
        }
        return `section ${phaseStr} 
         ${gantt_event}
        `;
        // return `${event.event_name}:${event.event_date}, 1d \n`;
    }
    return <>
        <SyllabusGantt events={events} prop1={(event) => {
            return formatEvent(s,event)
        }} />
        <SyllabusTable events={events} prop1={(event) => {
        return <tr key={event.event_name+event.id}>
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
