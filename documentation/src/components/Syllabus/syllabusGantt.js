import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";
import React from "react";
import PropTypes from "prop-types";
import Mermaid from "@theme/Mermaid";
import CodeBlock from "@theme/CodeBlock";
export function MermaidCodeBlock(props) {
    return <div className={"col"}>
        <details>
            <summary className={"button button--outline button--primary margin-bottom--lg"}>Click here for Mermaid
                Diagram markdown.
            </summary>
            <CodeBlock>
                ```mermaid{`
`}
                {props.chart + "\n"}
                ```
            </CodeBlock>
        </details>
    </div>;
}

export function SyllabusGantt(props) {
    let daysoff = props.daysOff;
    let chart = `gantt
    title Schedule Gantt Chart
    dateFormat  YYYY-MM-DD
    excludes ${daysoff}
    ${props.events != null ? props.events.map(props.prop1).join('') : ``}`;
    return <>
        <div className={"row"}>
            {docusaurusConfig.customFields.is_pdf ? <></> : <MermaidCodeBlock chart={chart}/>}
            <div className={"col"}>
                <a className={"button button--primary margin-bottom--lg"}
                   href={`${props.url}/syllabus/${props.courseid}/excel`}>Download as Excel Spreadsheet.</a>
            </div>
        </div>
        <Mermaid value={chart} config={{securityLevel: "loose", theme: "dark"}}/>
    </>
}

export function weeksBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
}

export function formatEvent(syllabus, event, id) {
    let event_date = new Date(event.event_date);
    let today = new Date();
    let status = ``;

    if (event.class_type !== "Sprint") {
        if (
            event_date.getFullYear() === today.getFullYear() &&
            event_date.getMonth() === today.getMonth() &&
            event_date.getDate() === today.getDate()
        ) {
            status = `active`;
        } else if (today.getTime() > event_date.getTime()) {
            status = `done`;
        }
    }

    const week = weeksBetween(syllabus.start_date, event.event_date);
    const phaseStr = phase(week);

    let gantt_event = "";

    switch (event.class_type) {
        case "Lab":
            gantt_event = `${event.event_name}: ${status}, ${event.event_date}, 1d`;
            break;
        case "Lecture":
            gantt_event = `${event.event_name}: ${status}, ${event.event_date}, 1d`;
            break;
        case "Sprint":
            const isOneWeekSprint = event.event_name === "Sprint 0" || event.event_name === "Final Sprint";
            gantt_event = `${event.event_name}: ${status}, ${event.event_date}, ${isOneWeekSprint ? "1w" : "2w"}`;
            break;
        case "Milestone":
            gantt_event = `${event.event_name}: crit, milestone, ${status}, ${event.event_date}, 1d`;
            break;
        case "Break!":
            gantt_event = `${event.event_name}: done, ${event.event_date}, 1d`;
            break;
        case "Deliverable":
            gantt_event = ``;
            break;
        default:
            gantt_event = `${event.event_name}: ${status}, ${event.event_date}, 1d`;
            break;
    }

    return `section ${phaseStr}
     ${gantt_event}
    `;
}

export function makeid(event_name) {
    let id = event_name.toLowerCase();
    id = id.replaceAll(" ", "");
    id = id.replaceAll("/", "");
    id = removeEmoji(id);
    return id;
}

function removeEmoji(s) {
    return s.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
}

function phase(phase) {
    if (phase <= 2) {
        return `Inception Phase`;
    } else if (phase > 2 && phase <= 6) {
        return `Elaboration Phase`;
    } else {
        return `Construction Phase`;
    }
}
