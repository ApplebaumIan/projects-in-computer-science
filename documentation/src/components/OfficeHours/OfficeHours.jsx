import React from 'react';
import {InlineWidget} from "react-calendly";
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";

export default function OfficeHours() {
    return (
        <div className="container">
            <h2>Office Hours</h2>
            <details>
                <summary className={"button button--primary button--outline margin--md"} >Professor Applebaum</summary>
                <p>
                    Office hours are by appointment via Calendly and can be held on Discord or
                    Zoom.
                </p>
                <ul>
                    <li>Monday: 3:30-5:00 PM</li>
                    <li>Wednesday: 1:00-2:00 PM</li>
                </ul>
                {docusaurusConfig.customFields.is_pdf ? <></> : <InlineWidget url="https://calendly.com/ian-tyler-applebaum/office-hours" />}
                <a href="https://calendly.com/ian-tyler-applebaum/office-hours" target="_blank">
                    Schedule an Appointment
                </a>
            </details>
            <details>
                <summary className={"button button--primary button--outline margin--md"}>Teaching Assistant: Thanh Nguyen</summary>
                <p>
                    Office hours are available online via Zoom and can be scheduled through
                    Calendly.
                </p>
                <a href="https://calendly.com/thanh-phuoc-nguyen/office-hours/" target="_blank">
                    Schedule an Appointment
                </a>
            </details>
        </div>
    );
}
