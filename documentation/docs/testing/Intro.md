# Test Procedures

## Purpose

The Test Procedures describe the test approach and the tests to be performed to verify the requirements specified in the Requirements Document.

## Requirements

In addition to the general documentation requirements this document will contain the procedures for the following tests:

- Unit tests
    - For each method, one or more test cases.
    - A test case consists of input parameter values and expected results. All external classes should be stubbed using mock objects.

- Integration tests
    - Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

- Acceptance test
    - Demonstration of all of the functional and non-functional requirements. This can be a combination of automated tests derived from the use-cases (user stories) and manual tests with recorded observation of the results.
