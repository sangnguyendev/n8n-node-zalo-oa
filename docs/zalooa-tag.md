# Hướng dẫn sử dụng node Zalo OA - Quản lý tag

## Giới thiệu

Node Zalo OA cung cấp các tính năng để quản lý tag cho người theo dõi Official Account của bạn. Hướng dẫn này tập trung vào các operations liên quan đến quản lý tag.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền quản lý tag

## Các operations quản lý tag

Node Zalo OA hỗ trợ các operations sau để quản lý tag:

1. Lấy danh sách tag
2. Gán tag cho người theo dõi
3. Xóa tag
4. Xóa người theo dõi khỏi tag

## 1. Lấy danh sách tag

Operation này cho phép bạn lấy danh sách tất cả các tag của Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Vị Trí Bắt Đầu | Vị trí bắt đầu lấy danh sách | Không | 0 |
| Số Lượng | Số lượng tag cần lấy | Không | 10 |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Danh Sách Tag"
3. Cấu hình các tham số:
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 50
4. Chạy node để lấy danh sách tag

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "total": 15,
    "tags": [
      {
        "id": "tag1",
        "name": "Khách hàng VIP",
        "user_count": 120,
        "create_date": 1609459200000
      },
      {
        "id": "tag2",
        "name": "Khách hàng mới",
        "user_count": 350,
        "create_date": 1609372800000
      },
      {
        "id": "tag3",
        "name": "Đã mua hàng",
        "user_count": 230,
        "create_date": 1609286400000
      },
      // ... các tag khác
    ]
  }
}
```

### Lưu ý

- Số lượng tối đa có thể lấy trong một lần gọi là 50
- Để lấy toàn bộ danh sách tag, bạn cần thực hiện nhiều lần gọi với các giá trị `Vị Trí Bắt Đầu` khác nhau
- Trường `user_count` cho biết số lượng người dùng được gán tag
- Trường `create_date` là thời gian tạo tag (định dạng timestamp)
- API này sẽ thử gọi API v3.0 trước, nếu thất bại sẽ thử lại với API v2.0

## 2. Gán tag cho người theo dõi

Operation này cho phép bạn gán tag cho một người theo dõi cụ thể.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| User ID | ID của người dùng cần gán tag | Có | - |
| Tag ID | ID của tag cần gán | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Gán Tag Cho Người Theo Dõi"
3. Cấu hình các tham số:
   - **User ID**: 123456789
   - **Tag ID**: tag1
4. Chạy node để gán tag cho người theo dõi

### Kết quả

```json
{
  "error": 0,
  "message": "Success"
}
```

### Lưu ý

- Người dùng phải đang theo dõi OA của bạn
- Tag phải tồn tại trong danh sách tag của OA
- Một người dùng có thể được gán nhiều tag khác nhau
- Nếu người dùng đã có tag này, API vẫn trả về thành công
- Số lượng tag tối đa cho một OA là 1000
- Số lượng tag tối đa cho một người dùng là 50

## 3. Xóa tag

Operation này cho phép bạn xóa một tag khỏi Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Tag ID | ID của tag cần xóa | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Xóa Tag"
3. Cấu hình tham số:
   - **Tag ID**: tag3
4. Chạy node để xóa tag

### Kết quả

```json
{
  "error": 0,
  "message": "Success"
}
```

### Lưu ý

- Khi xóa tag, tất cả người dùng được gán tag này sẽ không còn tag này nữa
- Hành động này không thể hoàn tác, hãy cẩn thận khi xóa tag
- Nếu tag không tồn tại, API vẫn có thể trả về thành công

## 4. Xóa người theo dõi khỏi tag

Operation này cho phép bạn xóa một người theo dõi khỏi một tag cụ thể.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| User ID | ID của người dùng cần xóa khỏi tag | Có | - |
| Tag ID | ID của tag cần xóa người dùng | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Xóa Người Theo Dõi Khỏi Tag"
3. Cấu hình các tham số:
   - **User ID**: 123456789
   - **Tag ID**: tag1
4. Chạy node để xóa người theo dõi khỏi tag

### Kết quả

```json
{
  "error": 0,
  "message": "Success"
}
```

### Lưu ý

- Nếu người dùng không có tag này, API vẫn trả về thành công
- Hành động này chỉ xóa mối quan hệ giữa người dùng và tag, không xóa tag hoặc người dùng
- Bạn có thể gán lại tag cho người dùng sau khi đã xóa

## Ví dụ workflow hoàn chỉnh

### Phân loại người dùng mới theo khu vực

1. Thêm node "Zalo OA Webhook" để lắng nghe sự kiện "follow"
2. Thêm node "Zalo OA" để lấy thông tin người theo dõi:
   - **Operation**: Lấy Thông Tin Người Theo Dõi
   - **User ID**: {{$json.follower.id}}
3. Thêm node "IF" để kiểm tra thông tin thành phố:
   ```javascript
   return $input.json.data.shared_info && $input.json.data.shared_info.city;
   ```
4. Nếu có thông tin thành phố, thêm node "Switch" để phân loại theo thành phố:
   ```javascript
   return $input.json.data.shared_info.city;
   ```
   - Case "Hồ Chí Minh": Thêm node "Zalo OA" để gán tag "HCM"
   - Case "Hà Nội": Thêm node "Zalo OA" để gán tag "HN"
   - Default: Thêm node "Zalo OA" để gán tag "Khác"
5. Thêm node "Zalo OA" để gửi tin nhắn chào mừng theo khu vực

### Gửi tin nhắn theo tag

1. Thêm node trigger (ví dụ: Schedule) để chạy hàng ngày
2. Thêm node "Zalo OA" để lấy danh sách tag:
   - **Operation**: Lấy Danh Sách Tag
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 50
3. Thêm node "Function" để lọc tag cần gửi tin nhắn:
   ```javascript
   return $input.json.data.tags.filter(tag => tag.name === "Khách hàng VIP");
   ```
4. Thêm node "HTTP Request" để lấy danh sách người dùng có tag (API riêng của bạn)
5. Thêm node "Split In Batches" để xử lý từng người dùng
6. Thêm node "Zalo OA" để gửi tin nhắn cho từng người dùng:
   - **Operation**: Gửi Tin Nhắn Văn Bản
   - **Message Type**: cs
   - **User ID**: {{$json.user_id}}
   - **Text**: Xin chào quý khách VIP! Chúng tôi có ưu đãi đặc biệt dành riêng cho bạn.

### Tự động gán tag dựa trên hành vi người dùng

1. Thêm node "Zalo OA Webhook" để lắng nghe sự kiện "user_send_text"
2. Thêm node "Function" để phân tích nội dung tin nhắn:
   ```javascript
   const message = $input.json.message.text.toLowerCase();
   const tags = [];
   
   if (message.includes("mua") || message.includes("đặt hàng")) {
     tags.push("quan-tam-mua-hang");
   }
   
   if (message.includes("giá") || message.includes("bao nhiêu")) {
     tags.push("hoi-gia");
   }
   
   if (message.includes("khuyến mãi") || message.includes("giảm giá")) {
     tags.push("quan-tam-khuyen-mai");
   }
   
   return { tags, user_id: $input.json.sender.id };
   ```
3. Thêm node "Split In Batches" để xử lý từng tag
4. Thêm node "Zalo OA" để gán tag cho người dùng:
   - **Operation**: Gán Tag Cho Người Theo Dõi
   - **User ID**: {{$json.user_id}}
   - **Tag ID**: {{$json.item}}
