---
sidebar_position: 1
description: Short overview and links for API specification guidance
---

import DocCardList from '@theme/DocCardList';

# API Specification

Your project defines contracts at two different architectural levels:

<DocCardList />


The **HTTP API Contract** defines what the system promises externally.  
The **Internal Code Contract** defines how that promise is implemented.

:::warning Assignment Requirement
You are required to **author and maintain both contracts** for your project:

1. **HTTP API Contract (OpenAPI/Swagger):** document your REST endpoints, request/response formats, error responses, and authentication.
2. **Internal Code Contract (Javadoc):** document your core classes and methods (purpose, parameters, returns, exceptions, and usage).

If your implementation changes, **your contracts must be updated**. Outdated documentation will be treated as incomplete.
:::

This section collects concise guidance and tooling recommendations for producing a high-quality OpenAPI/Swagger specification for your project and wiring it into the preinstalled Redocusaurus integration.

For generators, code-first workflows, or more advanced examples (Javadoc, OpenAPI generators), see the Best Practices page linked above.

