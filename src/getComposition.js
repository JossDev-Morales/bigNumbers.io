/**
 * 
 * @param {string} numberRaw the number to extract the composition
 * @returns {{sign:string,ints:Array,decimals:Array,complete:string}}
 */
function getComposition(numberRaw) {
    let number=numberRaw.split('')
    if (number[0]===' ') {
        while (number[0]===' ') {
            number.shift()
            number=number
        }
    }
    number=number.join('')
    let havesign = number[0] === '-'
    const composition = {
        sign: havesign ? number.split('').shift() : '',
        ints: number.slice(havesign ? 1 : 0).split('.')[0].split(''),
        decimals: number.slice(havesign ? 1 : 0).split('.')[1]?.split('') ?? [0],
        complete:number.slice(havesign ? 1 : 0).split('.')[1]?number.slice(havesign ? 1 : 0).split('.')[0]+'.'+number.slice(havesign ? 1 : 0).split('.')[1]:number.slice(havesign ? 1 : 0).split('.')[0]+'.'+'0'
    }
    while (composition.ints[0] === '0') {
        composition.ints = composition.ints.slice(1)
    }

    while (composition.decimals[composition.decimals.length - 1] === '0' && composition.decimals.length > 1) {
        composition.decimals.pop()
    }

    return composition
}
module.exports = getComposition