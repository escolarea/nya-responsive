export function parseOnlyNumbers(str){
    let number = typeof(str) === 'string' ? parseInt(str.replace(/\D/g, "")) : str
    if(Number.isInteger(number)) return number
}