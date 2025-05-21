import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import {
    Container,
    Box,
    Grid,
    Paper,
    Typography,
    List,
    Divider,
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
const API_KEY = "0tkdWiE5SUuT8D9G5qQrFzdAmwluyLnZLgMn25xf";
const BASE_URL = "https://courses.ianapplebaum.com";

const HIGHLIGHT_COLOR = {
    bg: (theme) => theme.palette.error.dark,
    hover: (theme) => theme.palette.error.light,
    text: (theme) => theme.palette.secondary.contrastText,
};

/** ─── HOOK: fetch syllabus + events ───────────────────────────────────────── */
function useSyllabusEvents(courseId) {
    const [data, setData] = useState({ syllabus: null, events: [] });

    useEffect(() => {
        if (!data.syllabus) {
            fetch(`${BASE_URL}/api/syllabus/${courseId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            })
                .then((res) => res.json())
                .then(({ syllabus, events }) => setData({ syllabus, events }))
                .catch(console.error);
        }
    }, [courseId, data.syllabus]);

    return data;
}

/** ─── STYLED DAY CELL ───────────────────────────────────────────────────────── */
const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "hasEvent" && prop !== "isOff",
})(({ theme, hasEvent, isOff }) => ({
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
    ...(isOff && {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.text.disabled,
        pointerEvents: "none",
        "&:hover": {
            backgroundColor: theme.palette.action.disabledBackground,
        },
    }),
}));

function EventDay({ day, highlightedDates, daysOff, outsideCurrentMonth, ...other }) {
    const iso = day.format("YYYY-MM-DD");
    const hasEvent = !outsideCurrentMonth && highlightedDates.includes(iso);
    const isOff = !outsideCurrentMonth && daysOff.includes(iso);

    return (
        <CustomPickersDay
            {...other}
            day={day}
            hasEvent={hasEvent}
            isOff={isOff}
            disabled={isOff}
            outsideCurrentMonth={outsideCurrentMonth}
        />
    );
}
EventDay.propTypes = {
    day: PropTypes.object.isRequired,
    highlightedDates: PropTypes.arrayOf(PropTypes.string),
    daysOff: PropTypes.arrayOf(PropTypes.string),
    outsideCurrentMonth: PropTypes.bool,
};

/** ─── CALENDAR COMPONENT ───────────────────────────────────────────────────── */
function HighlightedCalendar({ value, onChange, minDate, maxDate, highlightedDates, daysOff }) {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={(d) => daysOff.includes(d.format("YYYY-MM-DD"))}
            slots={{ day: EventDay }}
            slotProps={{ day: { highlightedDates, daysOff } }}
        />
    );
}
HighlightedCalendar.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    highlightedDates: PropTypes.arrayOf(PropTypes.string),
    daysOff: PropTypes.arrayOf(PropTypes.string),
};

/** ─── LIST OF EVENTS FOR A SINGLE DAY ───────────────────────────────────────── */
function EventList({ events }) {
    if (!events.length) {
        return <Typography color="text.secondary">No events for this day.</Typography>;
    }
    return (
        <List disablePadding>
            {events.map((ev) => (
                <Paper key={ev.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                        {ev.class_type} – {ev.event_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ev.event_description}
                    </Typography>
                </Paper>
            ))}
        </List>
    );
}
EventList.propTypes = {
    events: PropTypes.array.isRequired,
};

/** ─── LIST OF ALL EVENTS BY DATE ────────────────────────────────────────────── */
function AllEventsByDate({ eventsByDate }) {
    const sortedDates = Object.keys(eventsByDate).sort();
    return (
        <Box>
            {sortedDates.map((date) => (
                <Box key={date} mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                        {dayjs(date).format("dddd, MMMM D, YYYY")}
                    </Typography>
                    {eventsByDate[date].map((ev) => (
                        <Box key={ev.id} pl={2} mb={1}>
                            <Typography variant="body1">
                                {ev.class_type} – {ev.event_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {ev.event_description}
                            </Typography>
                        </Box>
                    ))}
                    <Divider sx={{ mt: 2 }} />
                </Box>
            ))}
        </Box>
    );
}
AllEventsByDate.propTypes = {
    eventsByDate: PropTypes.object.isRequired,
};

/** ─── MAIN SYLLABUS COMPONENT ───────────────────────────────────────────────── */
export default function Syllabus({ courseid, daysOff }) {
    const { syllabus, events } = useSyllabusEvents(courseid);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // map YYYY-MM-DD → [events]
    const eventsByDate = React.useMemo(() => {
        return events.reduce((acc, ev) => {
            const key = dayjs(ev.event_date).format("YYYY-MM-DD");
            acc[key] = acc[key] || [];
            acc[key].push(ev);
            return acc;
        }, {});
    }, [events]);

    const highlightedDates = Object.keys(eventsByDate);

    // clamp initial selected date
    useEffect(() => {
        if (!syllabus) return;
        const today = dayjs();
        const start = dayjs(syllabus.start_date);
        const end = dayjs(syllabus.end_date);
        const clamped =
            today.isBefore(start) ? start :
                today.isAfter(end) ? end :
                    today;
        setSelectedDate(clamped);
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

            <Grid container spacing={4}>
                {/* Calendar + Today's events */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <HighlightedCalendar
                            value={selectedDate}
                            onChange={setSelectedDate}
                            minDate={dayjs().startOf("day")}
                            maxDate={dayjs(syllabus.end_date)}
                            highlightedDates={highlightedDates}
                            daysOff={daysOff}
                        />
                    </Paper>

                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Events on {selectedDate.format("dddd, MMMM D, YYYY")}
                        </Typography>
                        <EventList events={todaysEvents} />
                    </Box>
                </Grid>

                {/* Scrollable All Events list */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            maxHeight: 600,
                            overflowY: "auto",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            All Events
                        </Typography>
                        <AllEventsByDate eventsByDate={eventsByDate} />
                    </Paper>
                </Grid>
            </Grid>

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
    daysOff: PropTypes.arrayOf(PropTypes.string),
};
