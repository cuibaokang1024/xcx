import HTTP from '../util/http-p.js'
export default class BookModel extends HTTP {
    geHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
    getMyBookCount() {
        return this.request({
            url: `book/favor/count`
        })
    }

    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    getLikeStatus(bid) {
        return this.request({
            url: `/book/${bid}/favor`
        })
    }

    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }
}