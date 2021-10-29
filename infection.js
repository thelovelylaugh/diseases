const fs = require("fs");
const parse = require("./parseFiles")
const JSON_Files = [{key: "people", file: "./people.json"}, {key: "tests", file: "./testReport.json"}];
const CSV_Files = [{key: "diseases", file: "./infectiousdiseases.csv"}];
const rawData = {};
const infectedList = [];


parse.JSON(JSON_Files, rawData);
parse.CSV(CSV_Files, rawData, ";")

rawData.tests = rawData.tests.testData;

function checkInfectedPeople(){
    
    for (valueTests of rawData.tests){
        for (valuePeople of rawData.people){
            if (valuePeople.id == valueTests.testerId){
                let allDiseaseList = [];
                for (valueDisease of rawData.diseases){
                    if (valueTests.testData.search(valueDisease.DNA) >= 0){
                        //allDiseaseList.push({name: valueDisease.Commonname, DNA: valueDisease.DNA})
                        allDiseaseList.push(valueDisease.Commonname)
                    }    
                }
                if(allDiseaseList.length>0){
                    infectedList.push({name: valuePeople.name, id: valuePeople.id, disease: allDiseaseList})
                    }
            }
        }
    }
    writeJSON_File();
 

};
checkInfectedPeople();

function writeJSON_File(){
    let data = JSON.stringify(infectedList);
    fs.writeFileSync("report.json", data, "utf8")
}



/*console.log(Object.keys(rawData.people[0]))
console.log(Object.keys(rawData.tests[0]))
console.log(Object.keys(rawData.diseases[0]))*/

//console.log(typeof rawData.people)
//console.table(infectedList)