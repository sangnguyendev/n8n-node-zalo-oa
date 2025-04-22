# Hướng dẫn sử dụng node Zalo OA - Gửi tin nhắn

## Giới thiệu

Node Zalo OA cho phép bạn tương tác với Zalo Official Account API để gửi các loại tin nhắn khác nhau đến người theo dõi OA của bạn. Hướng dẫn này tập trung vào các tính năng gửi tin nhắn.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền gửi tin nhắn
- Người nhận tin nhắn phải đang theo dõi OA của bạn

## Các loại tin nhắn hỗ trợ

Node Zalo OA hỗ trợ gửi các loại tin nhắn sau:

1. Tin nhắn văn bản (Text Message)
2. Tin nhắn hình ảnh (Image Message)
3. Tin nhắn file (File Message)
4. Tin nhắn danh sách (List Message)

## Loại tin nhắn theo quy định của Zalo

Theo quy định của Zalo OA API v3.0, mỗi tin nhắn phải thuộc một trong các loại sau:

- **Tin nhắn tư vấn (Customer Service)**: Dùng để tư vấn, hỗ trợ khách hàng
- **Tin nhắn giao dịch (Transaction)**: Dùng để thông báo về giao dịch, đơn hàng
- **Tin nhắn quảng cáo (Promotion)**: Dùng để gửi thông tin quảng cáo, khuyến mãi

## 1. Gửi tin nhắn văn bản

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Message Type | Loại tin nhắn | Có | cs (Customer Service) |
| User ID | ID của người nhận tin nhắn | Có | - |
| Text | Nội dung tin nhắn văn bản | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Gửi Tin Nhắn Văn Bản"
3. Cấu hình các tham số:
   - **Message Type**: cs
   - **User ID**: 123456789 (ID của người theo dõi)
   - **Text**: Xin chào! Cảm ơn bạn đã theo dõi OA của chúng tôi.
4. Chạy node để gửi tin nhắn

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "message_id": "7dce8fea5a4d8d82a87f"
  }
}
```

### Lưu ý

- Tin nhắn văn bản có độ dài tối đa 2000 ký tự
- Nếu người dùng không theo dõi OA, bạn sẽ nhận được lỗi -213
- Đối với tin nhắn quảng cáo (promotion), người dùng phải tương tác với OA trong vòng 24h gần đây

## 2. Gửi tin nhắn hình ảnh

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Message Type | Loại tin nhắn | Có | cs (Customer Service) |
| User ID | ID của người nhận tin nhắn | Có | - |
| Loại Hình Ảnh | Nguồn hình ảnh (URL hoặc ID) | Có | imageUrl |
| URL Hình Ảnh | URL của hình ảnh cần gửi | Có (nếu chọn imageUrl) | - |
| ID Hình Ảnh | ID của hình ảnh đã upload | Có (nếu chọn imageId) | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Gửi Tin Nhắn Hình Ảnh"
3. Cấu hình các tham số:
   - **Message Type**: cs
   - **User ID**: 123456789
   - **Loại Hình Ảnh**: imageUrl
   - **URL Hình Ảnh**: https://example.com/image.jpg
4. Chạy node để gửi tin nhắn hình ảnh

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "message_id": "8fce9fea5a4d8d82b98g"
  }
}
```

### Lưu ý

- Hình ảnh phải có định dạng JPG, PNG hoặc GIF
- Kích thước hình ảnh không vượt quá 1MB
- Nếu sử dụng ID hình ảnh, bạn cần upload hình ảnh trước bằng operation "Upload Hình Ảnh"

## 3. Gửi tin nhắn file

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Message Type | Loại tin nhắn | Có | cs (Customer Service) |
| User ID | ID của người nhận tin nhắn | Có | - |
| ID File | ID của file đã upload lên Zalo OA | Có | - |

### Ví dụ

1. Trước tiên, upload file bằng operation "Upload File"
2. Lấy ID file từ kết quả upload
3. Thêm node "Zalo OA" vào workflow
4. Chọn operation "Gửi Tin Nhắn File"
5. Cấu hình các tham số:
   - **Message Type**: cs
   - **User ID**: 123456789
   - **ID File**: abcdef123456 (ID file từ bước 2)
