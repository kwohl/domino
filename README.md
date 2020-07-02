# Domino
  Domino is a To-Do list manager that allows users to categorize tasks and break them into small, easy-to-manage steps. 

## Table of Contents
  * [Features List](#features-list)
  * [Technologies Used](#technologies-used)
  * [Installing and Launching Domino](#instructions-for-installing-domino)
  * [Planning Documentation](#planning-documentation)
    * [Entity Relationship Diagram](#entity-relationship-diagram)

## Features List

### Create, Update, and Delete Tasks
  Tasks can be added to any available to-do list, and users have the option to include notes or a task description as well. Newly added task will auto-populate in the "To Do" column of the appropriate list view.
  
  Tasks that are not yet completed can be edited. Users can update the task name and description, and they can also move tasks to different to-do lists.
  
  Tasks can be deleted upon confirmation from the user. Any associated steps will also be deleted unless they are connected to more than one task.

<!-- ![Add a Task](/src/media/addTask.JPG) -->

### Create, Update, and Delete Steps
  By clicking an 'Add' affordance on an individual task card, users can add steps to tasks. Steps also have an optional description field.
  
  Users can click an 'Edit' affordance next to any incomplete step to edit the name and description of that step. They also have the option to connect the step to another task.
  
  Steps can be deleted upon confirmation from the user.

<!--  ![Add a Step](/src/media/addStep.JPG)  -->
### Connect Steps to Multiple Tasks
  If a user would like a step to be associated with more than one task, they can connect that step to another task by clicking an 'Edit' affordance next to the step. This enables users to see progress being made in multiple tasks simultaneously. 

<!-- ![Connect a Step](/src/media/stepEdit.JPG)  -->
<!-- ![Connect a Step](/src/media/stepConnect.png)  -->
### Mark Tasks and Steps Complete
  Tasks and steps can be marked complete. 
  
  When a task is marked complete, this triggers the task to move from the "To Do" column to the "Complete" column, and the user will see a visible check mark indicating the task is complete. Any steps connected to the task that are still incomplete will also be marked complete, and the progress bar at the bottom of the task card will jump to full completion. 
  
  When a step is marked complete, the user will see a visible check mark indicating the step is complete, and the progress bar at the bottom of the task card will update.
  
  Users also have the ability to 'un-complete' any task or step by clicking the checked box to the left of the task/step name.

![Complete Steps and Tasks](/src/media/List.JPG)

### Easily View Progress
  At the bottom of each task card that contains steps is a progress bar with a ratio indicating how many steps are complete out of the total number of steps in that task.
  
### Update Color Settings
  Users currently have the option to toggle between four different color schemes while logged in. In version 2, 'Settings' will be added as a new endpoint in the Domino API, and users will be able to save settings through multiple sessions. 

<!-- ![Settings](/src/media/settings.JPG)  -->
## Technologies Used
  ### Front End
    React.js
    JavaScript
    HTML
    CSS
    Semantic UI React
  
  ### Back End
    Python
    Django

  ### Illustration
    [Undraw.co](https://undraw.co/)

## Instructions for Installing Domino
  Before installing Domino, please visit the [Domino API](https://github.com/kwohl/domino-api) repo, and follow the instructions in the README to install and run Domino's Django REST API

  ----------------

  Clone this repo on your personal machine using the following command in your terminal
  ```sh
    git clone git@github.com:kwohl/domino.git
  ```

  Install the NPM dependencies for this project using the following commands
  ```sh
    cd domino
    npm install
    npm install react-router-dom
    npm install semantic-ui-react
  ```
 
  After installing dependencies, type
  ```sh
    npm start
  ```

  Now that the server is up and running, you can open an internet browser and access the application
  ```sh
    http://localhost:3000/
  ```

## Planning Documentation

### Entity Relationship Diagram
![Domino ERD](/Domino.png)

  

  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

