import docusaurusConfig from "../../.docusaurus/docusaurus.config.mjs";

const { customFields = {} } = docusaurusConfig;

export const primaryCourseNumber = customFields.primary_course_number ?? "CIS 4398";
export const secondaryCourseNumber = customFields.secondary_course_number ?? "CIS 4396";
export const teachBothCourses = Boolean(customFields.teach_both_courses);
export const syllabusCourseNumber = customFields.course_number ?? primaryCourseNumber;
export const projectsCourseLabel = `${syllabusCourseNumber} Projects course`;
