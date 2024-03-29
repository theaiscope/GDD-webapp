# Notes on workflows

Currently, there are the following workflows:

- [pull-request](/.github/workflows/pull-request.yaml) (runs on PRs)
- [push-to-main](/.github/workflows/push-to-main.yaml) (runs when code is pushed to `main` or PRs are merged to `main`, and deploys in test environment)
- [deploy-to-prod](/.github/workflows/deploy-to-prod.yaml) (runs when a new tag is generated, and deploys on production environment)

The workflows reuse the [test](/.github/workflows/test.yaml) workflow, which runs the basic linting and testing.

If you want to update the test workflow you will need to create a new Github release after pushing the updated code and then point the other workflows to the new release with the `uses` field.
i.e. if you were to make a new release of v1.0.1 then the `uses` field would have to be `theaiscope/GDD-webapp/.github/workflows/test.yaml@v1.0.1`
