import * as vscode from "vscode";
import { GitExtension, API, Repository, APIState } from "./@types/git";

export function activate(context: vscode.ExtensionContext) {
  console.log("Activated Commit AI extension.");

  let disposable = vscode.commands.registerCommand(
    "commit-ai.helloWorld",
    () => {
      let gitExtension = vscode.extensions.getExtension("vscode.git");

      if (!gitExtension) {
        vscode.window.showErrorMessage("Git extension not found");
        return;
      }

      const git = gitExtension.exports.getAPI(1) as API;
      let selected = git?.repositories.find((repo) => repo.ui.selected);

      if (!selected) {
        selected = git?.repositories[0];
      }
      if (!selected) {
        vscode.window.showErrorMessage("No Git repository found");
        return;
      }

      if (selected.rootUri.scheme !== "file") {
        vscode.window.showErrorMessage(
          "Only local repositories are supported (scheme != file)"
        );
        return;
      }

      selected.inputBox.value = "Hello World from Commit AI!!!";

      vscode.window.showInformationMessage("Hello World from Commit AI!!!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
