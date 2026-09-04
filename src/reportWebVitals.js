/**
 * 上报 Web Vitals 性能指标
 * @param {Function} onPerfEntry - 收到性能数据后的回调函数
 *
 * 常用指标说明：
 * - CLS：累计布局偏移
 * - FID：首次输入延迟
 * - FCP：首次内容绘制
 * - LCP：最大内容绘制
 * - TTFB：首字节时间
 */
const reportWebVitals = onPerfEntry => {
  // 仅当传入了有效函数时才加载并采集指标
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 动态导入 web-vitals，避免影响首屏加载体积
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);  // 累计布局偏移
      getFID(onPerfEntry);  // 首次输入延迟
      getFCP(onPerfEntry);  // 首次内容绘制
      getLCP(onPerfEntry);  // 最大内容绘制
      getTTFB(onPerfEntry); // 首字节时间
    });
  }
};

export default reportWebVitals;
