export const svgBaseProps = {
    width: "1em",
    height: "1em",
    fill: "currentColor",
    ["aria-hidden"]: "true"
}
const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;
export function removeTypeTheme(type) {
    return type
        .replace(fillTester,'')
        .replace(outlineTester,'')
        .replace(twoToneTester,'');
}

export function withThemeSuffix(type,theme) {
    let result = type;
    if(theme === 'filled'){
        result += "-fill";
    } else if (theme === "outlined") {
        result += "-o";
    } else if (theme === "twoTone") {
        result += "-twotone";
    } else {
        throw(`This icon '${type}' has unknown theme '${theme}'`);
    }
    return result;
}