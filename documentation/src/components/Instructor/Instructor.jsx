import React from 'react';
import OfficeHours from "../OfficeHours/OfficeHours";

export default function Instructor() {
    return (
        <div className="container">
            <div className="row">
                <div className="col col--4">
                    <h2>Instructor</h2>
                    <img
                        id="professor-applebaum"
                        className="masked"
                        src="https://s.gravatar.com/avatar/d7050d71af151b8db6f046e33e9e8e2e?s=200"
                        alt="Professor Ian Tyler Applebaum"
                    />
                    <p>Professor Ian Tyler Applebaum</p>
                    <p>Email: ian.tyler@temple.edu</p>
                    <p>Discord: Applebaumian#2888</p>
                    <p>Office: SERC 325</p>
                </div>

                <div className="col col--8">
                    <h2>Sections</h2>
                    <ul>
                        <li>
                            <strong>Section 001:</strong> Lecture: Mon & Fri 9:30-10:50 AM,
                            Lab: Wed 9:00-9:50 AM
                        </li>
                        <li>
                            <strong>Section 002:</strong> Lecture: Mon & Fri 12:30-1:50 PM,
                            Lab: Wed 1:00-1:50 PM
                        </li>
                        <li>
                            <strong>Section 003:</strong> Lecture: Mon & Fri 3:30-4:50 PM,
                            Lab: Wed 4:00-4:50 PM
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
