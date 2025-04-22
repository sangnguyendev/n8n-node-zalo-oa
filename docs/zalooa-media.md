# Hướng dẫn sử dụng node Zalo OA - Quản lý media

## Giới thiệu

Node Zalo OA cung cấp các tính năng để quản lý media (hình ảnh, file, GIF) cho Official Account của bạn. Hướng dẫn này tập trung vào các operations liên quan đến quản lý media.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền quản lý media

## Các operations quản lý media

Node Zalo OA hỗ trợ các operations sau để quản lý media:

1. Upload hình ảnh
2. Upload hình ảnh GIF
3. Upload file

## 1. Upload hình ảnh

Operation này cho phép bạn upload hình ảnh lên Zalo OA để sử dụng trong các tin nhắn.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Binary Data | Sử dụng dữ liệu binary | Không | false |
| Binary Property | Tên của binary property chứa dữ liệu hình ảnh | Có (nếu Binary Data = true) | data |
| URL Hình Ảnh | URL của hình ảnh cần upload | Có (nếu Binary Data = false) | - |

### Ví dụ 1: Upload từ URL

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Upload Hình Ảnh"
3. Cấu hình các tham số:
   - **Binary Data**: false
   - **URL Hình Ảnh**: https://example.com/image.jpg
4. Chạy node để upload hình ảnh

### Ví dụ 2: Upload từ binary data

1. Thêm node "HTTP Request" để tải hình ảnh:
   - **URL**: https://example.com/image.jpg
   - **Response Format**: File
   - **Binary Property**: data
2. Thêm node "Zalo OA" vào workflow
3. Chọn operation "Upload Hình Ảnh"
4. Cấu hình các tham số:
   - **Binary Data**: true
   - **Binary Property**: data
5. Chạy workflow để upload hình ảnh

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "image_id": "abcdef123456",
    "image_url": "https://zalo-api.com/images/abcdef123456.jpg"
  }
}
```

### Lưu ý

- Hình ảnh phải có định dạng JPG, PNG hoặc GIF
- Kích thước hình ảnh không vượt quá 1MB
- ID hình ảnh trả về có thể được sử dụng trong operation "Gửi Tin Nhắn Hình Ảnh"
- Hình ảnh đã upload sẽ được lưu trữ trên máy chủ của Zalo OA
- Nếu bạn thường xuyên gửi cùng một hình ảnh, nên upload một lần và sử dụng lại ID

## 2. Upload hình ảnh GIF

Operation này cho phép bạn upload hình ảnh GIF lên Zalo OA để sử dụng trong các tin nhắn.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Binary Data | Sử dụng dữ liệu binary | Không | false |
| Binary Property | Tên của binary property chứa dữ liệu GIF | Có (nếu Binary Data = true) | data |
| URL Hình Ảnh GIF | URL của hình ảnh GIF cần upload | Có (nếu Binary Data = false) | - |

### Ví dụ 1: Upload từ URL

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Upload Hình Ảnh GIF"
3. Cấu hình các tham số:
   - **Binary Data**: false
   - **URL Hình Ảnh GIF**: https://example.com/animation.gif
4. Chạy node để upload hình ảnh GIF

### Ví dụ 2: Upload từ binary data

1. Thêm node "HTTP Request" để tải hình ảnh GIF:
   - **URL**: https://example.com/animation.gif
   - **Response Format**: File
   - **Binary Property**: data
2. Thêm node "Zalo OA" vào workflow
3. Chọn operation "Upload Hình Ảnh GIF"
4. Cấu hình các tham số:
   - **Binary Data**: true
   - **Binary Property**: data
5. Chạy workflow để upload hình ảnh GIF

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "attachment_id": "ghijkl789012",
    "attachment_url": "https://zalo-api.com/images/ghijkl789012.gif"
  }
}
```

### Lưu ý

