export function parseOnlyLetters(str){
    return typeof(str) === 'string' ? str.replace(/[^a-zA-Z]/g,"").toLowerCase() : str
}
export function removeHash(str){
    try {
      const list = ['/#/', '#/', '#']
      const hash = list.find(mix => str.indexOf(mix) === 0)
      return str.replace(hash, '/')
    } catch (error) {
      console.warn(error)
      return str
    }
  }