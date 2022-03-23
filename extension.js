//Required modules
const vscode = require('vscode');
const clipboardy = require('clipboardy');

//Set error view
const showError = message => vscode.window.showErrorMessage(`Copy filename: ${message}`);
const showWarning = message => vscode.window.setStatusBarMessage(`${message}`, 3000);

exports.activate = context => {

    //Register command
    const copyFileNameStringArray = vscode.commands.registerCommand('extension.copyFileNameStringArray', (uri, files) => {
        let accumulator = '';

        if(typeof files !== 'undefined' && files.length > 0) {
            files.forEach((el, index) => {
                //get the relative url, parse it and take the last part
                let url = vscode.workspace.asRelativePath(el.path);
                let urlFormatted = url.replace(/\\/g, '/')
                accumulator += '\"';
                accumulator += urlFormatted.split('/').pop();
                accumulator += '\"';
                accumulator += (index == files.length -1) ? '' : ',\n';
            });
        } 

        //Copy the last part to clipboard
        clipboardy.write(accumulator).then(showWarning('Filename/s has been copied to clipboard'));
    });

    context.subscriptions.push(copyFileNameStringArray);

    //Register command
    const copyFileNameStringArrayNoExtensions = vscode.commands.registerCommand('extension.copyFileNameStringArrayNoExtensions', (uri, files) => {
        let accumulator = '';

        if(typeof files !== 'undefined' && files.length > 0) {
            files.forEach((el, index) => {
                //get the relative url, parse it and take the last part
                let url = vscode.workspace.asRelativePath(el.path);
                let urlFormatted = url.replace(/\\/g, '/')
                accumulator += '\"';
                accumulator += urlFormatted.split('/').pop().replace(/\.[^\.]+$/, "");
                accumulator += '\"';
                accumulator += (index == files.length -1) ? '' : ',\n';
            });
        } 

        //Copy the last part to clipboard
        clipboardy.write(accumulator).then(showWarning('Filename/s has been copied to clipboard'));
    });

    context.subscriptions.push(copyFileNameStringArrayNoExtensions);
}

exports.deactivate = () => { };
