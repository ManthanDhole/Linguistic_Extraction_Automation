let fs = require('fs');

// let directorypath = process.argv[3];
let directorypath = "C:\\Portal\\DevOps\\Linguistics_Scripting\\widget-sdk_master-11-28-2023\\widget-sdk\\Infor_WidgetSDK_3.28.0\\Samples\\Translations\\";


function listLinguisticsFiles_toMergeInWidgetManifest(directoryPath)
{
    fs.readdir(directorypath, (err,files)=>{
        if(err)
        {
            console.log(err);
        }
        files.forEach(file => {
            if(file.includes("Widgets.resx"))
            {
                //make a call from here to extract the resources from files sent by linguistics team
                console.log(file);
                var linguisticsFilepath = directoryPath + '\\' + file; 
                console.log(linguisticsFilepath)
            }
        });
        console.log(files);
    });
} 

//call the functions. Program starts from here
listLinguisticsFiles_toMergeInWidgetManifest(directorypath);