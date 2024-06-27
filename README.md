# EdenBeta

**req.**
- Docker install

**command.**
- docker login
- docker pull <ชื่อใหม่ของ image>
  - example : docker pull adosdata/edenweb-image
- docker images
- docker build . -t <"imagename">
  - example : docker build . -t edenweb-image
- docker run ['OPTIONS'] IMAGE ['COMMAND'] ['ARG...']
  - example : docker run -it --rm -p 3002:3000 --name react-test-app edenweb-image
    - `-it`: เปิด terminal interactive เพื่อให้ผู้ใช้สามารถป้อนคำสั่งใน container ได้
    - `--rm`: ลบ container เมื่อหยุดรัน
    - `-p 3002:3000`: แมปพอร์ต 3000 ของ container ไปยังพอร์ต 3002 ของเครื่อง host
    - `--name react-test-app`: กำหนดชื่อของ container ให้เป็น react-test-app
    - `edenweb-image`: Docker image ที่ใช้ในการสร้าง container
- docker tag <ชื่อเดิมของ image>:<เวอร์ชัน> <ชื่อใหม่ของ image>:<เวอร์ชัน>
  - example : docker tag edenweb-image:latest adosdata/edenweb-image:latest
- docker push <ชื่อ registry>/<ชื่อ repository>:<tag>
  - example : docker push adosdata/edenweb-image
