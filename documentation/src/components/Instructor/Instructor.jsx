import React from 'react';
import OfficeHours from "../OfficeHours/OfficeHours";
import Figure from "../Figure";
import DontPanic from "../../../static/img/dont-panic.svg";
import Admonition from "@theme/Admonition";
import TeachingAssistants from "../TeachingAssistants";
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";
import { isSummerCourse } from "../../config/courseFormat";

function CourseSections() {
    function springSemester() {
        return <ul>
            <li>
                <strong>Section 001:</strong>
                <ul>
                    <li>Lecture: W 9:00 am - 9:50 am</li>
                    <li>Laboratory: MF 9:30 am - 10:50 am</li>
                    <li>Location: Science Ed and Research Ctr 00214 (SERC 214)</li>
                </ul>
            </li>
            <li>
                <strong>Section 002:</strong>
                <ul>
                    <li>Lecture: W 1:00 pm - 1:50 pm</li>
                    <li>Laboratory: MF 12:30 pm - 1:50 pm</li>
                    <li>Location: Science Ed and Research Ctr 00214 (SERC 214)</li>
                </ul>
            </li>
            <li>
                <strong>Section 003:</strong>
                <ul>
                    <li>Lecture: W 4:00 pm - 4:50 pm</li>
                    <li>Laboratory: MF 3:30 pm - 4:50 pm</li>
                    <li>Location: Science Ed and Research Ctr 00214 (SERC 214)</li>
                </ul>
            </li>
        </ul>;
    }function summerSemester() {
        return <ul>
            <li>
                <strong>Section 701:</strong>
                <ul>
                    <li>Laboratory: W 10:30 am - 11:30 am</li>
                    <li>Lecture: TR 10:30 am - 12:00 pm</li>
                    <li>Location: Zoom link provided on Canvas</li>
                </ul>
            </li>
        </ul>;
    }

    return <>
        <h2>Sections</h2>
        {isSummerCourse ? summerSemester() : springSemester()}
        <Admonition type={"note"}>{<>The only difference between lab in lecture is the <b>amount of time</b>. All course
            sessions will be considered <b>synchronous</b> working sessions.</>}</Admonition>
    </>;
}

export default function Instructor() {
    const coInstructor = docusaurusConfig.customFields.co_instructor;
    const instructors = [
        {
            id: "professor-applebaum",
            name: "Ian Tyler Applebaum",
            email: "ian.tyler@temple.edu",
            course: "CIS 4398",
            office: "SERC 325",
            image: "https://s.gravatar.com/avatar/d7050d71af151b8db6f046e33e9e8e2e?s=500",
            includeOfficeHours: true,
        },
        ...(coInstructor ? [{
            id: "professor-rosen",
            name: coInstructor.name,
            email: coInstructor.email,
            course: coInstructor.course,
            office: coInstructor.office,
            image: coInstructor.image,
            includeOfficeHours: false,
        }] : []),
    ];

    return (
        <div className="row">
            <div className="col col--4">
                <h2>{coInstructor ? "Instructors" : "Instructor"}</h2>
                <div className={`row ${coInstructor ? "instructor-grid" : ""}`}>
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className={coInstructor ? "col col--6 instructor-grid__item" : "col col--12"}
                        >
                            <img
                                id={instructor.id}
                                className="masked instructor-portrait"
                                src={instructor.image}
                                alt={`Picture of Professor ${instructor.name}`}
                            />
                            <p><b>Professor {instructor.name}</b></p>
                            <ul className="instructor-contact-list">
                                <li>📧 Email: <a href={`mailto:${instructor.email}`}>{instructor.email}</a></li>
                                <li>📚 Course: {instructor.course}</li>
                                <li>🏢 Office: {instructor.office}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col col--4">
                <CourseSections/>
            </div>

            <div className="col col--4">
                <Figure caption={"Class Motto:"} subcaption={"Don't Panic, but expect the unexpected."}>
                    <DontPanic style={{width: "100%", height: 300}}
                               alt={"The words \"Don't panic\", written in large red friendly letters."}/>
                </Figure>
                <div style={{marginTop: "2rem"}}>
                    <OfficeHours/>
                </div>
            </div>
        </div>
    );
}
