// components/search/index.js
import KeywordModel from '../../models/keyword.js'
import BookModel from '../../models/book.js'
import {paginationBev} from '../../components/behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    historyWords: Array,
    hotWords: Array,
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    q: '',
    requestMore: false,
    loadingCenter: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if(!this.data.q) {
        return
      }
      if(this._isLocked()){
        return
      }
      if(this.hasMore()) {
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books)
          this._unLocked()
        },() => {
          this._unLocked()
        })
      }
      
    },
    
    _isLocked() {
      return this.data.requestMore? true: false
    },

    _locked() {
      this.setData({
        requestMore: true
      })
    },

    _unLocked() {
      this.setData({
        requestMore: false
      })
    },

    onCancel(event) {
      this.triggerEvent('cancel',{},{})
      this.initialize()
    },
    onDelete(event){
      this._closeResult()
      this.initialize()
    },
    onConfirm(event) {
      this.initialize()
      this._showResult()
      const word = event.detail.value || event.detail.text
      this.setData({
        q: word
      })
      this._showLoadingCenter()
      bookModel.search(0, word).then((res)=> {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this._upDateHistory(word)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _upDateHistory(word) {
      if(!this.properties.historyWords.includes(word)){
        this.triggerEvent('search')
      }
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
