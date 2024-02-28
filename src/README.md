//Tại sao POST lại bảo mật hơn GET:

- Get không an toàn bằng post vì truyền dữ liệu trên params nên có thể bookmark lại, có thể bị lưu trữ lại param trong lịch sử trình duyệt, bị lưu lại trên access logs của web server như apache, nginx


- Post an toàn hơn vì không truyền qua params, không bị bookmark, không lộ payload qua history, không bị ghi log payload trên logs của web server


// khi kết nối DB ra mảng trong thì xem lại uri trong file config 
- 'mongodb://localhost:27017/f8_educaiton_dev'

// sử dụng mongoose-sequence để tự động tăng _id cho mongodb 