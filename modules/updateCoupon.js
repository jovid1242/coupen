const updateCoupon = (coupon) => {
    const collection = global.DB.collection("tg_users")
    return collection.updateOne({ coupon: coupon }, { $set: { active_coupon: 1 } }).then((user) => {
        return 'Успешно'
    })
}

module.exports = updateCoupon