const activateCupon = require('./activateCupon')
const isActivation = (e) => {
    const coupon = e.split(' ').reverse().splice(0, 1)
    if (Number.isInteger(Number(coupon))) {
        activateCupon(Number(coupon))
        return true
    }
}
module.exports = isActivation