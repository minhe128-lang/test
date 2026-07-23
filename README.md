# OVERKILL UTILITIES

평범한 기능 20개를 불필요할 정도로 거대한 사건으로 연출하는 정적 웹 프로젝트입니다.

## 실행

압축을 푼 뒤 `index.html`을 브라우저에서 열면 됩니다. 이미지와 테마 파일이 상대 경로로 연결되어 있으므로 폴더 구조를 유지해야 합니다.

로컬 서버 실행 예시:

```bash
python -m http.server 8000
```

그다음 `http://localhost:8000` 접속.

## 이번 이미지 통합판

- 생성 이미지 5장을 20개 독립 장면으로 분리
- 모든 홈 카드에 해당 도구의 장면 미리보기 적용
- 각 미니 앱의 전체 화면 배경으로 전용 장면 적용
- 도구마다 다른 상시 애니메이션 적용
  - 폭우, 경보 파동, 불씨, 레이저 스캔, 마법진, 시공간 회전 등
- 실행 효과도 도구별로 분리
  - 통화 기호, 법률 문서 기호, 화염, 디지털 문자, 룬, 하트 등
- 사용자 조작 시 도구별 간단한 합성 효과음 재생
- 기존 기능 코드는 유지하고 `assets/art-overhaul.css`, `assets/art-overhaul.js`로 연출 계층을 분리

## 주요 기능

- 날씨: Open-Meteo API 사용, 서울 기준
- 환율: Frankfurter API 사용
- 이미지 압축: 브라우저 Canvas에서 처리
- QR 제조소: qrcode.js CDN 연결 시 실제 QR 생성, 연결 실패 시 오프라인 연출용 패턴 생성
- 나머지 기능은 순수 HTML/CSS/JavaScript로 동작

## 폴더 구조

```text
overkill-utilities/
├─ index.html
├─ README.md
└─ assets/
   ├─ art-overhaul.css
   ├─ art-overhaul.js
   └─ scenes/
      ├─ weather.webp
      ├─ button.webp
      └─ ... 총 20개
```

## 배포

GitHub Pages, Cloudflare Pages, Netlify, Vercel 같은 정적 호스팅에 폴더 전체를 그대로 배포하면 됩니다.
