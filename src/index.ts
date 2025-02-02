import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
  const token = getInput("gh-token");
  const label = getInput("label");

  const octokit = getOctokit(token);

  if (!token) throw new Error("GitHub token is required");
  if (!label) throw new Error("Label is required");

  const pullRequest = context.payload.pull_request;
  const issue = context.payload.issue;

  try {
    if (pullRequest) {
      await octokit.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,

        issue_number: pullRequest.number,
        labels: [label],
      });
    }
    else if (issue) {
      await octokit.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        labels: [label]
      });
    }
    else {
      throw new Error("This action can only be run on Pull Requests or Issues");
    }
  } catch (error) {
    setFailed((error as Error)?.message ?? "Unknown error");
  }
}

// do not execute run() if action has been run by jest
if (!process.env.JEST_WORKER_ID) {
  run();
}

export { run };
