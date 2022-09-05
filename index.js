
//Load necesary modules 
const fs = require("fs");
const { parse } = require("csv-parse");
const _eval = require('eval');
const validUrl = require("valid-url");
const request = require('request');
const https = require("https");

// Principal function
// Input two arguments: 
// A valid url o path for a csv file
// A valid function
// Output result list with function applied
async function main() {
    //load function 
    const functionParam = process.argv[3];
    // test function 
    console.info('Test function run: ')
    try {
        eval(`var transformetFunction = ${functionParam}`); 
        transformetFunction(1);
    } catch (e) {
        console.log('Error trying to run the function please check that it is in the correct format');
        process.exit(0);
    }

    let fileContent;

    //load file from url
    if (validUrl.isUri(process.argv[2])){
         await httpGet(process.argv[2]);
         fileContent = fs.createReadStream('./data.csv');

    //load file from path
    } else {
        console.log('Arg 1 its a path');
        fileContent = fs.createReadStream(process.argv[2]);
    }
    
    console.time('fileContentExecution')
    console.info('Funtion execution output: ')
    //load file content 
    fileContent.pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    eval(`var transformetFunction = ${functionParam}`); 
                    transformetFunction(row);
                });
    //error handling 
    fileContent.on("error", err => {
        console.error('The argument you have sent as a csv file is not a file or the path is wrong');
    });
    console.timeEnd('fileContentExecution')
}

async function httpGet(url) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream("data.csv");
        https.get(url, function (response) {
            response.pipe(file);
            file.on("finish", () => {
                console.log("Download Completed");
                resolve(response.toString());
            });
        });
    });
}


//call main function 
main();
