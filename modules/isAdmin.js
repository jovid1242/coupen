const isAdmin = (chat_id) => {
    const collection = global.DB.collection("tg_users")
    return collection.findOne({ chat_id: chat_id })
        .then((user) => {
            if (user.admin !== 0) {
                return true
            }
            return false
        })
}

module.exports = isAdmin