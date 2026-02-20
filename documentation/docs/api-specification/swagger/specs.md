---
title: Swagger / OpenAPI Best Practices
sidebar_position: 1
description: The essentials for authoring maintainable, accurate OpenAPI (Swagger) specifications and recommended tooling.
sidebar_custom_props:
  icon: best-practice
  affordanceText: "Explore Best Practices"
---

# Swagger / OpenAPI Best Practices

This page defines the minimum quality standard for your OpenAPI specification.

Your API contract will be evaluated based on the principles outlined below.

## Required Elements

A complete specification must include:
- ☑️ API metadata (title, version, description, contact/license)
- ☑️ Server definitions (with environment-specific entries)
- ☑️ Tagged operations with meaningful summaries
- ☑️ Reusable schemas in components/schemas
- ☑️ Structured error responses
- ☑️ Declared authentication in components/securitySchemes
- ☑️ Example requests and responses

## Quality Standards
- Operation summaries must describe behavior, not restate the endpoint name.
- Schemas must avoid duplication (use $ref).
- Error responses must be explicit and documented.
- Authentication requirements must match implementation.
- Field names and types must reflect actual behavior.

## Recommended Workflow
1. Start design-first: draft the OpenAPI YAML in a dedicated repo directory or local editor.
2. Keep it in source control next to the project (or in `static/` under the site repo if the spec is only for docs).
3. Validate with an OpenAPI linter (example: Spectral) as part of CI to catch structural issues and enforce style.
4. Use code generators or server/client SDKs if you want contract-driven code generation.

## Tooling (Optional but Recommended)

- Spectral (stoplight) — rulesets for style and correctness.
- openapi-generator — generate clients/servers/stubs.
- Redoc / Redocusaurus — render OpenAPI as API docs inside the site.
- Swagger Editor / Swagger UI — browser-based editing and preview.

## CI recommendations

- Add linting step that runs Spectral and fails the build on errors.
- Optionally validate with the OpenAPI schema (ajv or other validators).

## Further reading

- OpenAPI Specification: https://spec.openapis.org
- Spectral docs: https://meta.stoplight.io/docs/spectral
- Redocusaurus README (in this repository) — shows how the plugin is integrated into Docusaurus.