6. Chạy node để gửi tin nhắn file

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "message_id": "9gde8fea5a4d8d82c76h"
  }
}
```

### Lưu ý

- File phải được upload trước bằng operation "Upload File"
- Kích thước file không vượt quá 5MB
- Các định dạng file hỗ trợ: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX

## 4. Gửi tin nhắn danh sách

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Message Type | Loại tin nhắn | Có | cs (Customer Service) |
| User ID | ID của người nhận tin nhắn | Có | - |
| Tiêu Đề | Tiêu đề của tin nhắn danh sách | Có | - |
| Danh Sách Mục | Danh sách các mục trong tin nhắn | Có | - |

### Cấu trúc mục trong danh sách

Mỗi mục trong danh sách cần có các thông tin sau:

- **Tiêu Đề Mục**: Tiêu đề của mục
- **Mô Tả**: Mô tả ngắn của mục
- **URL Hình Ảnh**: URL hình ảnh minh họa cho mục
- **Default Action URL**: URL khi người dùng nhấp vào mục

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Gửi Tin Nhắn Danh Sách"
3. Cấu hình các tham số:
   - **Message Type**: cs
   - **User ID**: 123456789
   - **Tiêu Đề**: Sản phẩm nổi bật
   - **Danh Sách Mục**:
     - Mục 1:
       - **Tiêu Đề Mục**: Sản phẩm A
       - **Mô Tả**: Sản phẩm chất lượng cao
       - **URL Hình Ảnh**: https://example.com/productA.jpg
       - **Default Action URL**: https://example.com/products/A
     - Mục 2:
       - **Tiêu Đề Mục**: Sản phẩm B
       - **Mô Tả**: Giá tốt nhất thị trường
       - **URL Hình Ảnh**: https://example.com/productB.jpg
       - **Default Action URL**: https://example.com/products/B
4. Chạy node để gửi tin nhắn danh sách

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "message_id": "7hie8fea5a4d8d82d65j"
  }
}
```

### Lưu ý

- Tin nhắn danh sách có thể chứa tối đa 4 mục
- Mỗi mục nên có đầy đủ thông tin để tăng tính hấp dẫn
- URL hình ảnh phải là URL công khai và có định dạng JPG hoặc PNG

## Xử lý lỗi phổ biến

| Mã lỗi | Mô tả | Cách xử lý |
|--------|-------|------------|
| -201 | Thiếu tham số bắt buộc | Kiểm tra và cung cấp đầy đủ các tham số bắt buộc |
| -202 | Tham số không hợp lệ | Kiểm tra định dạng và giá trị của các tham số |
| -204 | Access Token không hợp lệ | Làm mới Access Token |
| -213 | Người dùng không theo dõi OA | Chỉ gửi tin nhắn cho người đang theo dõi OA |
| -214 | OA chưa gửi tin nhắn cho người dùng trong 24h | Chỉ áp dụng cho tin nhắn quảng cáo (promotion) |
| -215 | Nội dung tin nhắn vi phạm chính sách | Kiểm tra và điều chỉnh nội dung tin nhắn |
| -240 | API v2.0 đã bị tắt | Sử dụng API v3.0 |

## Ví dụ workflow hoàn chỉnh

### Gửi tin nhắn chào mừng khi có người theo dõi mới

1. Thêm node "Zalo OA Webhook" để lắng nghe sự kiện "follow"
2. Thêm node "Zalo OA" để gửi tin nhắn chào mừng
3. Cấu hình node "Zalo OA":
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: cs
   - **User ID**: {{$json.follower.id}}
   - **Text**: Xin chào! Cảm ơn bạn đã theo dõi OA của chúng tôi. Chúng tôi sẽ cập nhật các thông tin mới nhất đến bạn.

### Gửi tin nhắn xác nhận đơn hàng

1. Thêm node trigger (ví dụ: HTTP Request)
2. Thêm node "Zalo OA" để gửi tin nhắn xác nhận
3. Cấu hình node "Zalo OA":
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: transaction
   - **User ID**: {{$json.customer_zalo_id}}
   - **Text**: Đơn hàng #{{$json.order_id}} của bạn đã được xác nhận. Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi!
