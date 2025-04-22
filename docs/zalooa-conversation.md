# Hướng dẫn sử dụng node Zalo OA - Quản lý hội thoại

## Giới thiệu

Node Zalo OA cung cấp các tính năng để quản lý hội thoại giữa Official Account và người dùng. Hướng dẫn này tập trung vào các operations liên quan đến quản lý hội thoại.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền quản lý hội thoại

## Các operations quản lý hội thoại

Node Zalo OA hỗ trợ các operations sau để quản lý hội thoại:

1. Lấy danh sách cuộc trò chuyện gần đây
2. Lấy lịch sử hội thoại
3. Kiểm tra trạng thái tin nhắn

## 1. Lấy danh sách cuộc trò chuyện gần đây

Operation này cho phép bạn lấy danh sách các cuộc trò chuyện gần đây của Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Vị Trí Bắt Đầu | Vị trí bắt đầu lấy danh sách | Không | 0 |
| Số Lượng | Số lượng cuộc trò chuyện cần lấy | Không | 10 |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Danh Sách Cuộc Trò Chuyện Gần Đây"
3. Cấu hình các tham số:
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 10
4. Chạy node để lấy danh sách cuộc trò chuyện

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "total": 45,
    "conversations": [
      {
        "user_id": "123456789",
        "display_name": "Nguyễn Văn A",
        "avatar": "https://zalo-api.com/avatar/user_123456789.jpg",
        "last_message": {
          "msg_id": "abcdef123456",
          "msg_type": "text",
          "sender_id": "123456789",
          "content": "Xin chào, tôi cần hỗ trợ",
          "time": 1609459200000
        },
        "unread": 1
      },
      {
        "user_id": "987654321",
        "display_name": "Trần Thị B",
        "avatar": "https://zalo-api.com/avatar/user_987654321.jpg",
        "last_message": {
          "msg_id": "ghijkl789012",
          "msg_type": "text",
          "sender_id": "oa_123456",
          "content": "Chúng tôi sẽ liên hệ lại với bạn",
          "time": 1609372800000
        },
        "unread": 0
      },
      // ... các cuộc trò chuyện khác
    ]
  }
}
```

### Lưu ý

- Số lượng tối đa có thể lấy trong một lần gọi là 10
- Để lấy toàn bộ danh sách cuộc trò chuyện, bạn cần thực hiện nhiều lần gọi với các giá trị `Vị Trí Bắt Đầu` khác nhau
- Trường `unread` cho biết số lượng tin nhắn chưa đọc trong cuộc trò chuyện
- API này hiện đang sử dụng endpoint `listrecentchat` trong Zalo OA API v2.0, vì API v3.0 chưa có tài liệu cho chức năng này

## 2. Lấy lịch sử hội thoại

Operation này cho phép bạn lấy lịch sử hội thoại với một người dùng cụ thể.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| User ID | ID của người dùng cần lấy lịch sử hội thoại | Có | - |
| Vị Trí Bắt Đầu | Vị trí bắt đầu lấy tin nhắn | Không | 0 |
| Số Lượng | Số lượng tin nhắn cần lấy | Không | 10 |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Lịch Sử Hội Thoại"
3. Cấu hình các tham số:
   - **User ID**: 123456789
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 10
4. Chạy node để lấy lịch sử hội thoại

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "total": 25,
    "messages": [
      {
        "msg_id": "abcdef123456",
        "msg_type": "text",
        "sender_id": "123456789",
        "content": "Xin chào, tôi cần hỗ trợ",
        "time": 1609459200000
      },
      {
        "msg_id": "ghijkl789012",
        "msg_type": "text",
        "sender_id": "oa_123456",
        "content": "Chào bạn, chúng tôi có thể giúp gì cho bạn?",
        "time": 1609459260000
      },
      {
        "msg_id": "mnopqr345678",
        "msg_type": "image",
        "sender_id": "123456789",
        "content": {
          "url": "https://zalo-api.com/images/product.jpg"
        },
        "time": 1609459320000
      },
      // ... các tin nhắn khác
    ]
  }
}
```

