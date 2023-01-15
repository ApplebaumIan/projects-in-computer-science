# Software Development Plan   
## Purpose  
The Software Development Plan describes the activities and tasks to be performed to develop the 
software product.  
 
## Requirements 

In addition to the general requirements the Software Development Plan will contain the 
following sections:  

-   Activities - requirements gathering, top-level design, detailed design, test. 
-   Tasks - A task is the performance of an activity leading to a specific feature in a 
product. E.G. Design of unit x. Associated with each task is predecessor tasks (what 
tasks must be complete before this task can start) an estimated effort estimated 
finish data responsible individual successor tasks (what tasks cannon start until this 
task is complete)  
-   Schedule - A graphical layout of the tasks in the form of a Gantt chart. Mark the chart 
for the milestone demos and decide the features shown in each demo. 
-   Development Environment - The required hardware and software to be used to 
develop the project. This includes the selected IDE, compilers, editors, test tools, etc. 
Map the effort of hardware and software setting up as tasks as well and mark your 
chart for the completion of such tasks. 
-   Version Control - The selected version control tool and procedures for maintaining a 
defined master configuration. 

## Example Gantt Chart in MermaidJS

In our Docusaurus project you can add MermaidJS diagrams directly in markdown. Docusaurus will automatically render this markup to the desired chart.
Here is a link to MermaidJS documentation https://mermaid-js.github.io/mermaid/#/gantt.
````
```mermaid
gantt
    YOUR GANTT MARKUP
```
````

<details>

<summary>

Markdown Code for Gantt 

</summary>


````
```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Project Schedule

    section Elaboration Phase
    Completed task            :done,    des1, 2022-09-06,2022-09-11
    Active task               :active,  des2, 2022-09-12, 3d
    Future task               :         des3, after des2, 5d
    Future task 2             :         des4, after des3, 5d

    section Construction Phase
    Future task 3             :         des5, 2022-10-06, 5d
    Future task 4             :         des6, after des5, 5d
    Completed task in the critical line :crit, done, 2022-10-10,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
   Milestone Demo 1                     :milestone, 2022-10-18, 0d
   Milestone Demo 2                     :milestone, 2022-11-01, 0d
   Milestone Demo 3                     :milestone, 2022-11-15, 0d
   Final Demo                           :milestone, 2022-12-01, 0d


```
````

</details>

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Project Schedule

    section Elaboration Phase
    Completed task            :done,    des1, 2022-09-06,2022-09-11
    Active task               :active,  des2, 2022-09-12, 3d
    Future task               :         des3, after des2, 5d
    Future task 2             :         des4, after des3, 5d

    section Construction Phase
    Future task 3             :         des5, 2022-10-06, 5d
    Future task 4             :         des6, after des5, 5d
    Completed task in the critical line :crit, done, 2022-10-10,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
   Milestone Demo 1                     :milestone, 2022-10-18, 0d
   Milestone Demo 2                     :milestone, 2022-11-01, 0d
   Milestone Demo 3                     :milestone, 2022-11-15, 0d
   Final Demo                           :milestone, 2022-12-01, 0d

```

## Examples of Development Plan Documents 

<p>Example Software Development Plans are here <a class="instructure_file_link instructure_scribd_file inline_disabled" title="V2_Software Development Plan - Temple Cats (1).docx" href="https://templeu.instructure.com/courses/114202/files/19367287?wrap=1" target="_blank" rel="noopener" data-canvas-previewable="false" data-api-endpoint="https://templeu.instructure.com/api/v1/courses/114202/files/19367287" data-api-returntype="File">Best Example Plan - Temple Cats</a>, <a class="instructure_file_link instructure_scribd_file inline_disabled" title="Example SW Development Plan-Fiscal.docx" href="https://templeu.instructure.com/courses/114202/files/19367276?wrap=1" target="_blank" rel="noopener" data-canvas-previewable="false" data-api-endpoint="https://templeu.instructure.com/api/v1/courses/114202/files/19367276" data-api-returntype="File">Example SW Development Plan-Fiscal.docx</a> , <a class="instructure_file_link instructure_scribd_file inline_disabled" title="Example SW Dev Plan - DevOWLCIS.docx" href="https://templeu.instructure.com/courses/114202/files/19367249?wrap=1" target="_blank" rel="noopener" data-canvas-previewable="false" data-api-endpoint="https://templeu.instructure.com/api/v1/courses/114202/files/19367249" data-api-returntype="File">Example SW Dev Plan - DevOWLCIS.docx. </a></p>
