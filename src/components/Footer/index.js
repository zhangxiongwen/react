import './Footer.css'

/**
 * 全站页脚：联系方式 + 版权 + 备案
 */
function Footer() {
  return (
    <footer className="SiteFooter" id="contact">
      <div className="SiteFooter-inner">
        <div className="SiteFooter-contact">
          <h2 className="SiteFooter-heading">联系方式</h2>
          <p className="SiteFooter-line">
            微信：<strong>sg-zxw</strong>
          </p>
          <p className="SiteFooter-line">
            QQ 邮箱：
            <a href="mailto:435737642@qq.com">435737642@qq.com</a>
          </p>
        </div>

        <div className="SiteFooter-legal">
          <p className="SiteFooter-copy">© 2026 知趣集. All rights reserved.</p>
          <a
            className="SiteFooter-beian"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            粤ICP备2025501194号-2
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
