const puppeteer = require('puppeteer')
const fs = require('fs')
const categoryStartURLLink = 'https://www.mayoclinic.org/diseases-conditions/index?letter='
const categoryLinks = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]


const init = async function(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // page.on('console', consoleObj => consoleObj.type() !== 'warningconsole' ?  console.log(consoleObj.text()) : null)
    let links = new Set()
    let conditions = []
    for(let alpha of categoryLinks){
        console.log('fetching urls from category', alpha)
        await page.goto(categoryStartURLLink + alpha)
        let elementList = await page.evaluate(()=>{
            let elementsURl = Array.from(document.querySelectorAll('#index > ol > li > a'))
            return elementsURl.map(el=>{
                return el.href
            })
        })
        elementList.forEach(url => {
            links.add(url)
        })
    }
    
    for(let url of [...links]){
        conditions.push(await getConditions(url, page))
    }
    
    browser.close()
    return conditions
    // return conditions
}

const getConditions = async function(url, page){
    console.log(url)
    await page.goto(url.toString())
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    let condition = await page.evaluate(()=>{
        let condition = {
            causes: [],
            symptoms: [],
            risk_factors: [],
            complications: [],
            prevention: []
        }    
        //name
        condition.name = $('h1 > a')[0].innerText
        console.log('generating condition', condition.name)
        
        //img
        condition.imgURL = $('.photo > a')[0] ? $('.photo > a')[0].href : undefined
        
        let overview = $("h2:contains('Overview')")
        let symptoms = $("h2:contains('Symptoms')")
        let causes = $("h2:contains('Causes')")
        let risk_factors = $("h2:contains('Risk factors')")
        let complications = $("h2:contains('Complications')")
        let prevention = $("h2:contains('Prevention')")
        
        // Overview
        let overviewElements = $(overview).nextUntil('h2, h3')
        for(let el of overviewElements){
            if (el.localName == 'p'){
                !condition.overview ?  condition.overview = '' : null
                condition.overview = condition.overview + el.innerText + ' '
            }
        }

        // Symptoms
        let symptomsElements = $(symptoms).nextUntil('h2')
        for(let el of symptomsElements){
            if (el.localName == 'ul'){
                for(let symptom of el.children){
                    condition.symptoms.push(symptom.innerText.toLowerCase())
                }
            }
        }


        // Causes
        let causesElements = $(causes).nextUntil('h2')
        for(let el of causesElements){
            if (el.localName == 'ul'){
                for(let cause of el.children){
                    condition.causes.push(cause.innerText.toLowerCase())
                }
            }
        }

        // Risk factors
        let riskFactorsElements = $(risk_factors).nextUntil('h2')
        for(let el of riskFactorsElements){
            if (el.localName == 'ul'){
                for(let risk of el.children){
                    condition.risk_factors.push(risk.innerText.toLowerCase())
                }
            }
        }

        // Complication
        let complicationsElements = $(complications).nextUntil('h2')
        for(let el of complicationsElements){
            if (el.localName == 'ul'){
                for(let complication of el.children){
                    condition.complications.push(complication.innerText.toLowerCase())
                }
            }
        }

        // Prevention
        let preventionElements = $(prevention).nextUntil('h2')
        for(let el of preventionElements){
            if (el.localName == 'ul'){
                for(let prevention of el.children){
                    condition.prevention.push(prevention.innerText.toLowerCase())
                }
            }
        }

        console.log(condition)
        return condition
    })
    condition.ref = url
    return condition
} 

// init()
// getConditions()

module.exports = init