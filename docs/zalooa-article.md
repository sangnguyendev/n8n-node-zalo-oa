# Hướng dẫn sử dụng node Zalo OA - Quản lý bài viết

## Giới thiệu

Node Zalo OA cung cấp các tính năng để quản lý bài viết trên Official Account của bạn. Hướng dẫn này tập trung vào các operations liên quan đến quản lý bài viết.

## Yêu cầu

- Đã thiết lập xác thực Zalo OA API (xem [Hướng dẫn thiết lập xác thực](./credentials.md))
- OA của bạn đã được xác thực và có quyền quản lý bài viết

## Các operations quản lý bài viết

Node Zalo OA hỗ trợ các operations sau để quản lý bài viết:

1. Tạo bài viết
2. Cập nhật bài viết
3. Xóa bài viết
4. Lấy danh sách bài viết
5. Lấy chi tiết bài viết
6. Chuẩn bị upload video
7. Xác thực video

## 1. Tạo bài viết

Operation này cho phép bạn tạo bài viết mới trên Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Tiêu Đề | Tiêu đề của bài viết | Có | - |
| Nội Dung | Nội dung của bài viết | Có | - |
| Tác Giả | Tên tác giả bài viết | Không | - |
| URL Ảnh Bìa | URL của ảnh bìa bài viết | Không | - |
| URL Ảnh Thumbnail | URL của ảnh thumbnail bài viết | Không | - |
| URL Video | URL của video trong bài viết | Không | - |
| Trạng Thái | Trạng thái của bài viết | Không | show |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Tạo Bài Viết"
3. Cấu hình các tham số:
   - **Tiêu Đề**: Hướng dẫn sử dụng sản phẩm mới
   - **Nội Dung**: Chúng tôi xin giới thiệu cách sử dụng sản phẩm mới nhất của chúng tôi...
   - **Tác Giả**: Phòng Marketing
   - **URL Ảnh Bìa**: https://example.com/cover.jpg
   - **URL Ảnh Thumbnail**: https://example.com/thumbnail.jpg
   - **Trạng Thái**: show
4. Chạy node để tạo bài viết

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "token": "abcdef123456",
    "id": "article123456",
    "create_date": 1609459200000,
    "update_date": 1609459200000,
    "status": "show"
  }
}
```

### Lưu ý

- Nội dung bài viết hỗ trợ định dạng HTML cơ bản
- Ảnh bìa và thumbnail nên có tỷ lệ phù hợp với yêu cầu của Zalo OA
- Trạng thái `show` nghĩa là bài viết được hiển thị công khai
- Trạng thái `hide` nghĩa là bài viết bị ẩn
- Token trả về rất quan trọng, cần lưu lại để sử dụng cho các operations khác

## 2. Cập nhật bài viết

Operation này cho phép bạn cập nhật thông tin của một bài viết đã tạo.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Token Bài Viết | Token của bài viết cần cập nhật | Có | - |
| Tiêu Đề Bài Viết | Tiêu đề mới của bài viết | Không | - |
| Mô Tả Bài Viết | Mô tả ngắn mới của bài viết | Không | - |
| Tác Giả | Tên tác giả mới của bài viết | Không | - |
| URL Ảnh Bìa | URL mới của ảnh bìa bài viết | Không | - |
| Nội Dung | Nội dung mới của bài viết | Không | - |
| Trạng Thái | Trạng thái mới của bài viết | Không | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Cập Nhật Bài Viết"
3. Cấu hình các tham số:
   - **Token Bài Viết**: abcdef123456
   - **Tiêu Đề Bài Viết**: Hướng dẫn sử dụng sản phẩm mới (cập nhật)
   - **Mô Tả Bài Viết**: Phiên bản cập nhật của hướng dẫn sử dụng
   - **Tác Giả**: Phòng Kỹ Thuật
   - **URL Ảnh Bìa**: https://example.com/new-cover.jpg
4. Chạy node để cập nhật bài viết

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "token": "abcdef123456",
    "update_date": 1609545600000
  }
}
```

### Lưu ý

- Bạn chỉ cần cung cấp các trường cần cập nhật, các trường khác sẽ giữ nguyên
- Token bài viết phải chính xác và bài viết phải tồn tại
- Trường `update_date` sẽ được cập nhật tự động

## 3. Xóa bài viết

Operation này cho phép bạn xóa một bài viết khỏi Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Token Bài Viết | Token của bài viết cần xóa | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Xóa Bài Viết"
3. Cấu hình tham số:
   - **Token Bài Viết**: abcdef123456
