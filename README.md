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
| `SESSION_SECRET` | JWT 서명용 비밀값, **16자 이상** (예: `openssl rand -hex 32`) |

`SESSION_SECRET`이 없거나 짧으면 `/admin` 미들웨어는 **503**을 반환합니다.

## 관리자 계정 만들기

1. 스토어에서 **회원가입**으로 일반 계정을 만듭니다.
2. Supabase → **SQL Editor**에서 아이디를 본인 것으로 바꿔 실행합니다.

   ```sql
   update public.profiles
   set role = 'admin'
   where username = '여기에_가입한_아이디';
   ```

3. **로그아웃 후 다시 로그인**하면 세션에 `admin` 역할이 반영됩니다.
4. 브라우저 주소창에 `http://localhost:3000/admin` 을 입력해 상품을 등록합니다. **「공개」**를 켠 상품만 스토어에 노출됩니다.

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
| `/admin` | 상품 CRUD·공개 토글 (일반 헤더에 링크 없음) |

## 수정·추가된 주요 파일

- `app/layout.tsx`, `app/globals.css` — 타이포·컬러 토큰
- `app/(site)/layout.tsx`, `app/(site)/page.tsx`, `app/(site)/products/...`, `login`, `signup`
- `app/admin/**` — 관리 UI
- `app/actions/auth.ts`, `app/actions/admin-products.ts`, `app/actions/admin-toggle.ts`
- `components/site-header.tsx`, `site-footer.tsx`, `product-card.tsx`, `preview-strip.tsx`, `category-tabs.tsx`, `product-gallery.tsx`, `components/auth/*`, `components/admin/*`
- `lib/supabase/server.ts`, `lib/supabase/admin.ts`, `lib/data/products.ts`, `lib/data/admin-products.ts`
- `lib/auth/session.ts`, `password.ts`, `guard.ts`, `lib/types.ts`, `lib/format.ts`
- `middleware.ts` — `/admin` 보호 (admin 역할 + 세션)
- `supabase/migrations/20250329000000_initial.sql`, `.env.example`

---

초기 상품 데이터는 넣지 않았습니다. 관리자에서 직접 등록·공개 처리하면 메인·목록·상세에 반영됩니다.
