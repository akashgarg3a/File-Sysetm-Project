let fs = require("fs");
let path = require("path");
module.exports = function () {
    treefy(arguments[0], arguments[1], JSON.parse(fs.readFileSync(path.join(arguments[0],"metadata.json"))));
}

function treefy(spath, dpath, obj) {
    if(obj.isFile == true) {
        // create file
        let rs = fs.createReadStream(path.join(spath, obj.newname));
        let ws = fs.createWriteStream(path.join(dpath, obj.name));
        rs.pipe(ws);
    }
    else {
        // create document and call
        let fileadd = path.join(dpath, obj.name);
        fs.mkdirSync(fileadd);
        for(let x  = 0; x < obj.child.length; x++) {
            treefy(spath, fileadd, obj.child[x]);
        }
    }
}