- Hình ảnh phải có định dạng GIF
- Kích thước hình ảnh GIF không vượt quá 5MB
- ID hình ảnh GIF trả về có thể được sử dụng trong các tin nhắn
- Hình ảnh GIF đã upload sẽ được lưu trữ trên máy chủ của Zalo OA
- Zalo OA có giới hạn về số lượng hình ảnh GIF có thể upload trong một ngày

## 3. Upload file

Operation này cho phép bạn upload file lên Zalo OA để sử dụng trong các tin nhắn.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Binary Data | Sử dụng dữ liệu binary | Không | false |
| Binary Property | Tên của binary property chứa dữ liệu file | Có (nếu Binary Data = true) | data |
| URL File | URL của file cần upload | Có (nếu Binary Data = false) | - |

### Ví dụ 1: Upload từ URL

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Upload File"
3. Cấu hình các tham số:
   - **Binary Data**: false
   - **URL File**: https://example.com/document.pdf
4. Chạy node để upload file

### Ví dụ 2: Upload từ binary data

1. Thêm node "HTTP Request" để tải file:
   - **URL**: https://example.com/document.pdf
   - **Response Format**: File
   - **Binary Property**: data
2. Thêm node "Zalo OA" vào workflow
3. Chọn operation "Upload File"
4. Cấu hình các tham số:
   - **Binary Data**: true
   - **Binary Property**: data
5. Chạy workflow để upload file

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "file_id": "mnopqr345678",
    "file_name": "document.pdf",
    "file_size": 1024000,
    "file_type": "application/pdf"
  }
}
```

### Lưu ý

- Các định dạng file hỗ trợ: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- Kích thước file không vượt quá 5MB
- ID file trả về có thể được sử dụng trong operation "Gửi Tin Nhắn File"
- File đã upload sẽ được lưu trữ trên máy chủ của Zalo OA
- Zalo OA có giới hạn về số lượng file có thể upload trong một ngày

## Ví dụ workflow hoàn chỉnh

### Gửi tin nhắn hình ảnh từ URL

1. Thêm node trigger (ví dụ: HTTP Request) để nhận yêu cầu gửi hình ảnh
2. Thêm node "Zalo OA" để upload hình ảnh:
   - **Operation**: Upload Hình Ảnh
   - **Binary Data**: false
   - **URL Hình Ảnh**: {{$json.image_url}}
3. Thêm node "Zalo OA" để gửi tin nhắn hình ảnh:
   - **Operation**: Gửi Tin Nhắn Hình Ảnh
   - **Message Type**: cs
   - **User ID**: {{$json.user_id}}
   - **Loại Hình Ảnh**: imageId
   - **ID Hình Ảnh**: {{$node["Zalo OA"].json.data.image_id}}

### Gửi tài liệu PDF cho người dùng

1. Thêm node "Read Binary File" để đọc file PDF từ hệ thống:
   - **File Path**: /path/to/document.pdf
   - **Property Name**: data
2. Thêm node "Zalo OA" để upload file:
   - **Operation**: Upload File
   - **Binary Data**: true
   - **Binary Property**: data
3. Thêm node "Zalo OA" để gửi tin nhắn file:
   - **Operation**: Gửi Tin Nhắn File
   - **Message Type**: cs
   - **User ID**: {{$json.user_id}}
   - **ID File**: {{$node["Zalo OA"].json.data.file_id}}

### Tạo thư viện hình ảnh cho OA

1. Thêm node "Read Binary Files" để đọc nhiều hình ảnh từ thư mục:
   - **Source Directory**: /path/to/images
   - **Property Name**: data
2. Thêm node "Split In Batches" để xử lý từng hình ảnh
3. Thêm node "Zalo OA" để upload hình ảnh:
   - **Operation**: Upload Hình Ảnh
   - **Binary Data**: true
   - **Binary Property**: data
4. Thêm node "Set" để lưu thông tin hình ảnh:
   ```javascript
   return {
     image_library: {
       ...($input.json.image_library || {}),
       [$input.binary.data.fileName]: $node["Zalo OA"].json.data.image_id
     }
   };
   ```
5. Thêm node "Merge" để kết hợp kết quả từ tất cả các hình ảnh
