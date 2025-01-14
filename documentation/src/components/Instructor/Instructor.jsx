import React from 'react';
import OfficeHours from "../OfficeHours/OfficeHours";
import Figure from "../Figure";
import DontPanic from "../../../static/img/dont-panic.svg";

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
                    <h2>Sections</h2>
                    <ul>
                        <li>
                            <strong>Section 001:</strong> Lab: Mon & Fri 9:30-10:50 AM,
                            Lecture: Wed 9:00-9:50 AM
                        </li>
                        <li>
                            <strong>Section 002:</strong> Lab: Mon & Fri 12:30-1:50 PM,
                            Lecture: Wed 1:00-1:50 PM
                        </li>
                        <li>
                            <strong>Section 003:</strong> Lab: Mon & Fri 3:30-4:50 PM,
                            Lecture: Wed 4:00-4:50 PM
                        </li>
                    </ul>
                    <OfficeHours />
                </div>

                {/* Third Column */}
                <div className="col col--4">
                    <Figure caption={"Class Motto:"} subcaption={"Don't Panic, but expect the unexpected."}>
                        <DontPanic style={{ width: "100%", height: 300 }} alt={"The words \"Don't panic\", written in large red friendly letters."} />
                    </Figure>
                </div>
            </div>
        </div>
    );
}
