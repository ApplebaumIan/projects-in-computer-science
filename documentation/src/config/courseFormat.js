import docusaurusConfig from "../../.docusaurus/docusaurus.config.mjs";

export const COURSE_FORMAT = docusaurusConfig.customFields.course_format ?? "regular";

const FORMATS = {
  regular: {
    id: "regular",
    label: "Regular Semester",
    shortLabel: "17-week",
    semesterLength: "17-week semester",
    cadenceSummary:
      "This version is paced for a full-length semester. Sprint 0 is a one-week kickoff sprint, and the best rule of thumb is that the remaining sprints are two weeks long.",
    deliverySummary:
      "Students should plan around the published class meeting schedule and use those meetings for instruction, collaboration, and stakeholder-facing work.",
    weeklyRhythm: [
      "Scheduled class meetings focus on instruction, team coordination, and project work.",
      "Teams are expected to maintain momentum between meetings using Jira, GitHub, and shared documentation.",
      "Stakeholder communication and deliverable deadlines are announced within each sprint rather than tied to fixed syllabus dates.",
    ],
    sprintWindows: [
      { sprint: "Sprint 0", weeks: "Week 1", focus: "Project framing, team setup, and stakeholder onboarding" },
      { sprint: "Sprint 1", weeks: "Weeks 2-3", focus: "Requirements gathering, validation, and early design" },
      { sprint: "Sprint 2", weeks: "Weeks 4-5", focus: "Documentation completion, MVP planning, and early implementation" },
      { sprint: "Sprint 3", weeks: "Weeks 6-7", focus: "Core implementation and Milestone Demo 1" },
      { sprint: "Sprint 4", weeks: "Weeks 8-9", focus: "Feature expansion and Milestone Demo 2" },
      { sprint: "Sprint 5", weeks: "Weeks 10-11", focus: "Refinement, testing, and Milestone Demo 3" },
      { sprint: "Sprint 6", weeks: "Weeks 12-13 (sometimes shortened)", focus: "Final polish, delivery, and final presentation" },
    ],
    scheduleNote:
      "This syllabus intentionally avoids calendar dates. Exact due dates, holidays, and stakeholder meetings can shift by semester and should be announced in Canvas and class. Sprint 6 may be shortened depending on the spring or fall calendar, but the best rule of thumb is that sprints are two weeks long after Sprint 0.",
    attendanceLabel: "all scheduled class meetings",
    attendanceDetail:
      "Consistent attendance is required because project work depends on in-class coordination, stakeholder interaction, and team accountability.",
    policyDetail:
      "Attendance covers lectures, workshops, team meetings, demos, and other required class activities listed for your section.",
  },
  summer: {
    id: "summer",
    label: "Summer Semester",
    shortLabel: "12-week summer",
    semesterLength: "12-week online summer semester",
    cadenceSummary:
      "This version is paced for a condensed summer term. The goal is still to preserve realistic two-week sprints where possible, with fewer total sprints and earlier milestone demos rather than turning every sprint into a one-week cycle.",
    deliverySummary:
      "Recorded lectures support the course, but synchronous online meetings remain the main working time for teams, demos, and stakeholder interaction.",
    weeklyRhythm: [
      "Recorded lectures should be completed before the associated synchronous work session whenever possible.",
      "Synchronous online meetings are used for workshops, coordination, stakeholder meetings, demos, and active project work.",
      "Because the term is compressed, milestone demos and major deliverables appear sooner in the semester and teams should expect less slack between them.",
    ],
    sprintWindows: [
      { sprint: "Sprint 0", weeks: "Week 1", focus: "Project framing, team setup, and stakeholder onboarding" },
      { sprint: "Sprint 1", weeks: "Weeks 2-3", focus: "Requirements gathering, validation, and early design" },
      { sprint: "Sprint 2", weeks: "Weeks 4-5", focus: "Documentation completion, MVP planning, early implementation, and Milestone Demo 1" },
      { sprint: "Sprint 3", weeks: "Weeks 6-7", focus: "Core implementation and Milestone Demo 2" },
      { sprint: "Sprint 4", weeks: "Weeks 8-9", focus: "Feature expansion and Milestone Demo 3" },
      { sprint: "Sprint 5", weeks: "Weeks 10-11", focus: "Refinement, testing, final delivery preparation, and final presentation" },
    ],
    scheduleNote:
      "This syllabus intentionally avoids calendar dates for easier reuse. Exact deadlines, live meeting details, and stakeholder sessions should be announced in Canvas and class. In summer, the structure uses fewer sprints overall, but the working rule of thumb is still to preserve two-week sprints whenever possible after Sprint 0. The three milestone demos remain in place, with Milestone Demo 1 appearing earlier, typically by the end of Sprint 2.",
    attendanceLabel: "all synchronous online course meetings",
    attendanceDetail:
      "Recorded lectures do not replace live participation. Students are expected to arrive prepared for active team work, discussion, demos, and stakeholder communication.",
    policyDetail:
      "Attendance covers synchronous meetings, workshops, demos, and other required live activities for the online section.",
  },
};

export const courseFormat = FORMATS[COURSE_FORMAT] ?? FORMATS.regular;
export const isSummerCourse = courseFormat.id === "summer";
export const isOnlineCourse = courseFormat.id === "summer";
