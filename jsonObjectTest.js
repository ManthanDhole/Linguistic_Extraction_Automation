// let jsonArray = '{"widgetId": "infor.sample.angular.banner","type": "inline","name": "Infor Sample Banner Widget","version": "1.0","category": "application","applicationLogicalId": "lid://infor.homepages","framework": "angular","aotVersion": "","targets": [ "banner", "default" ],"settings": [{"name": "chartType","type": "selector","defaultValue": "column","labelId": "chartType","values": "[Array]"}], "localization": {"en-US": {"widgetTitle": "Banner","widgetDescription": "Banner sample widget.","chartType": "Chart type","area": "Area","bar": "Bar","donut": "Donut","pie": "Pie","column": "Column","data": "Data"}}}'

// let parsed = JSON.parse(jsonArray);

// // console.log(parsed.findIndex("localization"));
// console.log(typeof(parsed));
// console.log(typeof(parsed.localization));
// console.log(parsed["localization"]["en-US"]);



// // if(parsed["localization"]["en-US"])
// if("en-USZ" in parsed.localization)
// {
//     console.log("en-US hai");
// }
// else
// {
//     console.log("Nai he")
// }

// const fs = require('fs')
// outputFolderLocation = "C:\\Portal\\DevOps\\Linguistics_Scripting\\widget-sdk_master-11-28-2023\\widget-sdk\\Infor_WidgetSDK_3.28.0\\Samples\\Translations\\New\\widget-en_US.txt"
// console.log(fs.existsSync(outputFolderLocation))
// if(File.exists(filecheck))
// {
//     console.log("hai")        
// }

let resourceFormat = '<data name="##WidgetID_ResourceKey##" xml:space="preserve">\n<value>##ResourceValue##</value>\n<comment>##Comment##</comment>\n</data>'

let data = '{"widgetTitle":"Banner","widgetDescription":"Banner sample widget.","chartType":"Chart type","area":"Area","bar":"Bar","donut":"Donut","pie":"Pie","column":"Column","data":"Data"}'

console.log(data);
let parsed = JSON.parse(data);
// let enUSData = parsed.localization["en-US"]
// console.log(typeof(enUSData));


for(const item in parsed)
{
    console.log(item + ": " + parsed[item])
    var resource = resourceFormat.replace("##WidgetID_ResourceKey##", item).replace("##ResourceValue##", parsed[item])
    // console.log(resource)
}