const mayoclinic = require('./mayoclinic')
const fs = require('fs')

const startJob = async function (){
    let conditions = await mayoclinic()
    await fs.writeFile('./bin/conditions.json', JSON.stringify(conditions), 'utf8', function(error){
        if(error){
            console.log("An error occured while writing JSON Object to File.");
            return err
        }
        console.log("JSON file has been saved.")
    })
}

startJob()