### Lưu ý

- Số lượng tối đa có thể lấy trong một lần gọi là 10
- Để lấy toàn bộ lịch sử hội thoại, bạn cần thực hiện nhiều lần gọi với các giá trị `Vị Trí Bắt Đầu` khác nhau
- Tin nhắn được sắp xếp theo thời gian, với tin nhắn mới nhất ở đầu danh sách
- Trường `sender_id` cho biết người gửi tin nhắn (ID người dùng hoặc ID của OA)
- Trường `msg_type` cho biết loại tin nhắn (text, image, file, ...)
- API này hiện đang sử dụng endpoint `conversation` trong Zalo OA API v2.0, vì API v3.0 chưa có tài liệu cho chức năng này

## 3. Kiểm tra trạng thái tin nhắn

Operation này cho phép bạn kiểm tra trạng thái của một tin nhắn đã gửi.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Message ID | ID của tin nhắn cần kiểm tra trạng thái | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Kiểm Tra Trạng Thái Tin Nhắn"
3. Cấu hình tham số:
   - **Message ID**: abcdef123456 (ID tin nhắn từ kết quả gửi tin nhắn)
4. Chạy node để kiểm tra trạng thái tin nhắn

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "message_id": "abcdef123456",
    "user_id": "123456789",
    "status": "delivered",
    "delivered_time": 1609459260000,
    "read_time": 1609459320000
  }
}
```

### Các trạng thái tin nhắn

- **sent**: Tin nhắn đã được gửi thành công
- **delivered**: Tin nhắn đã được gửi đến thiết bị của người nhận
- **read**: Tin nhắn đã được người nhận đọc
- **failed**: Tin nhắn gửi thất bại

### Lưu ý

- Bạn cần lưu lại Message ID khi gửi tin nhắn để có thể kiểm tra trạng thái sau này
- Trường `delivered_time` và `read_time` chỉ xuất hiện khi tin nhắn đã được gửi đến hoặc đã được đọc
- API này hiện đang sử dụng endpoint `message/status` trong Zalo OA API v2.0, vì API v3.0 chưa có tài liệu cho chức năng này

## Ví dụ workflow hoàn chỉnh

### Theo dõi trạng thái tin nhắn quan trọng

1. Thêm node trigger (ví dụ: HTTP Request) để nhận yêu cầu gửi tin nhắn
2. Thêm node "Zalo OA" để gửi tin nhắn:
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: transaction
   - **User ID**: {{$json.user_id}}
   - **Text**: {{$json.message}}
3. Thêm node "Wait" để đợi một khoảng thời gian (ví dụ: 1 phút)
4. Thêm node "Zalo OA" để kiểm tra trạng thái tin nhắn:
   - **Operation**: Kiểm Tra Trạng Thái Tin Nhắn
   - **Message ID**: {{$node["Zalo OA"].json.data.message_id}}
5. Thêm node "IF" để kiểm tra trạng thái:
   - Nếu `status` là "read", ghi log "Tin nhắn đã được đọc"
   - Nếu `status` là "delivered" nhưng chưa "read", gửi thông báo nhắc nhở
   - Nếu `status` là "failed", thử gửi lại tin nhắn

### Tự động trả lời tin nhắn

1. Thêm node "Zalo OA Webhook" để lắng nghe sự kiện "user_send_text"
2. Thêm node "Zalo OA" để lấy lịch sử hội thoại:
   - **Operation**: Lấy Lịch Sử Hội Thoại
   - **User ID**: {{$json.sender.id}}
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 5
3. Thêm node "Function" để phân tích nội dung tin nhắn và chuẩn bị phản hồi
4. Thêm node "Zalo OA" để gửi tin nhắn phản hồi:
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: cs
   - **User ID**: {{$json.sender.id}}
   - **Text**: {{$node["Function"].json.reply}}
