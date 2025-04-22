# Hướng dẫn sử dụng node Zalo OA - Quản lý người dùng

## Giới thiệu

Node Zalo OA cung cấp các tính năng để quản lý người dùng theo dõi Official Account của bạn. Hướng dẫn này tập trung vào các operations liên quan đến quản lý người dùng.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền quản lý người dùng

## Các operations quản lý người dùng

Node Zalo OA hỗ trợ các operations sau để quản lý người dùng:

1. Lấy thông tin Official Account
2. Lấy thông tin người theo dõi
3. Lấy danh sách người theo dõi
4. Cập nhật thông tin người theo dõi

## 1. Lấy thông tin Official Account

Operation này cho phép bạn lấy thông tin chi tiết về Official Account của mình.

### Tham số

Operation này không yêu cầu tham số bổ sung.

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Thông Tin Official Account"
3. Chạy node để lấy thông tin OA

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "oa_id": "123456789",
    "name": "Tên Official Account",
    "description": "Mô tả về Official Account",
    "avatar": "https://zalo-api.com/avatar/oa_123456789.jpg",
    "cover": "https://zalo-api.com/cover/oa_123456789.jpg",
    "is_verified": true,
    "status": "active"
  }
}
```

### Lưu ý

- Đây là cách tốt để kiểm tra xác thực của bạn có hoạt động không
- Thông tin trả về bao gồm ID, tên, mô tả, avatar, ảnh bìa và trạng thái xác thực của OA

## 2. Lấy thông tin người theo dõi

Operation này cho phép bạn lấy thông tin chi tiết về một người theo dõi cụ thể.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| User ID | ID của người dùng cần lấy thông tin | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Thông Tin Người Theo Dõi"
3. Cấu hình tham số:
   - **User ID**: 123456789 (ID của người theo dõi)
4. Chạy node để lấy thông tin người theo dõi

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "user_id": "123456789",
    "display_name": "Nguyễn Văn A",
    "avatar": "https://zalo-api.com/avatar/user_123456789.jpg",
    "shared_info": {
      "name": "Nguyễn Văn A",
      "phone": "0901234567",
      "address": "123 Đường ABC, Quận XYZ, TP.HCM",
      "city": "Hồ Chí Minh",
      "email": "nguyenvana@example.com",
      "birthday": "1990-01-01"
    },
    "tags": [
      {
        "id": "tag1",
        "name": "Khách hàng VIP"
      },
      {
        "id": "tag2",
        "name": "Khách hàng mới"
      }
    ],
    "follow_time": 1609459200000
  }
}
```

### Lưu ý

- Thông tin `shared_info` chỉ hiển thị khi người dùng đã chia sẻ thông tin với OA
- Trường `tags` hiển thị các tag đã gán cho người dùng
- Trường `follow_time` là thời gian người dùng bắt đầu theo dõi OA (định dạng timestamp)

## 3. Lấy danh sách người theo dõi

