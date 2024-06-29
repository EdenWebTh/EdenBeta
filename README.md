# EdenBeta

**req.**
- Docker install

**command.**
- `docker login`
- `docker pull <ชื่อใหม่ของ image>`
  - example : docker pull adosdata/edenweb-image
- `docker images`
- `docker build . -t <imagename>`
  - example : docker build . -t edenweb-image
- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`
  - example : docker run -it --rm -p 3002:3000 --name react-test-app edenweb-image
    - -it: เปิด terminal interactive เพื่อให้ผู้ใช้สามารถป้อนคำสั่งใน container ได้
    - --rm: ลบ container เมื่อหยุดรัน
    - -p 3002:3000: แมปพอร์ต 3000 ของ container ไปยังพอร์ต 3002 ของเครื่อง host
    - --name react-test-app: กำหนดชื่อของ container ให้เป็น react-test-app
    - edenweb-image: Docker image ที่ใช้ในการสร้าง container
- `docker tag <ชื่อเดิมของ image>:<เวอร์ชัน> <ชื่อใหม่ของ image>:<เวอร์ชัน>`
  - example : docker tag edenweb-image:latest adosdata/edenweb-image:latest
- `docker push <ชื่อ registry>/<ชื่อ repository>:<tag>`
  - example : docker push adosdata/edenweb-image
- 

### อธิบายการตั้งค่าใน docker-compose.yml
- `version: '3.8'` : กำหนดเวอร์ชันของ Docker Compose ที่ใช้
- `services:` : ระบุบริการที่ต้องการรัน
- `react-test-app:` : ชื่อของบริการ (สามารถตั้งชื่อใดๆ ก็ได้)
- `build: context: .` : ใช้ context ปัจจุบัน (โฟลเดอร์ที่มี Dockerfile) เพื่อ build image
- `ports: - "3002:3000"` : แมปพอร์ต 3000 ของ container ไปยังพอร์ต 3002 ของเครื่อง host
- `stdin_open: true` และ `tty: true` : เทียบเท่ากับ -it เพื่อเปิด interactive terminal

**command.**
- `docker-compose run --rm react-test-app` : รันบริการ (และลบ container เมื่อหยุดรัน) [ react-test-app ชื่อ ต้องตรงกับใน docker compose ]
- `docker-compose up --build` : รันบริการ (โดยไม่ลบ container เมื่อหยุดรัน)
- `docker-compose down` : หยุดบริการ