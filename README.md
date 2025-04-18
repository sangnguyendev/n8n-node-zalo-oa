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

## Mua cho tôi 1 ly cafe

Nếu bạn thấy dự án này hữu ích và muốn hỗ trợ phát triển, bạn có thể mua cho tôi một ly cafe:
![Phạm Sỹ Cang](image.png)

- Momo: 0973781781
- Zalo: 0973781781

Mỗi đóng góp đều rất có ý nghĩa và giúp duy trì dự án này!

## Tác giả
- Phạm Sỹ Cang - ChickenAI Team

## Cài đặt

### Cài đặt n8n Community Node

Có nhiều cách để cài đặt n8n community node, tùy thuộc vào cách bạn đã cài đặt n8n:

#### 1. Cài đặt trong n8n website

Các bước cài đặt:

- Mở n8n website
- Vào **Settings** > **Community Nodes**
- Nhấp vào **Install** và nhập tên package: `n8n-nodes-zalo-oa-integration`
- Nhấp vào **Install** và khởi động lại n8n khi được nhắc

#### 2. Cài đặt trong n8n Docker

Các bước cài đặt:

- Tạo thư mục custom cho n8n:

```bash
mkdir -p /path-to-n8n-data/custom
```

- Thêm volume vào docker-compose.yml:

```yaml
volumes:
  - /path-to-n8n-data/custom:/home/node/.n8n/custom
```

- Cài đặt node trong container:

```bash
docker-compose exec n8n npm install n8n-nodes-zalo-oa-integration
```

- Khởi động lại container:

```bash
docker-compose restart n8n
```

#### 3. Cài đặt từ npm (cài đặt toàn cục)

```bash
npm install -g n8n-nodes-zalo-oa-integration
```

#### 4. Cài đặt từ npm (cài đặt cục bộ)

```bash
npm install n8n-nodes-zalo-oa-integration
```

#### 5. Cài đặt thủ công

Các bước cài đặt thủ công:

- Clone repository:

```bash
git clone https://github.com/ChickenAI/zalo-node-oa.git
```

- Build node:

```bash
cd zalo-node-oa
npm install
npm run build
```

- Copy thư mục `dist` vào thư mục custom của n8n:

```bash
# Linux/macOS
cp -r dist/* ~/.n8n/custom/

# Windows
xcopy /E dist\* %APPDATA%\n8n\custom\
```

## Hướng dẫn sử dụng

### Thiết lập xác thực

Các bước thiết lập:

- Tạo Zalo OA tại [Zalo Business](https://business.zalo.me/)
- Đăng ký ứng dụng tại [Zalo Developers](https://developers.zalo.me/)
- Lấy App ID, Secret Key, Access Token và OA ID
- Trong n8n, tạo credential mới cho Zalo OA API

### Sử dụng Node Zalo OA

#### Gửi tin nhắn văn bản

Các bước thực hiện:

- Thêm node Zalo OA vào workflow
- Chọn operation "Gửi Tin Nhắn Văn Bản"
- Nhập User ID và nội dung tin nhắn
- Chạy workflow

#### Upload hình ảnh

Các bước thực hiện:

- Thêm node Zalo OA vào workflow
- Chọn operation "Upload Hình Ảnh"
- Chọn nguồn hình ảnh (URL hoặc Binary Data)
- Chạy workflow để lấy ID hình ảnh

### Sử dụng Node Zalo OA Webhook

Các bước thiết lập webhook:

- Thêm node Zalo OA Webhook vào workflow
- Nhập OA Secret Key
- Chọn các loại sự kiện muốn nhận
- Kích hoạt workflow để lấy URL webhook
- Cấu hình URL webhook trong trang quản lý Zalo OA

## Ví dụ workflow

### Gửi tin nhắn chào mừng khi có người theo dõi mới

Các bước thực hiện:

- Thêm node Zalo OA Webhook (lọc sự kiện "follow")
- Thêm node Zalo OA để gửi tin nhắn chào mừng
- Kết nối các node và kích hoạt workflow

### Trả lời tự động tin nhắn của người dùng

Các bước thực hiện:

- Thêm node Zalo OA Webhook (lọc sự kiện "user_send_text")
- Thêm node Function để xử lý nội dung tin nhắn
- Thêm node Zalo OA để gửi tin nhắn trả lời
- Kết nối các node và kích hoạt workflow

## Lưu ý quan trọng

Một số lưu ý khi sử dụng Zalo OA API:

- **Rate Limit**: Zalo OA API có giới hạn số lượng request, thường là 10 requests/giây
- **Access Token**: Access Token có thời hạn sử dụng, cần cập nhật khi hết hạn
- **HTTPS**: Zalo OA yêu cầu webhook phải sử dụng HTTPS
- **Xác thực MAC**: Nên bật tính năng này để đảm bảo an toàn cho webhook

## Tài liệu tham khảo

- [Tài liệu Zalo OA API](https://developers.zalo.me/docs/api/official-account-api-147)
- [Tài liệu n8n Community Nodes](https://docs.n8n.io/integrations/creating-nodes/)

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request trên GitHub.

## Giấy phép

[MIT](LICENSE.md)
