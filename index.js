const validateInput = require('./utils/validateInput');
const sortDependencies = require('./utils/sortDependencies');
const yargs = require("yargs");

const options = yargs
    .usage("Usage: -d <packages>")
    .option("d", { alias: "packages", describe: "Enter your Dependencies array like this : \"KittenService: CamelCaser\", \"CamelCaser: \"", type: "array", demandOption: true })
    .argv;

const input = options.packages;

const isValid = validateInput.validInput(input);
if (!isValid) {
    console.log("invalid package array. Must be array of strings");
    return;
}
const objectify = sortDependencies.objectifyInput(input);
const packageObject = objectify.packageObject;
const packageArray = objectify.packageArray;
const isCycling = validateInput.checkCycling(packageObject, packageArray);
if (isCycling) {
    console.log("invalid package array. The packages cycle and cannot be sorted");
    return;
}
const packageList = sortDependencies.defineInstallOrder(packageObject, packageArray);
const retVal = `Here is the package install order: ${packageList}`;
console.log(retVal);

