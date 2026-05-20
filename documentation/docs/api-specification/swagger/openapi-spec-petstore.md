---
title: Locally added Spec from static/
description: API Specification from static/openapi.yml.yaml
hide_table_of_contents: true
sidebar_position: 3
sidebar_custom_props:
    icon: example
    affordanceText: "View Example Petstore API Spec"
---

import ApiDocMdx from '@theme/ApiDocMdx';
import docusaurusConfig from "../../../.docusaurus/docusaurus.config.mjs";

<>
{docusaurusConfig.customFields.is_pdf ? <></> : <ApiDocMdx id="using-petstore-yaml" />}
</>
