# 💰 Expense Tracker PWA

Ứng dụng theo dõi chi tiêu cá nhân với giao diện đẹp, hỗ trợ offline và hoạt động trên mọi nền tảng.

## ✨ Tính năng

- 📊 **Dashboard tổng quan**: Hiển thị tổng chi tiêu, chi tiêu tháng này
- ➕ **Thêm chi tiêu**: Form đơn giản để thêm chi tiêu mới
- 📋 **Danh sách chi tiêu**: Xem tất cả chi tiêu với khả năng xóa
- 📈 **Biểu đồ**: Biểu đồ tròn và cột hiển thị phân bố chi tiêu
- 🏷️ **Phân loại**: 8 danh mục chi tiêu với icon và màu sắc
- 💾 **Lưu trữ offline**: Dữ liệu được lưu trong localStorage
- 📱 **PWA**: Có thể cài đặt như ứng dụng native
- 🌐 **Offline**: Hoạt động hoàn toàn offline với Service Worker

## 🎨 Danh mục chi tiêu

1. 🍽️ **Ăn uống** - Màu đỏ
2. 🚗 **Giao thông** - Màu xanh dương
3. 🛍️ **Mua sắm** - Màu tím
4. 🎬 **Giải trí** - Màu cam
5. 💊 **Sức khỏe** - Màu xanh lá
6. 📚 **Giáo dục** - Màu xanh cyan
7. 🏠 **Nhà cửa** - Màu xanh lime
8. 💼 **Khác** - Màu xám

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng development
```bash
npm start
```
Ứng dụng sẽ chạy tại http://localhost:3000

### Build cho production
```bash
npm run build
```

### Test ứng dụng
```bash
npm test
```

## 🏗️ Công nghệ sử dụng

- **React 18** với TypeScript
- **Tailwind CSS** cho styling
- **Chart.js + React-Chartjs-2** cho biểu đồ
- **Service Worker** cho offline support
- **Web App Manifest** cho PWA
- **localStorage** cho lưu trữ dữ liệu

## 📱 PWA Features

### Cài đặt ứng dụng
- Trên Chrome/Edge: Nhấn nút "Install" trên address bar
- Trên mobile: Chọn "Add to Home Screen"

### Offline Support
- Tất cả tính năng hoạt động offline
- Dữ liệu được cache trong localStorage
- Assets được cache bởi Service Worker

## 🎯 Cách sử dụng

1. **Tổng quan**: Xem thống kê chi tiêu tổng thể
2. **Thêm chi tiêu**: Điền số tiền, mô tả, chọn danh mục và ngày
3. **Danh sách**: Xem tất cả chi tiêu, có thể xóa từng item
4. **Biểu đồ**: Xem phân bố chi tiêu theo danh mục và theo ngày

## 📊 Tính năng biểu đồ

- **Biểu đồ tròn**: Phân bố chi tiêu theo danh mục
- **Biểu đồ cột**: Chi tiêu 7 ngày gần đây
- **Responsive**: Tự động điều chỉnh kích thước
- **Interactive**: Hover để xem chi tiết

## 🔧 Cấu trúc project

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Trang tổng quan
│   ├── ExpenseForm.tsx  # Form thêm chi tiêu
│   ├── ExpenseList.tsx  # Danh sách chi tiêu
│   └── ExpenseChart.tsx # Biểu đồ
├── hooks/              # Custom hooks
│   ├── useExpenses.ts  # Hook quản lý chi tiêu
│   └── useLocalStorage.ts # Hook localStorage
├── types/              # TypeScript types
│   └── index.ts        # Định nghĩa types
└── App.tsx            # Main component
```

## 🌟 Tính năng nổi bật

- **Responsive Design**: Hoạt động tốt trên desktop, tablet, mobile
- **Dark/Light Theme**: Giao diện sáng/tối (có thể mở rộng)
- **Accessibility**: Tuân thủ WCAG guidelines
- **Performance**: Lazy loading và code splitting
- **SEO Friendly**: Meta tags và structured data

## 🔮 Tính năng có thể mở rộng

- [ ] Xuất/nhập dữ liệu (CSV, JSON)
- [ ] Báo cáo chi tiết theo tháng/năm
- [ ] Đặt ngân sách cho từng danh mục
- [ ] Thông báo khi vượt ngân sách
- [ ] Sync dữ liệu với cloud
- [ ] Nhiều người dùng
- [ ] Dark mode toggle
- [ ] Đa ngôn ngữ

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

Phát triển với ❤️ bởi Expense Tracker Team