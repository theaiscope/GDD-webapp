# Use Cloud Functions in the backend to handle business logic and database access

- Status: accepted
- Date: 2022-08-09

Technical Story: Move the fetchImages business logic to the backend [Trello](https://trello.com/c/suGnAOV6/43-move-the-fetchimages-business-logic-to-the-backend)

## Context and Problem Statement

On GDD-webapp, we need to access data stored in the Firebase Firestore database, manipulate it and apply business logic.
At some point this started to be done directly in the Frontend through the use of the Firebase SDK, connecting directly to the Firestore.
Reference: [Pull Request](https://github.com/theaiscope/GDD-webapp/pull/9)

## Considered Options

- Continue accessing the database and having business logic in the Frontend.
- Create Cloud Functions to have this responsibility, restricting only the backend to have access to the database.

## Decision Outcome

Chosen option: "[option 2]", mainly because we need to take care of the security aspect of the application, and considering that the database and sensible business logic should not be exposed publicly.
While in the frontend, this information can be easily accessed and manipulated, for example, just by using the browser's developer tools.

## Pros and Cons of the Options

### Option 1

Data retrieval and updating is done in the frontend.

- Good, because only the costs of Cloud Firestore are incurred.
- Bad, because the database is exposed publicly. Collection names, fields, and resources can be easily viewed in the frontend source (by using the browser's developer tools for example)
- Bad, because the business logic is exposed publicly, and can be easily modified, affecting the behavior of the application.

### Option 2

Create Cloud Functions in the backend to handle business logic and database access.

- Good, because the database is not exposed publicly.
- Good, because sensible business logic is not exposed publicly, and can not be manipulated by the end user.
- Good, because it is a proven way to architect applications.
- Bad, because we potentially add more costs, by having the Cloud Functions executions.
