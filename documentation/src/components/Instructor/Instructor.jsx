import React from 'react';
import OfficeHours from "../OfficeHours/OfficeHours";
import Figure from "../Figure";
import DontPanic from "../../../static/img/dont-panic.svg";
import Admonition from "@theme/Admonition";

function CourseSections() {
    return <>
        <h2>Sections</h2>
        <ul>
            <li>
                <strong>Section 001:</strong>
                <ul>
                    <li>Lecture: MF 9:30 am - 10:50 am</li>
                    <li>Laboratory: W 10:00 am - 10:50 am</li>
                    <li>Location: SERC 214</li>
                </ul>
            </li>
            <li>
                <strong>Section 002:</strong>
                <ul>
                    <li>Lecture: MF 2:00 pm - 3:20 pm</li>
                    <li>Laboratory: W 2:00 pm - 2:50 pm</li>
                    <li>Location: SERC 214</li>
                </ul>
            </li>
        </ul>
        <Admonition type={"note"}>{<>The only difference between lab in lecture is the <b>amount of time</b>. All course sessions will be considered <b>synchronous</b> working sessions.</>}</Admonition>
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
                        src="https://s.gravatar.com/avatar/d7050d71af151b8db6f046e33e9e8e2e?s=300"
                        alt="Picture of Professor Ian Tyler Applebaum"
                    />
                    <p><b>Professor Ian Tyler Applebaum</b></p>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
               <li>📧 Email: <a href={"mailto:ian.tyler@temple.edu"}>ian.tyler@temple.edu</a></li>
               {/*<li>💬 Discord: Applebaumian#2888</li>*/}
               <li>🏢 Office: SERC 325</li>
            </ul>
                </div>

                {/* Second Column */}
                <div className="col col--4">
                    <CourseSections/>
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
