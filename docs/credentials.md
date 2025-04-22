# Hướng dẫn thiết lập xác thực Zalo OA API

## Giới thiệu

Để sử dụng các node Zalo OA trong n8n, bạn cần thiết lập thông tin xác thực (credentials) cho Zalo OA API. Hướng dẫn này sẽ giúp bạn lấy các thông tin cần thiết và cấu hình trong n8n.

## Các thông tin cần thiết

Để thiết lập xác thực Zalo OA API, bạn cần các thông tin sau:

1. **App ID**: ID của ứng dụng Zalo OA
2. **Secret Key**: Khóa bí mật của ứng dụng
3. **Access Token**: Token truy cập Zalo OA API
4. **Refresh Token**: Token để làm mới Access Token khi hết hạn

## Các bước thiết lập

### Bước 1: Tạo Zalo Official Account

1. Truy cập [Zalo Business](https://business.zalo.me/)
2. Đăng nhập bằng tài khoản Zalo của bạn
3. Tạo Official Account mới hoặc sử dụng OA đã có

### Bước 2: Đăng ký ứng dụng trên Zalo Developers

1. Truy cập [Zalo Developers](https://developers.zalo.me/)
2. Đăng nhập bằng tài khoản Zalo của bạn
3. Chọn "Quản lý ứng dụng" > "Tạo ứng dụng mới"
4. Chọn loại ứng dụng là "Official Account"
5. Điền thông tin ứng dụng và liên kết với OA của bạn
6. Sau khi tạo xong, bạn sẽ nhận được **App ID** và **Secret Key**

### Bước 3: Lấy Access Token

1. Trong trang quản lý ứng dụng, chọn ứng dụng của bạn
2. Chọn mục "Official Account API" > "Lấy Access Token"
3. Chọn OA của bạn và các quyền cần thiết
4. Nhấn "Lấy Access Token"
5. Hệ thống sẽ cung cấp cho bạn **Access Token** và **Refresh Token**

### Bước 4: Thiết lập trong n8n

1. Trong n8n, mở menu "Credentials" và chọn "New"
2. Tìm và chọn "Zalo OA API"
3. Điền các thông tin:
   - **App ID**: ID ứng dụng từ Zalo Developers
   - **Secret Key**: Khóa bí mật từ Zalo Developers
   - **Access Token**: Token truy cập từ bước 3
   - **Refresh Token**: Token làm mới từ bước 3
4. Nhấn "Save" để lưu thông tin xác thực

## Lưu ý quan trọng

- **Access Token** có thời hạn sử dụng (thường là 1 tháng), sau đó cần được làm mới
- Để làm mới Access Token, bạn có thể sử dụng Refresh Token hoặc lấy lại từ trang Zalo Developers
- Đảm bảo ứng dụng của bạn có đủ quyền truy cập các API cần thiết
- Nếu gặp lỗi xác thực, hãy kiểm tra lại Access Token và các quyền của ứng dụng

## Kiểm tra xác thực

Sau khi thiết lập xong, bạn có thể kiểm tra xác thực bằng cách:

1. Tạo một workflow mới trong n8n
2. Thêm node "Zalo OA"
3. Chọn credentials vừa tạo
4. Chọn operation "Lấy Thông Tin Official Account"
5. Chạy workflow để kiểm tra kết nối

Nếu kết quả trả về thông tin của OA, xác thực đã được thiết lập thành công.
