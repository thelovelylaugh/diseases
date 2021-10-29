const fs = require("fs");
const parseFile = {
JSON: function(filesArray, outputObject){
    for(value of filesArray){
        let data = fs.readFileSync(value.file, "utf8")
    
        data = JSON.parse(data); 
        outputObject[value.key] = data;
    }
},
CSV: function(filesArray, outputObject, separator){
    separator = separator || ",";
    for(value of filesArray){
        let data = fs.readFileSync(value.file, "utf8")
        let RIR = data.split("\n");
        let keys = RIR[0].replace(/\s/g, "").split(separator);
        RIR.splice(0,1);
        outputObject[value.key] = RIR.map((items)=>{
            let object = {};
            for (let i = 0; i< keys.length; i++){
                object[keys[i]] = items.split(separator)[i];
            }
            return object;
        })
    }
}
}

module.exports = parseFile;