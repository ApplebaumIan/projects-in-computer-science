import React from 'react';
import {InlineWidget} from "react-calendly";
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";

export default function OfficeHours() {
    return (
        <div>
            <details>
                <summary className={"button button--primary button--outline "} style={{textAlign: "left", maxWidth:300}}>
                    <h3 id={"office-hours"}>Office Hours</h3>

                    <p style={{wordBreak: "break-word", whiteSpace: "normal"}}>Office hours are by appointment via Calendly, in person or on Zoom.</p>
                    <ul style={{textAlign: "left" }}>
                        <li>Monday: 3:30-5:00 PM</li>
                        <li>Wednesday: 1:00-2:00 PM</li>
                    </ul>
                </summary>
                {docusaurusConfig.customFields.is_pdf ? <></> : <InlineWidget url="https://calendly.com/ian-tyler-applebaum/office-hours" />}
                <a href="https://calendly.com/ian-tyler-applebaum/office-hours" target="_blank">
                    Schedule an Appointment
                </a>
            </details>
        </div>
    );
}
