# CourseHub - Buoi 5

## Muc tieu

Frontend React/Vite goi FastAPI that de hien thi hoc phan, lop hoc phan va dang
ky cua sinh vien. PostgreSQL van la noi luu du lieu; Frontend khong tao du lieu
gia va khong tu cap nhat so cho.

## Cau truc va cau hinh

- `frontend/src/App.jsx`: chon sinh vien, tai du lieu, tim/loc lop, dang ky va
  huy dang ky.
- `frontend/src/api.js`: goi API, xu ly JSON, loi HTTP va DELETE 204.
- `frontend/src/components/`: cac component thong bao, bang lop va danh sach
  dang ky.
- `frontend/src/styles.css`: bo cuc responsive.
- `frontend/.env.example`: mau URL Backend.
- `backend/app/main.py`: CORS cho `http://localhost:5173` va
  `http://127.0.0.1:5173`.

Khong dua `frontend/.env.local`, `node_modules/` hoac `dist/` len Git. Khong dat
mat khau database, token hay khoa dich vu trong bien `VITE_*`.

## Ban phac giao dien


```text
+-----------------------------------------------------------+
| CourseHub - Tra cuu va dang ky lop hoc phan               |
+-----------------------------------------------------------+
| Ma sinh vien [22000004] [Xem dang ky] [Tai lai du lieu]   |
+------------------------------------+----------------------+
| Danh sach lop hoc phan             | Lop da dang ky       |
| Tim lop / hoc phan [___________]   | Ma lop, hoc phan     |
| [ ] Chi hien lop con cho           | [Huy dang ky]        |
| Lop | Hoc phan | Con cho | Thao tac|                      |
| ...                                |                      |
+------------------------------------+----------------------+
| Trang thai: dang tai / rong / thanh cong / loi API        |
+-----------------------------------------------------------+
```

