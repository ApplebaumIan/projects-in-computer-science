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
            {/*<th scope="col">*/}
            {/*    Type*/}
            {/*</th>*/}
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
    // let daysoff = `2023-03-07 2023-03-08 2023-03-09 2023-03-10 2023-03-11 2023-03-12`;
    /*
    Monday, November 20 - Wednesday, November 22
Fall Break (no classes held)
Thursday, November 23 - Sunday, November 26
Thanksgiving holiday (no classes held)
     */
    let daysoff = props.daysOff;
    let chart = `gantt
    title Schedule Gantt Chart
    dateFormat  YYYY-MM-DD
    excludes ${daysoff}
    ${props.events != null ? props.events.map(props.prop1).join('') : ``}`;
    return  <>
        {/*TODO: Fix nested <detail> in tab for pdf export.*/}
        {/*<div className={"row"}>*/}
        {/*    <div className={"col"}>*/}
        {/*    <details><summary className={"button button--outline button--primary margin-bottom--lg"}>Click here for Mermaid Diagram markdown.*/}
        {/*    </summary>*/}
        {/*        <CodeBlock>*/}
        {/*            ```mermaid{`\n`}*/}
        {/*            {chart+"\n"}*/}
        {/*            ```*/}
        {/*        </CodeBlock>*/}
        {/*    </details>*/}
        {/*</div>*/}
            <div className={"col"}>
                <a className={"button button--primary margin-bottom--lg"} href={`${url}/syllabus/${props.courseid}/excel`}>Download as Excel Spreadsheet.</a>
            </div>
        {/*</div>*/}
        <Mermaid value={chart} config={{securityLevel:"loose", theme:"dark"}} />
</>

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

    function makeid(event_name) {
        let id = event_name.toLowerCase()
        id = id.replaceAll(" ","")
        id = id.replaceAll("/","")
        id = removeEmoji(id)
        return id
    }
  function removeEmoji(s) {
        return s.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
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
    const printTask = function (taskId) {
        alert('taskId: ' + taskId);
    };
    function formatEvent(s,event,id) {
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


        let regex = /\bDemo\b/;

        let classType = (event.class_type !== "N/A" && !regex.test(event.event_name)) ? event.class_type : "";
        let isMilestoneDemo = `${regex.test(event.event_name) ? ` crit, milestone,` : ``}`;
        let isAssignment = `${event.class_type === "Assignment" ? ` milestone,` : ``}`;
        let lab = `${event.event_name} ${classType}:  ${isMilestoneDemo} ${isAssignment} ${status} ${id} , ${event.event_date},  ${isAssignment != `` ? `1h` : `1d`}`;
        let lecture = `${event.event_name} ${classType}:  ${isMilestoneDemo} ${isAssignment} ${status} ${id} , ${event.event_date},  1d`;
        let assignment = `${event.event_name} ${classType}:  ${isMilestoneDemo} ${isAssignment} ${status} ${id} , ${event.event_date},  12h`;
        let sprint = props.oneWeekSprints ?
            `${event.event_name}: ${status}, ${event.event_date}, 1w`:
            `${event.event_name}: ${status}, ${event.event_date}, 2w`;
        let break_sprint = `${event.event_name}: ${status}, ${event.event_date}, 1w`;
        let three_week_sprint = `${event.event_name}: ${status}, ${event.event_date}, 16d`;
        let sbreak = `${event.event_name}: done, ${event.event_date}, 1d`;
        let week = weeksBetween(s.start_date, event.event_date);
        var phaseStr = phase(week);
        var gantt_event = ""
        switch (event.class_type){
            case "Lab":
                gantt_event = lab
                    // + `\nclick  ${id} href "https://mermaidjs.github.io/"`
                break
            case "Lecture":
                gantt_event = lecture
                break
            case "Sprint":
                gantt_event = (event.event_name === "Sprint 0" || event.event_name === "Sprint 6") ? break_sprint : sprint
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
        <div className={"markdown"}>
            <SyllabusGantt courseid={props.courseid} events={events} daysOff={props.daysOff} prop1={(event) => {
                return formatEvent(s,event,makeid(event.event_name))
            }} />
        </div>

        <SyllabusTable events={events} prop1={(event) => {
        return <tr id={makeid(event.event_name)+"-id"} key={event.event_name+event.id}>
            <th scope="col">
                {
                    weeksBetween(s.start_date, event.event_date)
                }
            </th>
            {/*<th scope="row"*/}
            {/*>*/}
            {/*    {event.class_type}*/}
            {/*</th>*/}
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
