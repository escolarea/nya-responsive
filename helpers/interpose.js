import _ from 'lodash'

export default function interpose(array, thing){
    let getnext = _.isFunction(thing) ? thing : ()=>thing
    let result = []
    for (let i = 0; i < array.length; i++){
        result.push(array[i])
        result.push(getnext(i))
    }
    return result
}