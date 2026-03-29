# Meridian

프리미엄 시계·선글라스·모자 커머스 프론트와 Supabase 기반 카탈로그입니다. 스토어에는 관리자 진입 링크가 없으며, **`/admin` URL을 직접 입력**해야 관리 화면에 들어갈 수 있습니다.

## 스택

- Next.js App Router · TypeScript · Tailwind CSS v4
- Supabase (Postgres + RLS, 서버에서 service role로 관리자 쓰기)
- 커스텀 세션: 아이디(username) + 비밀번호 (`profiles.password_hash`, `jose` JWT 쿠키)

## 로컬 실행

1. 의존성 설치

   ```bash
   npm install
   ```

2. 환경 변수: `.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

   ```bash
   cp .env.example .env.local
   ```

3. 개발 서버

   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

4. 프로덕션 빌드

   ```bash
   npm run build && npm start
   ```

## Supabase에 적용할 SQL

1. Supabase 대시보드 → **SQL Editor** → New query.
2. 저장소의 `supabase/migrations/20250329000000_initial.sql` 파일 **전체**를 붙여넣고 **Run** 합니다.

이 스크립트는 `profiles`, `products`, `product_images` 테이블, `updated_at` 트리거, 그리고 **공개된 상품만** 익명(anon)으로 조회 가능한 RLS 정책을 만듭니다.  
관리자 앱의 등록·수정·삭제는 **service role 키**로만 수행되며, 브라우저에는 이 키를 넣지 않습니다.

### 트리거 오류 시

Postgres 버전에 따라 `EXECUTE FUNCTION` 문법이 다를 수 있습니다. 오류가 나면 트리거 부분만 아래처럼 바꿔 다시 실행해 보세요.

```sql
drop trigger if exists products_set_updated_at on public.products;

create trigger products_set_updated_at
  before update on public.products
  for each row
  execute procedure public.set_updated_at();
```

## 환경 변수에 넣을 값

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 프로젝트 URL (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` 키 (**서버 전용**, 클라이언트/깃에 노출 금지) |
| `SESSION_SECRET` | 회원 세션 + **관리자 게이트 쿠키** 서명용, **16자 이상** |
| `ADMIN_ACCESS_CODE` | 시연용 관리자 접근 코드 (예: `1234`). `/admin`에서 입력 |

`SESSION_SECRET`이 없거나 짧으면 관리자 코드 통과 후 쿠키 서명에 실패할 수 있습니다.

## 관리자 진입 (시연용)

1. 브라우저에서 `http://localhost:3000/admin` 을 직접 엽니다. (스토어 UI에는 관리 링크가 없습니다.)
2. **접근 코드** 화면에 `.env.local`의 `ADMIN_ACCESS_CODE`와 동일한 값을 입력합니다.
3. 맞으면 관리 화면으로 들어가며, **8시간** 동안 `path=/admin` 범위의 httpOnly 쿠키로 유지됩니다.
4. 헤더의 **코드 잠금**으로 쿠키를 지우고 다시 코드 화면으로 돌아갈 수 있습니다.

회원 **로그인·회원가입·profiles.role** 과 관리자 진입은 **완전히 분리**되어 있습니다. 상품 API는 통과 후에도 **service role**로만 쓰기합니다.

## 상품 이미지

- **대표 이미지**: `cover_image_url` (단일 URL).
- **추가 이미지**: 관리자 폼의 텍스트 영역에 **한 줄에 URL 하나**씩 입력 → `product_images`에 순서대로 저장됩니다.
- 임의의 HTTPS 이미지 URL을 사용할 수 있습니다 (컴포넌트는 `<img>`로 표시).

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 (상품 미리보기 가로 스크롤, 비어 있으면 empty state) |
| `/products` | 목록 + 카테고리 탭 (전체 / 시계 / 선글라스 / 모자) |
| `/products/[slug]` | 상세 (갤러리·설명·사이즈) |
| `/login`, `/signup` | 아이디·비밀번호 |
| `/admin` | 접근 코드 입력 → 상품 CRUD·공개 토글 (스토어에 링크 없음) |

## 수정·추가된 주요 파일

- `app/layout.tsx`, `app/globals.css` — 타이포·컬러 토큰
- `app/(site)/layout.tsx`, `app/(site)/page.tsx`, `app/(site)/products/...`, `login`, `signup`
- `app/admin/**` — 관리 UI
- `app/actions/auth.ts`, `app/actions/admin-products.ts`, `app/actions/admin-toggle.ts`, `app/actions/admin-gate.ts`
- `components/site-header.tsx`, `site-footer.tsx`, `product-card.tsx`, `preview-strip.tsx`, `category-tabs.tsx`, `product-gallery.tsx`, `components/auth/*`, `components/admin/*`
- `lib/supabase/server.ts`, `lib/supabase/admin.ts`, `lib/data/products.ts`, `lib/data/admin-products.ts`
- `lib/auth/session.ts`, `admin-gate.ts`, `password.ts`, `guard.ts`, `lib/types.ts`, `lib/format.ts`
- `supabase/migrations/20250329000000_initial.sql`, `.env.example`

---

초기 상품 데이터는 넣지 않았습니다. 관리자에서 직접 등록·공개 처리하면 메인·목록·상세에 반영됩니다.
