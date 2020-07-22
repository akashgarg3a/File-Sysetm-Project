let fs = require('fs');
let path = require('path');
let uuid = require('../tpp/node_modules/uuid');

module.exports = function () {
    let mo = {};
    untreefy(arguments[0], arguments[1], mo);
    fs.writeFileSync(path.join(arguments[1], "metadata.json"), JSON.stringify(mo));
}

function untreefy(spath, dpath, obj) {  
    let stat = fs.lstatSync(spath); // information of file
    if (!stat.isDirectory()) {
        obj.name = path.basename(spath);
        obj.isFile = true;
        obj.newname = uuid.v4();// provides unique name

        //copy the file

        let rs = fs.createReadStream(spath);
        let ws = fs.createWriteStream(path.join(dpath, obj.newname));
        rs.pipe(ws);
    }
    else {
        // name, isFile=f, children, recursion
        obj.name = path.basename(spath);
        obj.isFile = false;
        obj.child = [];

        let children = fs.readdirSync(spath);// array of names of files
        for (let i = 0; i < children.length; i++) {
            let cpath = path.join(spath, children[i]);
            let nco = {};
            untreefy(cpath, dpath, nco);
            obj.child.push(nco);
        }
    }
}

let root = {
    name: 'd10',
    isFile: false,
    children: [{
        name: 'd20',
        isFile: false,
        children: [{
            name: 'd50',
            isFile: false,
            children: []
        }, {
            name: 'd60',
            isFile: false,
            children: []
        }]
    }, {
        name: 'd30',
        isFile: false,
        children: [{
            name: 'd80',
            isFile: false,
            children: []
        }, {
            name: 'd90',
            isFile: false,
            children: []
        }, {
            name: 'f70',
            isFile: true
        }]
    }, {
        name: 'd40',
        isFile: false,
        children: [{
            name: 'f100',
            isFile: true
        }]
    }, {
        name: 'f10',
        isFile: true
    }]
}

