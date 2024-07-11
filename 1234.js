"use strict";
var fs = require("fs-extra");
var path = require("path");
var ascFilePath = path.resolve('$(__dirname)', '../data.asc');
var SendDirection;
(function (SendDirection) {
    SendDirection[SendDirection["Rx"] = 0] = "Rx";
    SendDirection[SendDirection["Tx"] = 1] = "Tx";
})(SendDirection || (SendDirection = {}));
;
var CanFram = /** @class */ (function () {
    function CanFram() {
        this.absoluteTime = 0;
        this.canId = 0;
        this.direction = SendDirection.Rx;
        this.length = 0;
        this.data = [];
    }
    return CanFram;
}());
function parseCanFram(content) {
    var values = content.split(' ');
    var canFram = new CanFram();
    canFram.absoluteTime = Number(values[0]);
    canFram.canId = values[2];
    canFram.direction = SendDirection[values[3]];
    canFram.length = Number(values[5]);
    var data = new Array(canFram.length);
    for (var index = 0; index < data.length; index++) {
        data[index] = values[index + 6];
    }
    canFram.data = data;
    return canFram;
}

function readContent() {
    var filePath = ascFilePath;
    var data = fs.readFileSync(filePath, "utf8");
    var allLines = data.split("\n");
    var canFrams = new Array(allLines.length - 2);
    for (var index = 0; index < allLines.length - 2; index++) {
        var canFram = parseCanFram(allLines[index]);
        canFrams[index - 3] = canFram;
    }
    var canid345 = [];
    canFrams.forEach(function(element){
        if(element.canId === '345'){
            canid345.push({"time": element.absoluteTime, "value": parseInt(element.data[7].substring(1,2), 16)});
        }
    });
    return canid345;
}
module.exports = {readContent}
