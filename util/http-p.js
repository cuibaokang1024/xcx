import { config } from '../config.js'

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}

export default class HTTP {
    request ({url, data={}, method="GET"}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: config.api_base_url + url,
                methond: method,
                data: data,
                header: {
                    'content-type': 'application/json',
                    'appkey': config.appkey
                },
                success: (res) => {
                    const code = res.statusCode.toString()
                    if (code.startsWith('2')) {
                       resolve(res.data)
                    }
                    else {
                        reject()
                        const error_code = res.data.error_code
                        this._show_error(error_code)
                    }
                },
                fail: (err) => {
                    reject()
                    this._show_error(1)
                }
            })
        })
    }
    _request(url, data={}, method="GET") {
        if(!params.method){
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                }
                else {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(1)
            }
        })
    }
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}