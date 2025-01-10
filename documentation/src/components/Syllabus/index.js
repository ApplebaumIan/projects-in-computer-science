import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataGrid } from '@mui/x-data-grid';
import Mermaid from "@theme/Mermaid";
import CodeBlock from "@theme/CodeBlock";
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";
import { DateCalendar as Calendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const api_key = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf"; // don't worry its READ ONLY
const url = "https://courses.ianapplebaum.com";

function MermaidCodeBlock(props) {
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

MermaidCodeBlock.propTypes = {chart: PropTypes.string};

function SyllabusGantt(props) {
    let daysoff = props.daysOff;
    let chart = `gantt
    title Schedule Gantt Chart
    dateFormat  YYYY-MM-DD
    excludes ${daysoff}
    ${props.events != null ? props.events.map(props.prop1).join('') : ``}`;
    return  <>
        <div className={"row"}>
            {docusaurusConfig.customFields.is_pdf ? <></> : <MermaidCodeBlock chart={chart}/>}<div className={"col"}>
            <a className={"button button--primary margin-bottom--lg"}
               href={`${url}/syllabus/${props.courseid}/excel`}>Download as Excel Spreadsheet.</a>
        </div>
        </div>
        <Mermaid value={chart} config={{securityLevel: "loose", theme: "dark"}}/>
    </>
}

function Syllabus(props) {
    const [events, setEvents] = useState([]);
    const [syllabus, setSyllabus] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // State for calendar date

    useEffect(() => {
        if (events.length === 0) {
            fetch(`${url}/api/syllabus/${props.courseid}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${api_key}`
                },
            })
                .then(response => response.json())
                .then(result => {
                    setSyllabus(result.syllabus);
                    setEvents(result.events);
                })
                .catch(error => console.error('Error fetching syllabus:', error));
        }
    }, [events, props.courseid]);

    const handleCellClick = (params) => {
        if (params.field === 'mondayLab' || params.field === 'lecture' || params.field === 'fridayLab') {
            const weekEvents = events.filter(event => weeksBetween(syllabus.start_date, event.event_date) === params.row.week);
            const matchingEvent = weekEvents.find(event => event.event_name === params.value);
            if (matchingEvent) {
                setSelectedEvent(matchingEvent);
                setSelectedDate(dayjs(matchingEvent.event_date)); // Update calendar date
            }
        }
    };

    const formatDate = (date) => {
        return dayjs(date).format('dddd, MMMM D, YYYY');
    };

    const columns = [
        {
            field: 'week',
            headerName: 'Week',
            width: 90,
            cellClassName: 'wrapText',
        },
        {
            field: 'mondayLab',
            headerName: 'Monday Lab',
            width: 250,
            flex: 1,
            cellClassName: 'wrapText',
        },
        {
            field: 'lecture',
            headerName: 'Lecture',
            width: 250,
            flex: 1,
            cellClassName: 'wrapText',
        },
        {
            field: 'fridayLab',
            headerName: 'Friday Lab',
            width: 250,
            flex: 1,
            cellClassName: 'wrapText',
        },
        {
            field: 'deliverables',
            headerName: 'Deliverables',
            width: 300,
            flex: 1.5,
            cellClassName: 'wrapText',
            renderCell: (params) => (
                <ul style={{ margin: 0, padding: 0 }}>
                    {params.value.map((deliverable, index) => (
                        <li key={index}>
                            <label>
                                <input type="checkbox" /> {deliverable}
                            </label>
                        </li>
                    ))}
                </ul>
            )
        }
    ];

    const rows = Object.values(events.reduce((acc, event) => {
        const week = weeksBetween(syllabus.start_date, event.event_date);

        if (!acc[week]) {
            acc[week] = {
                id: week,
                week,
                mondayLab: '',
                lecture: '',
                fridayLab: '',
                deliverables: []
            };
        }

        if (event.class_type === 'Lab') {
            if (!acc[week].mondayLab) {
                acc[week].mondayLab = event.event_name;
            } else {
                acc[week].fridayLab = event.event_name;
            }
        } else if (event.class_type === 'Lecture') {
            acc[week].lecture = event.event_name;
        } else if (event.class_type === 'Milestone') {
            acc[week].mondayLab += acc[week].mondayLab ? `, ${event.event_name}` : event.event_name;
        } else if (event.class_type === 'Deliverable') {
            acc[week].deliverables.push(event.event_description);
        }

        return acc;
    }, {}));

    return (
        <>
            <SyllabusGantt
                courseid={props.courseid}
                events={events}
                daysOff={props.daysOff}
                prop1={(event) => formatEvent(syllabus, event, makeid(event.event_name))}
            />
            {selectedEvent && (
                <div style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
                    <h4>Event Description:</h4>
                    <p><strong>Name:</strong> {selectedEvent.event_name}</p>
                    <p><strong>Description:</strong> {selectedEvent.event_description}</p>
                    <p><strong>Date:</strong> {formatDate(selectedEvent.event_date)}</p>
                    <Calendar
                        value={selectedDate} // Bind the calendar to the selectedDate state
                        onChange={() => {}} // Keep it read-only for now
                        readOnly
                    />
                </div>
            )}
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowHeight={() => 'auto'}
                    sx={{
                        '& .wrapText': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        },
                    }}
                    onCellClick={handleCellClick}
                />
            </div>
        </>
    );
}

function weeksBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
}

function formatEvent(syllabus, event, id) {
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

    return `section ${phaseStr}
        ${event.event_name}: ${status}, ${event.event_date}, 1d
    `;
}

function makeid(event_name) {
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

export default Syllabus;
