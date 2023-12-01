const fs = require('fs');
// var filepath = "C:\\Portal\\DevOps\\Build_Version_Updates\\fetchVersion.py"; 
var filepath = "test.txt";
var datafromFile = "";
fs.readFile(filepath, 'utf8', (err, data) => {
    if(err)
    {
        console.error(err);
        return;
    }
    // datafromFile = '\n' + data;
    datafromFile = modifyReadFileData(data);

    // fs.appendFile(filepath, datafromFile, err => {
    //     if(err)
    //     {
    //         console.error(err);
    //         return;
    //     }
    // });

    fs.writeFile(filepath, datafromFile, err => {
        if(err)
        {
            console.error(err);
            return;
        }
    });

});

function modifyReadFileData(data)
{
    // console.log(data);
    newData = "New";
    return newData;
}