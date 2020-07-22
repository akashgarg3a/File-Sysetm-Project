let view = require("../commands/view");
let treefy = require("../commands/treefy.js");
let untreefy = require("../commands/untreefy");
let help = require("../commands/help.js");
let moniter = require("../commands/moniter.js");
let errorHandel = require("./utilites/handelError.js");


switch (process.argv[2]) {
    case 'view':
        view(process.argv[3], process.argv[4]);
        break;
    case 'untreefy':
        untreefy(process.argv[3], process.argv[4]);
        break;
    case 'treefy':
        treefy(process.argv[3], process.argv[4]);
        break;
    case 'moniter':
        moniter(process.argv[3], process.argv[4]);
        break;
    case 'help':
        help();
        break;
    default:
        errorHandel.displayInvaidArgument();
        break;
}