import React from 'react';
import OfficeHours from "../OfficeHours/OfficeHours";
import Figure from "../Figure";
import DontPanic from "../../../static/img/dont-panic.svg";
import Admonition from "@theme/Admonition";
import TeachingAssistants from "../TeachingAssistants";

function CourseSections() {
    return <>
        <h2>Sections</h2>
        <ul>
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
        </ul>
        {/*<Admonition type={"note"}>{<>The only difference between lab in lecture is the <b>amount of time</b>. All course sessions will be considered <b>synchronous</b> working sessions.</>}</Admonition>*/}
    </>;
}

export default function Instructor() {
    return (
            <div className="row">
                {/* First Column */}
                <div className="col col--4">
                    <h2>Instructor</h2>
                    <img
                        id="professor-applebaum"
                        className="masked"
                        src="https://s.gravatar.com/avatar/d7050d71af151b8db6f046e33e9e8e2e?s=500"
                        alt="Picture of Professor Ian Tyler Applebaum"
                        width={"300px"}
                    />
                    <p><b>Professor Ian Tyler Applebaum</b></p>
                    <ul className="instructor-contact-list">
                        <li>📧 Email: <a href={"mailto:ian.tyler@temple.edu"}>ian.tyler@temple.edu</a></li>
                        {/*<li>💬 Discord: Applebaumian#2888</li>*/}
                        <li>🏢 Office: SERC 325</li>
                    </ul>
                    <OfficeHours/>
                </div>

                {/* Second Column */}
                <div className="col col--4">
                    <CourseSections/>
                    <TeachingAssistants/>
                </div>

                {/* Third Column */}
                <div className="col col--4">
                    <Figure caption={"Class Motto:"} subcaption={"Don't Panic, but expect the unexpected."}>
                        <DontPanic style={{width: "100%", height: 300}}
                                   alt={"The words \"Don't panic\", written in large red friendly letters."}/>
                    </Figure>
                </div>
        </div>
    );
}
