# n8n-nodes-zalo-oa

Bộ node tích hợp Zalo Official Account (OA) vào n8n, cho phép tự động hóa tương tác với người dùng Zalo thông qua Zalo OA API.

[n8n](https://n8n.io/) là nền tảng tự động hóa quy trình làm việc được cấp phép [fair-code](https://docs.n8n.io/reference/license/).

## Tính năng

Bộ node này bao gồm:

### 1. Node Zalo OA

Node chính để tương tác với Zalo OA API, hỗ trợ các chức năng:

- **Gửi tin nhắn**: văn bản, hình ảnh, file, danh sách
- **Quản lý media**: upload hình ảnh, file
- **Quản lý người theo dõi**: lấy thông tin, gán tag
- **Quản lý tag**: lấy danh sách tag

### 2. Node Zalo OA Webhook

Node webhook để nhận và xử lý các sự kiện từ Zalo OA:

- **Người dùng follow/unfollow OA**
- **Người dùng gửi tin nhắn**: văn bản, hình ảnh, file, vị trí, sticker, GIF
- **Người dùng tương tác**: nhấp vào nút, liên kết
- **Xác thực MAC**: đảm bảo an toàn cho webhook

## Cài đặt

### Cài đặt từ npm

```bash
npm install n8n-nodes-zalo-oa-intergration
```

### Cài đặt thủ công

Bước 1: Clone repository:

```bash
git clone https://github.com/zalo-oa/n8n-nodes-zalo-oa.git
```

Bước 2: Build node:

```bash
cd n8n-nodes-zalo-oa-integration
npm install
npm run build
```

Bước 3: Copy thư mục `dist` vào thư mục custom của n8n:

```bash
cp -r dist/* ~/.n8n/custom/
```

## Hướng dẫn sử dụng

### Thiết lập xác thực

1. Tạo Zalo OA tại [Zalo Business](https://business.zalo.me/)
2. Đăng ký ứng dụng tại [Zalo Developers](https://developers.zalo.me/)
3. Lấy App ID, Secret Key, Access Token và OA ID
4. Trong n8n, tạo credential mới cho Zalo OA API

### Sử dụng Node Zalo OA

#### Gửi tin nhắn văn bản

1. Thêm node Zalo OA vào workflow
2. Chọn operation "Gửi Tin Nhắn Văn Bản"
3. Nhập User ID và nội dung tin nhắn
4. Chạy workflow

#### Upload hình ảnh

1. Thêm node Zalo OA vào workflow
2. Chọn operation "Upload Hình Ảnh"
3. Chọn nguồn hình ảnh (URL hoặc Binary Data)
4. Chạy workflow để lấy ID hình ảnh

### Sử dụng Node Zalo OA Webhook

1. Thêm node Zalo OA Webhook vào workflow
2. Nhập OA Secret Key
3. Chọn các loại sự kiện muốn nhận
4. Kích hoạt workflow để lấy URL webhook
5. Cấu hình URL webhook trong trang quản lý Zalo OA

## Ví dụ workflow

### Gửi tin nhắn chào mừng khi có người theo dõi mới

1. Thêm node Zalo OA Webhook (lọc sự kiện "follow")
2. Thêm node Zalo OA để gửi tin nhắn chào mừng
3. Kết nối các node và kích hoạt workflow

### Trả lời tự động tin nhắn của người dùng

1. Thêm node Zalo OA Webhook (lọc sự kiện "user_send_text")
2. Thêm node Function để xử lý nội dung tin nhắn
3. Thêm node Zalo OA để gửi tin nhắn trả lời
4. Kết nối các node và kích hoạt workflow

## Lưu ý quan trọng

1. **Rate Limit**: Zalo OA API có giới hạn số lượng request, thường là 10 requests/giây
2. **Access Token**: Access Token có thời hạn sử dụng, cần cập nhật khi hết hạn
3. **HTTPS**: Zalo OA yêu cầu webhook phải sử dụng HTTPS
4. **Xác thực MAC**: Nên bật tính năng này để đảm bảo an toàn cho webhook

## Tài liệu tham khảo

- [Tài liệu Zalo OA API](https://developers.zalo.me/docs/api/official-account-api-147)
- [Tài liệu n8n Community Nodes](https://docs.n8n.io/integrations/creating-nodes/)

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request trên GitHub.

## Giấy phép

[MIT](LICENSE.md)
