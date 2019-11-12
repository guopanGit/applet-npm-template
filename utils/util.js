/*
 *  guoPan
 *  2019-11-12 18:25
 */

/**
 * 时间格式化函数
 * @date 传入日期对象
 * @dateTime 日期类型(日期/日期+时间)
 */
export function formatTime(date, dateTime, separator) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  // 分隔符
  if (!separator) {
    separator = '-'
  }

  // 日期 + 时间
  if (dateTime == 1) {
    // YYYY-MM-DD hh:mm:ss
    return [year, month, day].map(formatNumber).join(separator) + ' ' + [hour, minute, second].map(formatNumber).join(':');
  } else if (dateTime == 2) {
    // YYYY-MM-DD mm:ss
    return [minute, second].map(formatNumber).join(':');
  } else if (dateTime == 3) {
    // hh:mm:ss
    return [hour, minute, second].map(formatNumber).join(':');
  } else if (dateTime == 4) {
    // mm:ss
    return [minute, second].map(formatNumber).join(':');
  } else {
    // YYYY-MM-DD
    return [year, month, day].map(formatNumber).join(separator);
  }
}

/**
 * 数字前面自动补齐0
 */
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 弱提示封装
 * @title 提示内容
 */
export function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'none',
    mask: false,
    duration: 2000,
  })
}

/**
 * 请求封装
 * @isLoading 是否显示Loading
 * @url 请求地址
 * @data 请求参数
 * @method 请求类型
 */
export function ajaxPromise(isLoading, url, data, method, modal) {
  // 请求判断类型
  if (!method) {
    method = 'GET'
  }
  // 是否显示加载动画
  if (isLoading) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  }
  // 请求
  return new Promise((resolve, rejected) => {
    wx.request({
      url,
      data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Accept': 'application/json'
      },
      method,
      success: (res) => {
        if (isLoading) {
          wx.hideLoading();
        }
        // 根据请求结果修改
        if (res.resultCode === '0') {
          resolve(res)
        } else {
          rejected(res)
          if (!modal) {
            showToast(res.resultData)
          }
        }
      },
      fail: () => {
        if (isLoading) {
          wx.hideLoading();
        }
        showToast('网络堵车了~')
      }
    })
  })
}