Operation này cho phép bạn lấy danh sách người đang theo dõi Official Account của bạn.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Vị Trí Bắt Đầu | Vị trí bắt đầu lấy danh sách | Không | 0 |
| Số Lượng | Số lượng người theo dõi cần lấy | Không | 10 |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Danh Sách Người Theo Dõi"
3. Cấu hình các tham số:
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 20
4. Chạy node để lấy danh sách người theo dõi

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "total": 150,
    "followers": [
      {
        "user_id": "123456789",
        "display_name": "Nguyễn Văn A",
        "avatar": "https://zalo-api.com/avatar/user_123456789.jpg",
        "follow_time": 1609459200000
      },
      {
        "user_id": "987654321",
        "display_name": "Trần Thị B",
        "avatar": "https://zalo-api.com/avatar/user_987654321.jpg",
        "follow_time": 1609372800000
      },
      // ... các người theo dõi khác
    ]
  }
}
```

### Lưu ý

- Số lượng tối đa có thể lấy trong một lần gọi là 50
- Để lấy toàn bộ danh sách người theo dõi, bạn cần thực hiện nhiều lần gọi với các giá trị `Vị Trí Bắt Đầu` khác nhau
- Trường `total` cho biết tổng số người đang theo dõi OA
- API này sử dụng endpoint `user/getlist` trong Zalo OA API v3.0, thay thế cho endpoint `getfollowers` trong API v2.0

### Ví dụ lấy toàn bộ danh sách người theo dõi

Để lấy toàn bộ danh sách người theo dõi, bạn có thể sử dụng một workflow như sau:

1. Thêm node "Zalo OA" đầu tiên để lấy danh sách người theo dõi với:
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 50
2. Thêm node "Split In Batches" để xử lý phân trang
3. Thêm node "Loop" để lặp qua các trang
4. Trong mỗi vòng lặp, thêm node "Zalo OA" để lấy trang tiếp theo với:
   - **Vị Trí Bắt Đầu**: `{{$node["Split In Batches"].context.currentRunIndex * 50}}`
   - **Số Lượng**: 50
5. Thêm node "Merge" để kết hợp kết quả từ tất cả các trang

## 4. Cập nhật thông tin người theo dõi

Operation này cho phép bạn cập nhật thông tin của người theo dõi OA.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| User ID | ID của người dùng cần cập nhật thông tin | Có | - |
| Thông Tin | Loại thông tin cần cập nhật | Có | name |
| Giá Trị | Giá trị cập nhật | Có | - |

### Các loại thông tin có thể cập nhật

- **name**: Họ tên
- **phone**: Số điện thoại
- **email**: Địa chỉ email
- **address**: Địa chỉ
- **city**: Thành phố
- **birthday**: Ngày sinh (định dạng YYYY-MM-DD)

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Cập Nhật Thông Tin Người Theo Dõi"
3. Cấu hình các tham số:
   - **User ID**: 123456789
   - **Thông Tin**: name
   - **Giá Trị**: Nguyễn Văn A
4. Chạy node để cập nhật thông tin người theo dõi

### Kết quả

```json
{
  "error": 0,
  "message": "Success"
}
```

### Lưu ý

- Bạn chỉ có thể cập nhật thông tin mà người dùng đã chia sẻ với OA
- Mỗi lần chỉ có thể cập nhật một loại thông tin
- Đối với ngày sinh, sử dụng định dạng YYYY-MM-DD (ví dụ: 1990-01-01)
- Việc cập nhật thông tin người dùng giúp bạn duy trì cơ sở dữ liệu khách hàng chính xác

## Ví dụ workflow hoàn chỉnh

### Cập nhật thông tin người dùng khi họ gửi tin nhắn

1. Thêm node "Zalo OA Webhook" để lắng nghe sự kiện "user_send_text"
2. Thêm node "Zalo OA" để lấy thông tin người dùng:
   - **Operation**: Lấy Thông Tin Người Theo Dõi
   - **User ID**: {{$json.sender.id}}
3. Thêm node "IF" để kiểm tra xem người dùng đã có thông tin chưa
4. Nếu chưa có thông tin, thêm node "Zalo OA" để gửi tin nhắn yêu cầu thông tin:
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: cs
   - **User ID**: {{$json.sender.id}}
   - **Text**: Xin chào! Vui lòng chia sẻ thông tin của bạn để chúng tôi phục vụ tốt hơn.

### Phân loại người dùng theo thời gian theo dõi

1. Thêm node "Zalo OA" để lấy danh sách người theo dõi
2. Thêm node "Function" để phân loại người dùng:
   ```javascript
   const now = Date.now();
   const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
   
   const newFollowers = $input.json.data.followers.filter(f => f.follow_time > oneMonthAgo);
   const oldFollowers = $input.json.data.followers.filter(f => f.follow_time <= oneMonthAgo);
   
   return {
     newFollowers,
     oldFollowers
   };
   ```
3. Thêm các node xử lý tiếp theo cho từng nhóm người dùng
