import React from "react";
import Admonition from "@theme/Admonition";

import { courseFormat } from "../../config/courseFormat";

export default function CourseScheduleOverview() {
  return (
    <>
      <Admonition type="important" title={`${courseFormat.label} Schedule`}>
        <p>
          This syllabus is currently configured for a <strong>{courseFormat.semesterLength}</strong>.
        </p>
        <p>{courseFormat.cadenceSummary}</p>
        <p>{courseFormat.scheduleNote}</p>
      </Admonition>

      <h2>How the Semester Is Structured</h2>

      <p>{courseFormat.deliverySummary}</p>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Weeks</th>
            <th>Focus</th>
          </tr>
        </thead>
        <tbody>
          {courseFormat.sprintWindows.map((item) => (
            <tr key={item.sprint}>
              <td>{item.sprint}</td>
              <td>{item.weeks}</td>
              <td>{item.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Weekly Rhythm</h2>

      <ul>
        {courseFormat.weeklyRhythm.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
