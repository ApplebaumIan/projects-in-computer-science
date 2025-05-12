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
                <strong>Section 701 ONLINE via Zoom:</strong>
                <ul>
                    <li>"Lab": Tues & Thurs 10:30-12:00 PM,</li>
                    <li>"Lecture": Wed 10:30-11:30 AM</li>
                </ul>
            </li>
        </ul>
        <Admonition type={"note"}>{<>The only difference between lab in lecture is the <b>amount of time</b>. All course sessions will be considered <b>synchronous</b> working sessions.</>}</Admonition>
    </>;
}

export default function Instructor() {
    return (
        <div className="container">
            <div className="row">
                {/* First Column */}
                <div className="col col--4">
                    <h2>Instructor</h2>
                    <img
                        id="professor-applebaum"
                        className="masked"
                        src="https://s.gravatar.com/avatar/d7050d71af151b8db6f046e33e9e8e2e?s=200"
                        alt="Professor Ian Tyler Applebaum"
                    />
                    <p>Professor Ian Tyler Applebaum</p>
                    <ul>
                        <li>Email: <a href={"mailto:ian.tyler@temple.edu"}>ian.tyler@temple.edu</a></li>
                        {/*<li>Discord: Applebaumian#2888</li>*/}
                        <li>Office: SERC 325</li>
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
        </div>
    );
}
