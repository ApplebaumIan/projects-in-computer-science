import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import {
    Container,
    Box,
    Paper,
    Typography,
    List,
} from "@mui/material";

import {
    DateCalendar as Calendar,
    PickersDay,
} from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";

import {
    formatEvent,
    makeid,
    MermaidCodeBlock,
    SyllabusGantt,
} from "./syllabusGantt";

/** ─── CONFIGURATION ─────────────────────────────────────────────────────────── */
// API credentials for fetching the syllabus data
const API_KEY = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf";
// Base URL of the syllabus API
const BASE_URL = "https://courses.ianapplebaum.com";

// Colors used to highlight days with events
const HIGHLIGHT_COLOR = {
    bg: (theme) => theme.palette.error.dark,       // background for highlighted days
    hover: (theme) => theme.palette.error.light,   // background on hover
    text: (theme) => theme.palette.secondary.contrastText, // text color on highlights
};

/** ─── HOOK: fetch syllabus + events ───────────────────────────────────────── */
function useSyllabusEvents(courseId) {
    const [data, setData] = useState({
        syllabus: null,
        events: [],
    });

    useEffect(() => {
        if (!data.syllabus) {
            fetch(`${BASE_URL}/api/syllabus/${courseId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            })
                .then((res) => res.json())
                .then(({ syllabus, events }) => {
                    setData({ syllabus, events }); // store fetched data
                })
                .catch(console.error);
        }
    }, [courseId, data.syllabus]);

    return data; // returns { syllabus, events }
}

/** ─── STYLED DAY CELL ───────────────────────────────────────────────────────── */
// Extend the default day cell to apply custom styles when hasEvent is true
const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "hasEvent",
})(({ theme, hasEvent }) => ({
    ...(hasEvent && {
        backgroundColor: HIGHLIGHT_COLOR.bg(theme),
        color: HIGHLIGHT_COLOR.text(theme),
        "&:hover": {
            backgroundColor: HIGHLIGHT_COLOR.hover(theme),
        },
        "&.Mui-selected": {
            backgroundColor: HIGHLIGHT_COLOR.hover(theme),
            color: HIGHLIGHT_COLOR.text(theme),
        },
    }),
}));

// Day cell wrapper that checks if this date has any events
function EventDay({ day, highlightedDates, outsideCurrentMonth, ...other }) {
    const iso = day.format("YYYY-MM-DD");
    const hasEvent = !outsideCurrentMonth && highlightedDates.includes(iso);

    return (
        <CustomPickersDay
            {...other}
            day={day}
            hasEvent={hasEvent}
            outsideCurrentMonth={outsideCurrentMonth}
        />
    );
}
EventDay.propTypes = {
    day: PropTypes.object.isRequired,
    highlightedDates: PropTypes.arrayOf(PropTypes.string),
    outsideCurrentMonth: PropTypes.bool,
};

/** ─── CALENDAR COMPONENT ───────────────────────────────────────────────────── */
function HighlightedCalendar({ value, onChange, minDate, maxDate, highlightedDates }) {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            slots={{ day: EventDay }}                // use our custom day renderer
            slotProps={{ day: { highlightedDates } }} // pass dates to highlight
        />
    );
}
HighlightedCalendar.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    highlightedDates: PropTypes.arrayOf(PropTypes.string),
};

/** ─── LIST OF EVENTS ────────────────────────────────────────────────────────── */
function EventList({ events }) {
    if (!events.length) {
        return <Typography color="text.secondary">No events for this day.</Typography>;
    }

    return (
        <List disablePadding>
            {events.map((ev) => (
                <Paper key={ev.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">{ev.event_name}</Typography>
                    <Typography variant="body2" paragraph>
                        {ev.event_description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {ev.class_type}
                    </Typography>
                </Paper>
            ))}
        </List>
    );
}
EventList.propTypes = {
    events: PropTypes.array.isRequired,
};

/** ─── MAIN SYLLABUS COMPONENT ───────────────────────────────────────────────── */
export default function Syllabus({ courseid, daysOff }) {
    const { syllabus, events } = useSyllabusEvents(courseid);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // build a map of YYYY-MM-DD → [events]
    const eventsByDate = React.useMemo(() => {
        return events.reduce((acc, ev) => {
            const key = dayjs(ev.event_date).format("YYYY-MM-DD");
            acc[key] = acc[key] || [];
            acc[key].push(ev);
            return acc;
        }, {});
    }, [events]);

    const highlightedDates = Object.keys(eventsByDate);

    // choose today (clamped to the syllabus range) once data loads
    useEffect(() => {
        if (syllabus) {
            const today = dayjs();
            const start = dayjs(syllabus.start_date);
            const end = dayjs(syllabus.end_date);
            const clamped =
                today.isBefore(start) ? start :
                    today.isAfter(end) ? end :
                        today;
            setSelectedDate(clamped);
        }
    }, [syllabus]);

    if (!syllabus) {
        return <Typography>Loading syllabus…</Typography>;
    }

    const selectedKey = selectedDate.format("YYYY-MM-DD");
    const todaysEvents = eventsByDate[selectedKey] || [];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                {syllabus.course_name} — Schedule
            </Typography>

            <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
                {/* calendar with highlighted event days */}
                <HighlightedCalendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minDate={dayjs().startOf("day")}
                    maxDate={dayjs(syllabus.end_date)}
                    highlightedDates={highlightedDates}
                />
            </Paper>

            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Events on {selectedDate.format("dddd, MMMM D, YYYY")}
                </Typography>
                <EventList events={todaysEvents} />
            </Box>

            <Box pt={6}>
                <SyllabusGantt
                    courseid={courseid}
                    events={events}
                    daysOff={daysOff}
                    prop1={(ev) => formatEvent(syllabus, ev, makeid(ev.event_name))}
                    url={BASE_URL}
                />
            </Box>
        </Container>
    );
}

Syllabus.propTypes = {
    courseid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    daysOff: PropTypes.array,
};
