# OVERKILL UTILITIES

쓸데없이 화려한 연출을 붙인 20개 미니 도구를 한 사이트에 모은 정적 웹 프로젝트입니다.

## 실행

`index.html`을 브라우저에서 열면 됩니다.

로컬 서버 실행 예시:

```bash
python -m http.server 8000
```

그다음 `http://localhost:8000` 접속.

## 구성

- 한 화면의 20개 도구 카드
- 각 카드 클릭 시 전체 화면 미니 앱
- 날씨: Open-Meteo API 사용, 서울 기준
- 환율: Frankfurter API 사용
- 이미지 압축: 브라우저 Canvas에서 처리
- QR 제조소: qrcode.js CDN 연결 시 실제 스캔 가능한 QR 생성, 오프라인 실패 시 연출용 패턴으로 대체
- 나머지 기능은 순수 HTML/CSS/JavaScript로 동작

## 배포

정적 사이트이므로 GitHub Pages, Cloudflare Pages, Netlify, Vercel 등에 그대로 배포할 수 있습니다.
