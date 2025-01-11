import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DataGrid, GridToolbar } from '@mui/x-data-grid';
import {DateCalendar as Calendar} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {formatEvent, makeid, MermaidCodeBlock, SyllabusGantt, weeksBetween} from "./syllabusGantt";
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";
const api_key = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf"; // don't worry its READ ONLY
const url = "https://courses.ianapplebaum.com";

MermaidCodeBlock.propTypes = {chart: PropTypes.string};

function Syllabus(props) {
    const [events, setEvents] = useState([]);
    const [syllabus, setSyllabus] = useState({});
    const [selectedEvent, setSelectedEvent] = useState([]); // Changed to store multiple events
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
        if (['mondayLab', 'lecture', 'fridayLab', 'combinedEvents'].includes(params.field)) {
            const weekEvents = events.filter(event => weeksBetween(syllabus.start_date, event.event_date) === params.row.week);
            const matchingEvents = weekEvents.filter(event => {
                if (params.value) {
                    return params.value.split(', ').includes(event.event_name);
                }
                return false;
            });

            if (matchingEvents.length > 0) {
                const sortedEvents = matchingEvents.sort((a, b) => {
                    if (a.class_type === "Milestone" && b.class_type !== "Milestone") {
                        return -1;
                    } else if (a.class_type !== "Milestone" && b.class_type === "Milestone") {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                setSelectedEvent(sortedEvents); // Store all matching events, prioritizing milestones
                const earliestDate = sortedEvents.reduce((earliest, event) =>
                        new Date(event.event_date) < earliest ? new Date(event.event_date) : earliest,
                    new Date(sortedEvents[0].event_date)
                );
                setSelectedDate(dayjs(earliestDate)); // Update the calendar to the earliest event date
            }
        }
    };

    const formatDate = (date) => {
        return dayjs(date).format('dddd, MMMM D, YYYY');
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const columns = isMobile
        ? [
            {
                field: 'week',
                headerName: 'Week',
                width: 10,
                cellClassName: 'wrapText',
            },
            {
                field: 'combinedEvents',
                headerName: 'MWF Events',
                width: 300,
                flex: 1.5,
                cellClassName: 'wrapText',
                sortable: false,
            }
        ]
        : [
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
                sortable: false,
            },
            {
                field: 'lecture',
                headerName: 'Lecture',
                width: 250,
                flex: 1,
                cellClassName: 'wrapText',
                sortable: false,
            },
            {
                field: 'fridayLab',
                headerName: 'Friday Lab',
                width: 250,
                flex: 1,
                cellClassName: 'wrapText',
                sortable: false,
            },
            {
                field: 'deliverables',
                headerName: 'Deliverables',
                width: 300,
                flex: 1.5,
                cellClassName: 'wrapText',
                sortable: false,
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
        const eventDate = new Date(event.event_date);

        if (!acc[week]) {
            acc[week] = {
                id: week,
                week,
                combinedEvents: '',
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
            acc[week].combinedEvents += acc[week].combinedEvents ? `, ${event.event_name}` : event.event_name;
        } else if (event.class_type === 'Lecture') {
            acc[week].lecture = event.event_name;
            acc[week].combinedEvents += acc[week].combinedEvents ? `, ${event.event_name}` : event.event_name;
        } else if (['Milestone', 'Break!', 'Sprint'].includes(event.class_type)) {
            acc[week].mondayLab += acc[week].combinedEvents ? `, ${event.event_name}` : event.event_name;
            acc[week].combinedEvents += acc[week].combinedEvents ? `, ${event.event_name}` : event.event_name;
        } else if (event.class_type === 'Deliverable') {
            acc[week].deliverables.push(event.event_description);
        }

        return acc;
    }, {}));

    return (
        <>
            {selectedEvent.length > 0 && (
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: 20, padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <Calendar
                            value={selectedDate} // Bind the calendar to the selectedDate state
                            onChange={() => {}} // Keep it read-only for now
                            readOnly
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h4>Event Details:</h4>
                        {selectedEvent.map((event, index) => (
                            <div key={index} style={{ marginBottom: '1em' }}>
                                <p><strong>Name:</strong> {event.event_name}</p>
                                <p><strong>Description:</strong> {event.event_description}</p>
                                <p><strong>Date:</strong> {formatDate(event.event_date)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div style={{ height: 1020, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    {...(isMobile && { getRowHeight: () => 'auto' })} // Apply getRowHeight only for mobile
                    {...(!docusaurusConfig.customFields.is_pdf && {autoPageSize: ()=>true})}
                        disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            printOptions: { disableToolbarButton: true },
                            showQuickFilter: true,
                        },
                    }}
                    sx={{
                        '& .wrapText': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        },
                    }}
                    onCellClick={handleCellClick}
                />
            </div>
            <div style={{paddingTop:50}}>
                {!isMobile && <SyllabusGantt
                    courseid={props.courseid}
                    events={events}
                    daysOff={props.daysOff}
                    prop1={(event) => formatEvent(syllabus, event, makeid(event.event_name))}
                    url={url}
                />}
            </div>

        </>
    );
}

export default Syllabus;
