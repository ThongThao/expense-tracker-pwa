# 🚀 Hướng dẫn Deploy Expense Tracker PWA

## 📋 Tổng quan

Expense Tracker là một Progressive Web App (PWA) có thể được deploy trên nhiều platform khác nhau. Dưới đây là hướng dẫn chi tiết cho từng platform.

## 🛠️ Build Production

### 1. Build ứng dụng
```bash
npm run build
```

### 2. Test local production build
```bash
npm run serve
```
Ứng dụng sẽ chạy tại http://localhost:3000

## 🌐 Deploy lên các Platform

### 1. Netlify (Khuyến nghị)

**Cách 1: Drag & Drop**
1. Truy cập https://netlify.com
2. Drag thư mục `build` vào Netlify Drop
3. Ứng dụng sẽ được deploy tự động

**Cách 2: Git Integration**
1. Push code lên GitHub/GitLab
2. Connect repository với Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

### 2. Vercel

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
cd expense-tracker
vercel --prod
```

### 3. GitHub Pages

1. Cài đặt gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Thêm vào package.json:
```json
{
  "homepage": "https://yourusername.github.io/expense-tracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### 4. Firebase Hosting

1. Cài đặt Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login và init:
```bash
firebase login
firebase init hosting
```

3. Cấu hình firebase.json:
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy
```

### 5. Heroku

1. Tạo server.js:
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

2. Cập nhật package.json:
```json
{
  "scripts": {
    "start": "node server.js",
    "heroku-postbuild": "npm run build"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

3. Deploy:
```bash
heroku create expense-tracker-pwa
git push heroku main
```

## 📱 PWA Features Check

Sau khi deploy, kiểm tra các tính năng PWA:

### 1. Lighthouse Audit
- Mở Chrome DevTools
- Tab Lighthouse
- Chạy PWA audit
- Đảm bảo score >= 90

### 2. Service Worker
- Kiểm tra trong Application tab của DevTools
- Verify SW được register thành công
- Test offline functionality

### 3. Web App Manifest
- Kiểm tra manifest.json được load
- Test "Add to Home Screen" trên mobile
- Verify app có thể chạy standalone

## 🔧 Tối ưu hóa Production

### 1. Environment Variables
Tạo file .env.production:
```
REACT_APP_VERSION=1.0.0
REACT_APP_BUILD_DATE=2024-01-01
```

### 2. Performance Optimizations
- Code splitting đã được tự động bởi React
- Service Worker cache tất cả static assets
- Lazy loading cho components lớn

### 3. SEO & Meta Tags
- Open Graph tags cho social sharing
- Structured data cho search engines
- Sitemap.xml (nếu cần)

## 🚨 Troubleshooting

### Service Worker không hoạt động
- Đảm bảo HTTPS (required cho SW)
- Check console errors
- Clear browser cache

### PWA không hiện install prompt
- Kiểm tra manifest.json syntax
- Verify HTTPS
- Test trên mobile browser

### Offline không hoạt động
- Kiểm tra SW registration
- Verify cache strategies
- Test network throttling

## 📊 Monitoring & Analytics

### 1. Google Analytics
Thêm GA4 tracking:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 Performance Metrics

Mục tiêu performance:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

- HTTPS required cho PWA
- Content Security Policy headers
- No sensitive data trong localStorage
- Regular dependency updates

---

**Lưu ý**: Đảm bảo test kỹ trên nhiều thiết bị và browser trước khi deploy production!
