# Labeler GitHub Action

This GitHub Action automatically adds a specified label to Pull Requests. It is designed to be flexible and future-proof for additional labeling capabilities such as issues and other GitHub events.

## Features
- Automatically label Pull Requests when they are opened.
- Configurable with any custom label.
- Designed for future expansion to support labeling issues and other GitHub events.

## Usage

### Example Workflow

Here’s how you can use this action in your GitHub repository. Create a workflow YAML file (e.g., `.github/workflows/labeler.yml`) and use the following configuration:

```yaml
name: Auto Labeler

on:
  pull_request:
    types: [opened]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Apply Label
        uses: HassanBahati/labeler-action@v1.0
        with:
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          label: "Your-Label-Here"
```

### Inputs

| Name      | Description                                            | Required | Default              |
|-----------|--------------------------------------------------------|----------|----------------------|
| `gh-token`| GitHub token to authenticate API requests. Usually, the `GITHUB_TOKEN` secret. | Yes      | N/A                  |
| `label`   | The label to be applied to the Pull Request.            | Yes      | N/A                  |

### Example Use Case

This action is useful when you want to ensure Pull Requests are labeled appropriately without manual intervention. For instance, you might want to add a `review needed` label when a new Pull Request is opened.

```yaml
uses: HassanBahati/labeler-action@v1.0
with:
  gh-token: ${{ secrets.GITHUB_TOKEN }}
  label: "review needed"
```

### Future Plans

In future versions, this action will support:
- [X] Labeling issues.
- Advanced event triggers.
- Dynamic labeling rules based on PR content, file changes, or issue type.

## Outputs

Currently, the action does not return any outputs, but this can be added in future iterations if needed.

## Authentication

The `gh-token` input uses GitHub’s `GITHUB_TOKEN`, which is automatically provided in your repository secrets. This token allows the action to authenticate API requests and apply labels to issues and pull requests.

## Error Handling

If the action is run on any event other than a Pull Request or encounters an API error, it will fail with an appropriate error message:

- If the event is not a Pull Request, the action will fail with: `This action can only be run on Pull Requests`.
- If there’s an issue with the API request, the error message returned by the GitHub API will be displayed.

## License

This project is licensed under the [MIT License](LICENSE).
 