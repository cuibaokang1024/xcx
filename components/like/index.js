// components/like/index.js
//Component Object
Component({
  properties: {
    like:{
      type: Boolean,
      value: false
    },
    count:{
      type: Number
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },
  methods: {
    onLike: function () {
      let like = this.properties.like
      let count = this.properties.count
      count = like? count-1 : count+1
      this.setData({
        count: count,
        like: !like
      })

      let behavior = this.properties.like? 'like' : 'cancel'
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  },
  created: function(){

  },
  attached: function(){

  },
  ready: function(){

  },
  moved: function(){

  },
  detached: function(){

  },
});
