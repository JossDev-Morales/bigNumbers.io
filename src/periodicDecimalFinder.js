/**
 * 
 * @param {Array} decimals 
 * @returns boolean
 */
function isPeriodic(decimals) {
    let decimalList = [...decimals]
    let isPeriodic = false
    let cases = 0
    let couplePos
    let secondPos
    decimalList.forEach((couple, index) => {
        if (!isPeriodic) {
            couplePos = index
            decimalList.forEach((couplesIn, i) => {
                if (couple === couplesIn) {
                    cases++
                    if (cases === 2) {
                        secondPos = i
                        isPeriodic = true
                    }
                }
            })
            cases = 0
        }
    })
    let firstRange=[...decimals].filter((couples,index)=>{
        if (index>couplePos&&index<secondPos) {
            return couples
        }
    })
    let secondRange=[...decimals].filter((couples,index)=>{
        if (index>secondPos&&index<secondPos+firstRange.length+1) {
            return couples
        }
    })
    
    return false||isPeriodic&&firstRange.every((nums,index)=>{
        return nums===secondRange[index]
    })
    
    
}
module.exports = isPeriodic