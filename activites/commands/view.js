let fs = require('fs');
let path = require('path');
let handelError = require("../tpp/utilites/handelError");

module.exports = function () {
    switch (arguments[1]) {
        case '-l':
            viewAsList(arguments[0]);
            break;
        case '-t':
            viewAsTree(arguments[0], "");
            break;
        case '-h':
            viewHistry(arguments[0]);
            break; 
        default:
            console.log(arguments[1]);
            handelError.displayInvaidArgument();
            break;
    }
}

function viewAsList(rpath){
    let stat = fs.lstatSync(rpath);
    if(stat.isDirectory()) {
        console.log(rpath);
        let children = fs.readdirSync(rpath);
        for(let x = 0; x < children.length; x++) {
            viewAsList(path.join(rpath, children[x]));
        }
    }
    else {
        console.log(rpath + "*");
        return;
    }
}

function viewAsTree(rpath, intent) {
    let stat = fs.lstatSync(rpath);
    if (!stat.isDirectory()) {
        console.log(intent + path.basename(rpath) + "*");
        return;
    } 
    else {
        console.log(intent + path.basename(rpath));
        let children = fs.readdirSync(rpath);
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(rpath, children[i]);
            viewAsTree(cpath, intent + "---");
        }
    }
}

function viewHistry() {
    console.log(`view ${src}'s histry`);
}