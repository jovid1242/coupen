const isCupon = (coupon) => {
    if (Number.isInteger(Number(coupon))) {
        return true
    }
}
module.exports = isCupon