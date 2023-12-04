const fs = require('fs');

//Command to run the script
//node folderManipulation.js en-US "C:\Portal\DevOps\Linguistics_Scripting\widget-sdk_master-11-28-2023\widget-sdk\Infor_WidgetSDK_3.28.0\Samples\Widgets" "C:\Portal\DevOps\Linguistics_Scripting\widget-sdk_master-11-28-2023\widget-sdk\Infor_WidgetSDK_3.28.0\Samples\Translations\New\widget-en_US.resx"  


let outputFileContent = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
    <xsd:element name="root" msdata:IsDataSet="true">
      <xsd:complexType>
        <xsd:choice maxOccurs="unbounded">
          <xsd:element name="metadata">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" />
              </xsd:sequence>
              <xsd:attribute name="name" use="required" type="xsd:string" />
              <xsd:attribute name="type" type="xsd:string" />
              <xsd:attribute name="mimetype" type="xsd:string" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="assembly">
            <xsd:complexType>
              <xsd:attribute name="alias" type="xsd:string" />
              <xsd:attribute name="name" type="xsd:string" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="data">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="resheader">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" />
            </xsd:complexType>
          </xsd:element>
        </xsd:choice>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>`;


  outputFileContentEndLines = `
  </root>
`;

let allResources = "";

let languageCode = process.argv[2];
let directorypath = process.argv[3];
let outputFileLocation = process.argv[4];

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
    //Write the initial content in the file
    if(fs.existsSync(outputFileLocation))
    {
        fs.appendFile(outputFileLocation, outputFileContent, (err) => {
            if(err)
            {
                console.log(err)
            }
        });
    }

    //Write the Key and values in the file
    allFiles.forEach(file => {
        // nameContains = "infor.sample.angular.banner";
        nameContains = "infor.sample";
        if(file.includes(nameContains))
        {
            var manifestFilePath = directorypath + '\\' + file + '\\widget.manifest';
            readDataFromManifestFile(manifestFilePath, file)
        }
    });

    //Write the final/ending content in the file
    setTimeout(() => { 
        console.log("Exporting Resources to location " + outputFileLocation + ". Please wait for the program to finish.")
        fs.appendFile(outputFileLocation, outputFileContentEndLines, (err) => {
            if(err)
            {
                console.log(err)
            }
        });
     }, 2000);

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
    try
    {
        if(jsonData.localization[languageCode] !== undefined)
        {
            var jsonDataToString = JSON.stringify(jsonData.localization[languageCode])
            outputManifestToDirectory(filename, jsonDataToString)
        }
    }
    catch(exception)
    {
        console.error(exception)
    }
}


function outputManifestToDirectory(filename, manifestKeyValues)
{
    let dataToAppend = formatDataTo_RESXStructure(filename, manifestKeyValues);
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

function formatDataTo_RESXStructure(widgetId, manifestKeyValues, comment)
{
    keyValues = JSON.parse(manifestKeyValues);
    try
    {
        for(const item in keyValues)
        {
            let resourceName = widgetId + "_" + item;
            let resourceValue = keyValues[item];
            let formattedData;
            if(comment)
            {
                formattedData = `
        <data name="${resourceName}" xml:space="preserve">
            <value>${resourceValue}</value>
            <comment>${comment}</comment>
        </data>`;
            }
            else
            {
                formattedData = `
        <data name="${resourceName}" xml:space="preserve">
            <value>${keyValues[item]}</value>
        </data>`;
            }
            allResources += formattedData;
        }
        return allResources;
    }
    catch(ex)
    {
        console.log(ex);
    }
}