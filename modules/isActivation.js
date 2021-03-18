const activateCupon = require('./activateCupon')
const isAdmin = require('./isAdmin')
const isActivation = async (e, ctx) => {
    const admin = await isAdmin(ctx.message.chat.id)
    if (admin) {
        const coupon = e.split(' ').reverse().splice(0, 1)
        if (Number.isInteger(Number(coupon))) {
            activateCupon(Number(coupon))
            return true
        }
        return false
    }
    return false

}
module.exports = isActivation