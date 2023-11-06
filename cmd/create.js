#! /usr/bin/env node
const fs = require('fs')
const path = require('node:path');
const dir = path.join(path.dirname(process.argv[1]),'..');

const configs = {
    INIT_PATH: dir,
    BASE_DIR: "./src",
    STUBS_DIR: "stub",
    COMPONENT_FOLDER: "/components",
}


//const conf = process.env.ENV ? configs : configTest

try {
    
    const componentName = process.argv[2]
    if(!componentName){
        console.error("You must specify the component name")
        return
    }
    
    const componentTemplate = process.argv.indexOf('-c') > -1 ? 'component-composition.vue' : 'component-options.vue'
    
    const folderArgIndex = process.argv.indexOf('--f')
    let customFolder = folderArgIndex > -1 ? process.argv[folderArgIndex+1] : '';
    customFolder = customFolder.charAt(-1) == '/' ? customFolder : `${customFolder}/`
    customFolder = customFolder.charAt(0) == '/' ? customFolder : `/${customFolder}`
    
    if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`)){
        fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}`);
    }
    
    console.log(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,componentTemplate))
    console.log(__filename);
    fs.readFile(path.join(configs.INIT_PATH,'src',configs.STUBS_DIR,componentTemplate), 'utf8', (err,data)=>{
        data = data.replaceAll("Component",capitalizeFirstLetter(componentName))
        if(!fs.existsSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}`)){
            fs.mkdirSync(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}`);
        }
        fs.writeFile(`${configs.BASE_DIR}${configs.COMPONENT_FOLDER}${customFolder}${componentName}.vue`,data,err=>{
            if(err){
                console.error(err)
            }else{
                console.log('Done')
            }
        })
    })
} catch (error) {
    console.error(error)
}




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}