4. Chạy node để xóa bài viết

### Kết quả

```json
{
  "error": 0,
  "message": "Success"
}
```

### Lưu ý

- Hành động xóa bài viết là không thể hoàn tác
- Nếu bài viết không tồn tại, API vẫn có thể trả về thành công
- Sau khi xóa, token bài viết sẽ không còn hợp lệ

## 4. Lấy danh sách bài viết

Operation này cho phép bạn lấy danh sách các bài viết của Official Account.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Vị Trí Bắt Đầu | Vị trí bắt đầu lấy danh sách | Không | 0 |
| Số Lượng | Số lượng bài viết cần lấy | Không | 10 |
| Trạng Thái | Trạng thái bài viết cần lấy | Không | show |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Danh Sách Bài Viết"
3. Cấu hình các tham số:
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 20
   - **Trạng Thái**: show
4. Chạy node để lấy danh sách bài viết

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "total": 45,
    "medias": [
      {
        "id": "article123456",
        "token": "abcdef123456",
        "type": "normal",
        "title": "Hướng dẫn sử dụng sản phẩm mới",
        "description": "Chúng tôi xin giới thiệu cách sử dụng sản phẩm mới nhất của chúng tôi...",
        "thumb": "https://zalo-api.com/images/thumbnail123456.jpg",
        "cover": "https://zalo-api.com/images/cover123456.jpg",
        "author": "Phòng Marketing",
        "status": "show",
        "create_date": 1609459200000,
        "update_date": 1609545600000,
        "total_view": 1250,
        "total_share": 45
      },
      {
        "id": "article789012",
        "token": "ghijkl789012",
        "type": "video",
        "title": "Video hướng dẫn lắp đặt",
        "description": "Video chi tiết hướng dẫn lắp đặt sản phẩm...",
        "thumb": "https://zalo-api.com/images/thumbnail789012.jpg",
        "cover": "https://zalo-api.com/images/cover789012.jpg",
        "author": "Phòng Kỹ Thuật",
        "status": "show",
        "create_date": 1609372800000,
        "update_date": 1609372800000,
        "total_view": 2500,
        "total_share": 120,
        "video": {
          "url": "https://zalo-api.com/videos/video789012.mp4",
          "duration": 180
        }
      },
      // ... các bài viết khác
    ]
  }
}
```

### Lưu ý

- Số lượng tối đa có thể lấy trong một lần gọi là 50
- Để lấy toàn bộ danh sách bài viết, bạn cần thực hiện nhiều lần gọi với các giá trị `Vị Trí Bắt Đầu` khác nhau
- Trường `type` cho biết loại bài viết (normal, video)
- Trường `total_view` và `total_share` cho biết số lượt xem và chia sẻ bài viết

## 5. Lấy chi tiết bài viết

Operation này cho phép bạn lấy thông tin chi tiết của một bài viết cụ thể.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Token Bài Viết | Token của bài viết cần lấy chi tiết | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Lấy Chi Tiết Bài Viết"
3. Cấu hình tham số:
   - **Token Bài Viết**: abcdef123456
4. Chạy node để lấy chi tiết bài viết

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "id": "article123456",
    "token": "abcdef123456",
    "type": "normal",
    "title": "Hướng dẫn sử dụng sản phẩm mới",
    "description": "Chúng tôi xin giới thiệu cách sử dụng sản phẩm mới nhất của chúng tôi...",
    "content": "<p>Nội dung chi tiết của bài viết...</p><p>Hướng dẫn từng bước...</p>",
    "thumb": "https://zalo-api.com/images/thumbnail123456.jpg",
    "cover": "https://zalo-api.com/images/cover123456.jpg",
    "author": "Phòng Marketing",
    "status": "show",
    "create_date": 1609459200000,
    "update_date": 1609545600000,
    "total_view": 1250,
    "total_share": 45,
    "related_medias": [
      {
        "id": "article789012",
        "token": "ghijkl789012",
        "title": "Video hướng dẫn lắp đặt",
        "thumb": "https://zalo-api.com/images/thumbnail789012.jpg"
      }
    ]
  }
}
```

### Lưu ý

- Kết quả trả về bao gồm nội dung đầy đủ của bài viết
- Trường `related_medias` chứa danh sách các bài viết liên quan
- Trường `content` chứa nội dung HTML của bài viết

