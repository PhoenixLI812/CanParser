import * as fs from 'fs-extra';
import * as path from 'path';

const ascFilePath = path.resolve('$(__dirname)', '../can_xiumian.asc');
enum SendDirection{Rx,Tx};
class CanFram{
    absoluteTime:number;
    canId:number;
    direction:SendDirection;
    length:number;
    data:string[];
    constructor(){
        this.absoluteTime = 0;
        this.canId = 0;
        this.direction = SendDirection.Rx;
        this.length = 0;
        this.data = [];
    }
}
function parseCanFram(content:string):CanFram{
    var values = content.split(' ');
    var canFram = new CanFram();
    canFram.absoluteTime = Number(values[0]);
    canFram.canId = Number(values[2]);
    canFram.direction = SendDirection[values[3] as keyof typeof SendDirection];
    canFram.length = Number(values[5]);
    var data = new Array(canFram.length);
    for (let index = 0; index < data.length; index++) {
        data[index] = values[index + 6];
    }
    canFram.data = data;
    
    return canFram; 
}
function readContent(filePath: string){
    fs.readFile(filePath, "utf8", function (err, data){
        if(err) {
            return console.error(err);
        }
        var allLines:string[] = data.split("\n");
        canFrams = new Array(allLines.length - 5);
        for (let index = 3; index < allLines.length - 2; index++) {
            let canFram = parseCanFram(allLines[index]);
            canFrams[index - 3] = canFram;
        }
    })
}

var canFrams:CanFram[];
readContent(ascFilePath);
export {canFrams}