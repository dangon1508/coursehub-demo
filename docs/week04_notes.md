### Kết quả đo truy vấn với Index (Index Scan)

- **Kế hoạch thực thi (Query Plan):**
  ```text
  Limit  (cost=0.42..83.20 rows=50 width=40) (actual time=0.046..0.117 rows=50 loops=1)
    Buffers: shared hit=53
    ->  Index Scan using idx_enrollment_events_dataset_student_time on enrollment_events  (...)
          Index Cond: (((dataset)::text = 'performance'::text) AND ((student_id)::text = '22000001'::text) AND (occurred_at >= '2025-12-30 00:00:00'::timestamp without time zone))
          Buffers: shared hit=53
  Planning:
    Buffers: shared hit=3
  Planning Time: 0.095 ms
  Execution Time: 0.131 ms


  
  # CourseHub - Buoi 4
- Migration 001: enrollment_events.
- Demo class: RACE-01, capacity = 1.
- POST /enrollments: lock class_sections bang FOR UPDATE.
- Concurrency test: 1 request 201, 1 request 409.
- Performance data: 100000 rows, dataset=performance.
- Index: idx_enrollment_events_dataset_student_time.
- Ghi lai scan type va Execution Time truoc/sau o day.
Khong commit backend/.env.