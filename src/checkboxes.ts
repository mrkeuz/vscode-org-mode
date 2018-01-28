import * as vscode from 'vscode';
import {Range} from 'vscode';
import * as Util from './utils';

const checkboxRe = /(\[[xX ]])\s?/g;

export function toggle(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const document = Util.getActiveTextEditorEdit();
    const cursorPos = Util.getCursorPosition();
    const curLine = Util.getLine(document, cursorPos);
    const checkboxPos = checkboxPosition(curLine);

    if (isCursorOnCheckbox()) {
        if (isCheckBoxDisabled()) {
            switchTo("X");
        } else {
            switchTo(" ");
        }
    }

    function isCursorOnCheckbox() {
        const checkboxLen = 3;
        return checkboxPos != -1 &&
            cursorPos.character >= checkboxPos &&
            cursorPos.character <= checkboxPos + checkboxLen;
    }

    function isCheckBoxDisabled() {
        return curLine.charAt(checkboxPos + 1) === " ";
    }

    function switchTo(value: string) {
        edit.replace(
            new Range(cursorPos.line, checkboxPos + 1, cursorPos.line, checkboxPos + 2),
            value)
    }
}

function checkboxPosition(line: string) {
    return line.search(checkboxRe);
}

