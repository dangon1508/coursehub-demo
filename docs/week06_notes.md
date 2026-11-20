# Buổi 6 - Docker, Testing, CI

## Môi trường
- OS: Windows 11
- Docker version: 29.4.0
- Python / Node version: Python 3.13 / Node 22.12.0

## Kết quả local
- pytest backend/tests -q: pass (OpenAPI contract test)
- npm test: pass (8/8 tests pass)
- npm run build: pass (dist bundle generated)
- docker compose up --build: pass (Backend healthy, Frontend 8080:80)

## Một luồng tích hợp đã kiểm tra
- Request: GET http://127.0.0.1:8080/api/sections
- HTTP status: 200 OK
- SQL xác nhận: Dữ liệu trả về đúng các lớp học từ database coursehub trên PostgreSQL host.

## Debug / AI
- Lỗi gặp phải: Container Backend không thể kết nối localhost của host vì localhost trong container chỉ chính container.
- Bằng chứng đã xem: `docker compose logs backend` báo lỗi nếu dùng 127.0.0.1.
- Nếu dùng AI: Gợi ý dùng `host.docker.internal` trong `.env.docker` và `extra_hosts` trong compose; xác minh bằng `curl http://127.0.0.1:8080/api/health` -> `{"status":"ok","database":"connected"}`.

## Pull Request / CI
- PR: week06-docker-ci -> main
- Reviewer: chưa có
- CI run: backend, frontend, docker jobs
