---
sidebar_position: 2
title: 'Content of the Design Document'
---
# System Architechture
## Get the template
To get started, in your `documentation` directory run the following command to add the system architecture template to your project:

```shell
yarn docs:add architecture
```

## Purpose

The Design Document - Part I Architecture describes the software architecture and how the requirements are mapped into the design. This document will be a combination of diagrams and text that describes what the diagrams are showing.

:::important Design is all about trade-offs
The design of a system is all about trade-offs. There are many ways to implement a system, and each way has its own advantages and disadvantages. The design document should describe the trade-offs that were made in the design of the system. It should also describe the alternatives that were considered and why they were not chosen. The design document should also describe the risks associated with the design and how they are mitigated. 
:::

## Requirements

- A description the different components and their interfaces. For example: client, server, database.
- For each component provide class diagrams showing the classes to be developed (or used) and their relationship.
- Sequence diagrams showing the data flow for _**all**_ use cases. One sequence diagram corresponds to one use case and different use cases should have different corresponding sequence diagrams.
- Describe algorithms employed in your project, e.g. neural network paradigm, training and training data set, etc.

If there is a database:
- Entity-relation diagram.
- Table design.

:::tip Use Mermaid for diagrams
Mermaid is a simple markdown-like script language for generating charts from text via javascript. It is a great way to create diagrams in markdown files.

Your Docusaurus already supports the mermaid codefence directive:
````
```mermaid
classDiagram
...
```
````

You can use Mermaid to create class diagrams, sequence diagrams, and other types of diagrams. For more information on how to use Mermaid, see the [Mermaid documentation](https://mermaid-js.github.io/mermaid/#/).
:::
:::note 
A checklist for the design document is provided in the [System Architecture Checklist](checklist.md) document. It is recommended that you use this checklist to ensure that your design document is complete and meets the requirements.
:::
