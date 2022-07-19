# GDD-webapp

![main workflow](https://github.com/theaiscope/GDD-webapp/actions/workflows/push-to-main.yaml/badge.svg)

The purpose of the Global Disease Database (GDD) Webapp is to provide an interface for scientists to validate images of diseases in the GDD so that the images can be used to train AI models more effectively.

The app provides users with an interface where they are presented with an image. They then can take one of the following actions:
- `CONFIRM` - if the user believes the image should be used as part of the GDD
- `SKIP` - if the user is unsure whether the image should be in the GDD
- Mark as `INVALID` - if the user believes the image should not be used in the GDD

Every time a user `CONFIRMS` an image is credible they also add labelling for any disease that is present. It is this labelling that will be used for training the AI model. Every image will be confirmed by 4 different labellers. Once 4 labellers have confirmed the image, the data will be stored for the AI model. 

If three users mark an image as `INVALID`, this image won't be displayed to any new labeller. 

## Architecture

The app is a React application (using create-react-app and typescript). It uses the firebase client to authenticate users and to fetch and store images and their associated data.

The app is hosted on firebase and can be found at `https://aiscope-labeling-app.web.app/`

### Running the app locally

You must have node and yarn installed.

It is recommended to use the [Node Version Manager](https://github.com/creationix/nvm) to manage your node installations and to use the version of node that is specified in the [.nvmrc](/.nvmrc) file.

To run the app locally: 
1. Install all dependencies.
```shell
yarn install
```
2. Start the application.
```shell
yarn start
```
3. Go to `localhost:3000` in the browser.

### Testing, formatting and linting

To run the tests:
```shell
yarn test
```
> Setup and start the [Firebase Emulator](https://github.com/firebase/firebase-tools#deployment-and-local-emulation), uses [Jest](https://jestjs.io/) as the test runner and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for interacting with the DOM

To run linting:
```shell
yanr lint # uses https://eslint.org/
```

To auto format use prettier:
```shell
yanr prettier # uses https://prettier.io/
```

The project uses husky to run tests and lint before committing

### Deploying

The app is currently deployed in test environment, on every push in main branch. 
Github actions is used to run automated tests and if they are successful a new version of the application is deployed using the firebase cli.

When a new tag is generated, it is published on production environment. 

## Contributing Guidelines

Contributions should be made by creating a new branch from `main` branch, and then make a PR against `main`. 
Maintainers of the project can then review and merge these PRs.

All PRs should aim to have good unit test coverage and all tests must be passing before a PR can be merged.