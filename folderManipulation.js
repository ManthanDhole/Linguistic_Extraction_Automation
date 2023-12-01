const fs = require('fs');

let directorypath = "C:\\Portal\\DevOps\\Linguistics_Scripting\\widget-sdk_master-11-28-2023\\widget-sdk\\Infor_WidgetSDK_3.28.0\\Samples\\Widgets";
let outputFileLocation = "C:\\Portal\\DevOps\\Linguistics_Scripting\\widget-sdk_master-11-28-2023\\widget-sdk\\Infor_WidgetSDK_3.28.0\\Samples\\Translations\\New\\widget-en_US.txt"
fs.readdir(directorypath, (err, files) => {
    if(err)
    {
        console.log(err);
        return;
    }
    // console.log(files);
    printOnlyangularFiles(files);

});


function printOnlyangularFiles(allFiles)
{
    // console.log(allFiles);
    allFiles.forEach(file => {
        nameContains = "infor.sample.angular.banner";
        // nameContains = "infor.sample";
        if(file.includes(nameContains))
        {
            // console.log(file);
            var manifestFilePath = directorypath + '\\' + file + '\\widget.manifest';
            // console.log(manifestFilePath)
            readDataFromManifestFile(manifestFilePath, file)
        }
    });
}

function readDataFromManifestFile(filepath, filename)
{
    fs.readFile(filepath, "utf8", (err, data) => {
        if(err)
        {
            console.error(err);
        }
        // console.log(data);
        extract_enUS_fromLocalizationJson(data, filename);
    });
}

function extract_enUS_fromLocalizationJson(jsonStringData, filename)
{
    let jsonData = JSON.parse(jsonStringData);
    // console.log(jsonData);
    try
    {
        if(jsonData.localization["en-US"] !== undefined)
        {
            // console.log("File Name: " + filename);
            console.log(jsonData.localization["en-US"]);
            var jsonDataToString = JSON.stringify(jsonData.localization["en-US"])
            outputManifestToDirectory(filename, jsonDataToString)
        }
        // console.log("---------------------");
    }
    catch(exception)
    {
        console.log(exception)
    }
}


function outputManifestToDirectory(filename, manifestKeyValues)
{
    manifestKeyValues = manifestKeyValues.slice(1, manifestKeyValues.length-1);
    manifestKeyValues = manifestKeyValues.replaceAll(",", "\n").replace('\":\"', '\": \"');
    let dataToAppend = "FileName: " + filename + "\n" + manifestKeyValues + "\n\n";
    if(fs.existsSync(outputFileLocation))
    {
        fs.appendFile(outputFileLocation, dataToAppend, (err) => {
            if(err)
            {
                console.log(err)
            }
        });
    }
}