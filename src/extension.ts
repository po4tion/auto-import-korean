import * as vscode from "vscode";
import { provider } from "./provideCompletionItems";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.languages.registerCompletionItemProvider(
    ["javascript", "typescript"],
    provider,
    " "
  ); // Trigger completion on ' ' (space)
  context.subscriptions.push(disposable);
}

export function deactivate() {}
