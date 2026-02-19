---
title: Swagger / OpenAPI Best Practices
sidebar_position: 1
sidebar_custom_props:
  icon: best-practice
  affordanceText: "Explore Best Practices"
---

# Swagger / OpenAPI Best Practices

This short guide covers the essentials for authoring maintainable, accurate OpenAPI (Swagger) specifications and recommended tooling.

What belongs in a spec

- API info: title, version, description, contact/license.
- Servers: where the API is hosted; prefer environment-specific server entries.
- Tags and operation summaries: concise summaries and tags for grouping.
- Schemas: use components/schemas for request/response bodies; prefer $ref reuse.
- Parameters: define reusable parameter objects when appropriate.
- Security schemes: declare auth methods in components/securitySchemes.
- Examples: add representative examples for request bodies and responses.

Authoring workflow (recommended)

1. Start design-first: draft the OpenAPI YAML in a dedicated repo directory or local editor.
2. Keep it in source control next to the project (or in `static/` under the site repo if the spec is only for docs).
3. Validate with an OpenAPI linter (example: Spectral) as part of CI to catch structural issues and enforce style.
4. Use code generators or server/client SDKs if you want contract-driven code generation.

Tools and linters

- Spectral (stoplight) — rulesets for style and correctness.
- openapi-generator — generate clients/servers/stubs.
- Redoc / Redocusaurus — render OpenAPI as API docs inside the site.
- Swagger Editor / Swagger UI — browser-based editing and preview.

CI recommendations

- Add linting step that runs Spectral and fails the build on errors.
- Optionally validate with the OpenAPI schema (ajv or other validators).

Example locations in this repo

- A full example spec is at `static/openapi.yml.yaml` which powers the demos in this site.
- For your project, add `static/api/your-api.yml` and update the Redocusaurus plugin to point to it (tutorial linked from the overview).

Further reading

- OpenAPI Specification: https://spec.openapis.org
- Spectral docs: https://meta.stoplight.io/docs/spectral
- Redocusaurus README (in this repository) — shows how the plugin is integrated into Docusaurus.

