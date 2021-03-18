// const ObjectID = require('mongodb').ObjectID

const activateCoupon = (coupon) => {
    const collection = global.DB.collection("tg_users")
    return collection.updateOne({ coupon: Number(coupon) }, { $inc: { active_coupon: 1 } }).then((user) => {
        return 'Успешно'
    })
}

module.exports = activateCoupon