## 6. Chuẩn bị upload video

Operation này cho phép bạn chuẩn bị upload video cho bài viết.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Tên Video | Tên của video cần upload | Có | - |
| Kích Thước Video (byte) | Kích thước của video tính bằng byte | Có | - |

### Ví dụ

1. Thêm node "Zalo OA" vào workflow
2. Chọn operation "Chuẩn Bị Upload Video"
3. Cấu hình các tham số:
   - **Tên Video**: product_demo.mp4
   - **Kích Thước Video (byte)**: 10485760 (10MB)
4. Chạy node để chuẩn bị upload video

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "upload_url": "https://zalo-api.com/upload/video/abcdef123456",
    "token": "video_token_123456",
    "expires": 3600
  }
}
```

### Lưu ý

- Kết quả trả về bao gồm URL để upload video và token
- Token video có thời hạn sử dụng (thường là 1 giờ)
- Sau khi nhận được URL upload, bạn cần upload video lên URL này
- Kích thước video tối đa là 100MB

## 7. Xác thực video

Operation này cho phép bạn xác thực video đã upload.

### Tham số

| Tham số | Mô tả | Bắt buộc | Giá trị mặc định |
|---------|-------|----------|-----------------|
| Token Video | Token của video cần xác thực | Có | - |

### Ví dụ

1. Thêm node "HTTP Request" để upload video lên URL từ bước "Chuẩn Bị Upload Video"
2. Thêm node "Zalo OA" vào workflow
3. Chọn operation "Xác Thực Video"
4. Cấu hình tham số:
   - **Token Video**: video_token_123456
5. Chạy node để xác thực video

### Kết quả

```json
{
  "error": 0,
  "message": "Success",
  "data": {
    "video_id": "video123456",
    "thumbnail": "https://zalo-api.com/images/video_thumbnail123456.jpg",
    "url": "https://zalo-api.com/videos/video123456.mp4",
    "duration": 180
  }
}
```

### Lưu ý

- Kết quả trả về bao gồm ID video, thumbnail, URL và thời lượng
- Video ID có thể được sử dụng khi tạo hoặc cập nhật bài viết
- Quá trình xác thực có thể mất một chút thời gian
- Nếu video chưa được xử lý xong, API có thể trả về lỗi

## Ví dụ workflow hoàn chỉnh

### Tạo bài viết với video

1. Thêm node trigger (ví dụ: HTTP Request) để nhận yêu cầu tạo bài viết
2. Thêm node "Zalo OA" để chuẩn bị upload video:
   - **Operation**: Chuẩn Bị Upload Video
   - **Tên Video**: {{$json.video_name}}
   - **Kích Thước Video (byte)**: {{$json.video_size}}
3. Thêm node "HTTP Request" để upload video:
   - **Method**: PUT
   - **URL**: {{$node["Zalo OA"].json.data.upload_url}}
   - **Binary Data**: true
   - **Binary Property Name**: data
4. Thêm node "Zalo OA" để xác thực video:
   - **Operation**: Xác Thực Video
   - **Token Video**: {{$node["Zalo OA"].json.data.token}}
5. Thêm node "Zalo OA" để tạo bài viết với video:
   - **Operation**: Tạo Bài Viết
   - **Tiêu Đề**: {{$json.title}}
   - **Nội Dung**: {{$json.content}}
   - **Tác Giả**: {{$json.author}}
   - **URL Ảnh Bìa**: {{$node["Zalo OA1"].json.data.thumbnail}}
   - **URL Video**: {{$node["Zalo OA1"].json.data.url}}

### Tự động cập nhật trạng thái bài viết

1. Thêm node "Schedule" để chạy hàng ngày
2. Thêm node "Zalo OA" để lấy danh sách bài viết:
   - **Operation**: Lấy Danh Sách Bài Viết
   - **Vị Trí Bắt Đầu**: 0
   - **Số Lượng**: 50
   - **Trạng Thái**: show
3. Thêm node "Function" để lọc bài viết cũ:
   ```javascript
   const now = Date.now();
   const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
   
   return $input.json.data.medias.filter(article => article.create_date < oneMonthAgo);
   ```
4. Thêm node "Split In Batches" để xử lý từng bài viết
5. Thêm node "Zalo OA" để cập nhật trạng thái bài viết:
   - **Operation**: Cập Nhật Bài Viết
   - **Token Bài Viết**: {{$json.token}}
   - **Trạng Thái**: hide
