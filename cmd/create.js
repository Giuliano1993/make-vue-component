#! /usr/bin/env node
const fs = require('fs')

const configs = {
    INIT_PATH: process.env.INIT_CWD,
    BASE_DIR: "./src",
    STUBS_DIR: "./node_modules/make-vue-component/src/stubs",
    COMPONENT_FOLDER: "/components",
}

const configTest = {
    INIT_PATH: process.env.INIT_CWD,
    BASE_DIR: "./src",
    STUBS_DIR: "./src/stub",
    COMPONENT_FOLDER: "/components"
}

//const conf = process.env.ENV ? configs : configTest

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

fs.readFile(`${configs.INIT_PATH}/${configs.STUBS_DIR}/${componentTemplate}`, 'utf8', (err,data)=>{
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




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}