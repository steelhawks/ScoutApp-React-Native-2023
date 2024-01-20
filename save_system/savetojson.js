class Data {
    constructor(dict=null, teamNumber=null, matchType=null, matchNumber=null, scouterName=null, driverStation=null) {
        this.dict = dict;
        this.teamNumber = teamNumber;
        this.matchType = matchType;
        this.matchNumber = matchNumber;
        this.scouterName = scouterName;
        this.driverStation = driverStation;
    }
}

const fs = require('fs');

const jsonfile = require('jsonfile');

const file = 'data.json';
const data = jsonfile.readFileSync(file);

console.log(data.name);

jsonfile.writeFileSync(file, data, {spaces: 2});