---
sidebar_position: 1
description: What should be in this section.
---

Design Document - Part II API
=============================

## Purpose

This Design Document gives the complete design of the software implementation. This information should be in structured comments (e.g. Javadoc) in the source files. We encourage the use of a documentation generation tool to generate a draft of your API that you can augment to include the following details.

## Requirements

In addition to the general documentation requirements the Design Document - Part II API will contain:

General review of the software architecture for each module specified in Design Document - Part I Architecture. Please include your class diagram as an important reference.

**For each class define the data fields, methods.**

The purpose of the class.

The purpose of each data field.

The purpose of each method

Pre-conditions if any.

Post-conditions if any.

Parameters and data types

Return value and output variables

Exceptions thrown\* (PLEASE see note below for details).

## Previous Class Examples

An example of an auto-generated API specification is here ([Patreon Shout API Specification](https://capstone-projects-2022-fall.github.io/project-patreon-shout/docs/api-specification/api-documentation "Patreon Shout API Specification") )

This group developed their API documentation by hand ([Collaby Bot API Specificication](https://capstone-projects-2022-fall.github.io/project-collabybot/docs/api-specification/class-doc "Collaby Bot API Specification") and [Attendance Face Recognition REST API](https://capstone-projects-2022-fall.github.io/project-attendance-face-recognition/docs/api-specification/AFR_API))


:::note 
\*At the top level, or where appropriate, all exceptions should be caught and an error message that is meaningful to the user generated. It is not OK to say ("xxxx has encountered a problem and will now close `OK`"). Error messages and recovery procedures should be documented in the README/User’s Manual.
:::