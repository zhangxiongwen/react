#!/bin/bash
# deploy.sh 一键部署脚本
set -e # 遇到错误直接终止脚本，防止继续跑

# ========== 【你只需要改下面这几个配置】 ==========
SERVER_USER="root"
SERVER_IP="180.76.178.142"
SERVER_TMP="/tmp"
TARGET_WEB_ROOT="/var/www/html"
# ==================================================

echo "===== 1. 执行 npm run build 打包 ====="
npm run build

echo "===== 2. 进入build目录，压缩静态资源 ====="
cd build
# 压缩build里面所有文件，生成zip包
zip -r home-page.zip ./*

echo "===== 3. 上传压缩包到服务器 ${SERVER_IP}:${SERVER_TMP} ====="
scp home-page.zip ${SERVER_USER}@${SERVER_IP}:${SERVER_TMP}/

echo "===== 4. 远程ssh执行解压+权限配置 ====="
ssh ${SERVER_USER}@${SERVER_IP} << EOF
cd ${SERVER_TMP}
# -o 覆盖文件，解压到网站根目录
unzip -o home-page.zip -d ${TARGET_WEB_ROOT}
# 设置文件权限
chown -R www-data:www-data ${TARGET_WEB_ROOT}
# 删除服务器上临时zip包，清理垃圾
rm -f ${SERVER_TMP}/home-page.zip
echo "✅ 部署完成！"
EOF

# 返回项目根目录，清理本地zip包
cd ..
rm -f build/home-page.zip

echo "🎉 全部流程执行完毕"
