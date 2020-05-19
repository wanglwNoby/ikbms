/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { generateTheme, getLessVars } = require('antd-theme-generator')

const options = {
    stylesDir: path.join(__dirname, './src/common/styles'),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, './src/common/styles/vars.less'),
    mainLessFile: path.join(__dirname, './src/common/styles/main.less'),
    themeVariables: [
        '@layout-header-background',
        '@layout-body-background',
        '@primary-color',
        '@link-color',
        '@heading-color',
        '@text-color',
        '@text-color-secondary',
        '@disabled-color',
        '@border-color-base',
        '@slick-dots-background'
    ],
    indexFileName: 'index.html',
    outputFilePath: path.join(__dirname, './public/color.less')
}

generateTheme(options).then(() => {
    console.log('Theme generated successfully')
}).catch((error) => {
    console.log('Error', error)
})