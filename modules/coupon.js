const Coupon = (chat_id, coupon) => {
    const collection = global.DB.collection("tg_users")
    return collection.findOne({ chat_id: chat_id })
        .then((user) => {
            if (user.admin !== 0) {
                if (Number.isInteger(Number(coupon))) {
                    if (coupon.length === 5) {
                        return coupon
                    }
                }
            }
            return false
        })
}


module.exports = Coupon