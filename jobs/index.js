const mayoclinic = require('./mayoclinic')
const fs = require('fs')

try{
    let conditions = await mayoclinic.init()
    await fs.writeFile('./bin/conditions.json', conditions, 'utf8', function(error){
        if(error){
            console.log("An error occured while writing JSON Object to File.");
            return err
        }
        console.log("JSON file has been saved.")
    })
}catch(e){
    console.error(e)
}