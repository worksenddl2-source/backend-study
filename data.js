// 백엔드 필수 개념 학습 데이터
// units[].concepts : 개념 카드 (body는 HTML)
// units[].terms    : [단어, 뜻] — 단어 암기 + 자동 생성 퀴즈에 사용
// units[].quiz     : 직접 작성한 문제 (type: 'mc' 객관식 | 'ox')
// units[].summary  : 단원 핵심 정리 (전체 정리 페이지에 사용)

const UNITS = [
  {
    id: 1,
    title: "웹의 동작 원리",
    desc: "클라이언트·서버, IP·포트, DNS, URL, TCP/UDP",
    concepts: [
      {
        title: "클라이언트와 서버",
        body: `<p><b>클라이언트</b>는 요청(Request)을 보내는 쪽, <b>서버</b>는 요청을 받아 처리하고 응답(Response)을 돌려주는 쪽입니다.</p>
<p>브라우저·모바일 앱이 대표적인 클라이언트이고, 백엔드 개발자는 주로 <b>서버 쪽 로직, 데이터베이스, API</b>를 만듭니다.</p>
<pre>[브라우저] --요청--> [서버] --조회--> [DB]
[브라우저] <--응답-- [서버] <--결과-- [DB]</pre>
<p class="tip">💡 하나의 서버가 다른 서버에게는 클라이언트가 될 수도 있습니다. (예: 내 서버가 결제 API를 호출)</p>`
      },
      {
        title: "IP 주소와 포트",
        body: `<p><b>IP 주소</b>는 네트워크상에서 컴퓨터를 찾는 주소입니다. (예: <code>192.168.0.1</code>, IPv4 / IPv6)</p>
<p><b>포트(Port)</b>는 한 컴퓨터 안에서 어떤 프로그램에게 전달할지 정하는 번호(0~65535)입니다. IP가 "건물 주소"라면 포트는 "호수"입니다.</p>
<table><tr><th>포트</th><th>용도</th></tr>
<tr><td>80</td><td>HTTP</td></tr><tr><td>443</td><td>HTTPS</td></tr>
<tr><td>22</td><td>SSH</td></tr><tr><td>3306</td><td>MySQL</td></tr>
<tr><td>5432</td><td>PostgreSQL</td></tr><tr><td>6379</td><td>Redis</td></tr></table>
<p class="tip">💡 <code>localhost</code>(127.0.0.1)는 "내 컴퓨터 자신"을 가리킵니다.</p>`
      },
      {
        title: "DNS (Domain Name System)",
        body: `<p>사람은 <code>google.com</code> 같은 <b>도메인</b>을 기억하지만, 컴퓨터는 IP 주소로 통신합니다. <b>DNS</b>는 도메인을 IP 주소로 바꿔주는 "인터넷 전화번호부"입니다.</p>
<ol><li>브라우저/OS 캐시 확인</li><li>DNS 리졸버(보통 통신사)에 질의</li><li>루트 → TLD(.com) → 권한 네임서버 순으로 조회</li><li>IP 주소를 받아 캐시에 저장 (TTL 동안)</li></ol>`
      },
      {
        title: "URL 구조",
        body: `<pre>https://api.shop.com:443/products/42?sort=price&page=2#review
└─┬─┘   └────┬─────┘ └┬┘└────┬─────┘└────────┬────────┘└──┬─┘
scheme     host     port    path          query        fragment</pre>
<ul><li><b>scheme</b>: 사용할 프로토콜 (http, https)</li><li><b>host</b>: 도메인 또는 IP</li><li><b>port</b>: 생략 시 http=80, https=443</li><li><b>path</b>: 서버 안의 자원 위치</li><li><b>query</b>: <code>key=value</code> 형태의 추가 정보, <code>&</code>로 구분</li><li><b>fragment</b>: 페이지 내 위치, 서버로 전송되지 않음</li></ul>`
      },
      {
        title: "TCP와 UDP",
        body: `<p><b>TCP</b>는 연결을 맺고(3-way handshake) 데이터의 <b>순서와 도착을 보장</b>합니다. 신뢰성이 중요할 때 사용 → HTTP(1.1/2), 이메일, 파일 전송.</p>
<p><b>UDP</b>는 연결 없이 그냥 보냅니다. 순서·도착 보장은 없지만 <b>빠릅니다</b> → 실시간 스트리밍, 게임, DNS 조회.</p>
<pre>3-way handshake
클라이언트 --SYN-->      서버
클라이언트 <--SYN+ACK--  서버
클라이언트 --ACK-->      서버   (연결 완료)</pre>`
      },
      {
        title: "주소창에 URL을 입력하면 일어나는 일",
        body: `<ol><li><b>DNS 조회</b>로 도메인 → IP 변환</li><li>서버와 <b>TCP 연결</b> (3-way handshake)</li><li>HTTPS라면 <b>TLS 핸드셰이크</b>로 암호화 채널 수립</li><li><b>HTTP 요청</b> 전송</li><li>서버가 요청 처리 (라우팅 → 비즈니스 로직 → DB 조회)</li><li><b>HTTP 응답</b> 반환 (상태 코드 + 헤더 + 본문)</li><li>브라우저가 HTML/CSS/JS를 해석하여 <b>렌더링</b></li></ol>
<p class="tip">💡 면접 단골 질문입니다. 순서대로 말할 수 있게 연습하세요.</p>`
      }
    ],
    terms: [
      ["클라이언트", "서버에 요청을 보내고 응답을 받는 쪽 (브라우저, 앱 등)"],
      ["서버", "클라이언트의 요청을 받아 처리하고 응답을 돌려주는 프로그램 또는 컴퓨터"],
      ["IP 주소", "네트워크에서 기기를 식별하는 주소 (IPv4, IPv6)"],
      ["포트", "한 컴퓨터 안에서 통신할 프로그램을 구분하는 번호 (0~65535)"],
      ["DNS", "도메인 이름을 IP 주소로 변환해주는 시스템"],
      ["도메인", "IP 주소 대신 사람이 기억하기 쉽게 만든 이름 (예: naver.com)"],
      ["URL", "인터넷 자원의 위치를 나타내는 주소 (scheme, host, path, query 등으로 구성)"],
      ["쿼리 스트링", "URL의 ? 뒤에 key=value 형태로 붙는 추가 정보"],
      ["프로토콜", "컴퓨터끼리 통신할 때 지키는 약속된 규칙 (HTTP, TCP 등)"],
      ["TCP", "연결을 맺고 데이터의 순서와 전달을 보장하는 신뢰성 있는 전송 프로토콜"],
      ["UDP", "연결 없이 빠르게 전송하지만 순서·도착을 보장하지 않는 전송 프로토콜"],
      ["3-way handshake", "TCP 연결 수립 과정 (SYN → SYN+ACK → ACK)"],
      ["localhost", "자기 자신의 컴퓨터를 가리키는 주소 (127.0.0.1)"]
    ],
    quiz: [
      { type: "mc", q: "도메인 이름을 IP 주소로 변환해주는 시스템은?", options: ["DHCP", "DNS", "TCP", "NAT"], answer: 1, explain: "DNS(Domain Name System)는 도메인을 IP 주소로 바꿔주는 '인터넷 전화번호부'입니다." },
      { type: "mc", q: "HTTPS의 기본 포트 번호는?", options: ["80", "22", "443", "3306"], answer: 2, explain: "HTTP는 80, HTTPS는 443, SSH는 22, MySQL은 3306입니다." },
      { type: "ox", q: "URL의 fragment(# 뒤 부분)는 서버로 전송된다.", answer: false, explain: "fragment는 브라우저에서 페이지 내 위치를 찾는 데만 쓰이며 서버로 전송되지 않습니다." },
      { type: "mc", q: "다음 중 UDP를 사용하기에 가장 적합한 경우는?", options: ["은행 송금 요청", "파일 다운로드", "실시간 음성 통화", "이메일 전송"], answer: 2, explain: "실시간 통화·스트리밍은 일부 손실보다 속도가 중요하므로 UDP가 적합합니다. 나머지는 신뢰성이 중요해 TCP를 씁니다." },
      { type: "ox", q: "TCP 연결은 SYN → SYN+ACK → ACK 순서의 3-way handshake로 수립된다.", answer: true, explain: "클라이언트 SYN, 서버 SYN+ACK, 클라이언트 ACK 순으로 연결이 맺어집니다." },
      { type: "mc", q: "URL `https://shop.com/items?page=2` 에서 `page=2` 부분의 명칭은?", options: ["path", "host", "query", "fragment"], answer: 2, explain: "? 뒤의 key=value 부분은 쿼리(query string)입니다." },
      { type: "mc", q: "브라우저 주소창에 URL을 입력했을 때 가장 먼저 일어나는 일은?", options: ["HTTP 요청 전송", "DNS 조회", "HTML 렌더링", "TLS 핸드셰이크"], answer: 1, explain: "서버의 IP를 알아야 연결할 수 있으므로 DNS 조회가 먼저입니다. 이후 TCP → TLS → HTTP 요청 → 응답 → 렌더링 순입니다." }
    ],
    summary: [
      "클라이언트는 요청, 서버는 처리 후 응답. 백엔드는 서버·DB·API를 담당한다.",
      "IP는 컴퓨터의 주소, 포트는 프로그램의 번호 (HTTP 80 / HTTPS 443).",
      "DNS는 도메인 → IP 변환. 결과는 TTL 동안 캐시된다.",
      "URL = scheme://host:port/path?query#fragment",
      "TCP는 신뢰성(순서·도착 보장), UDP는 속도. TCP는 3-way handshake로 연결.",
      "URL 입력 → DNS → TCP → TLS → HTTP 요청 → 서버 처리 → 응답 → 렌더링"
    ]
  },

  {
    id: 2,
    title: "HTTP",
    desc: "메서드, 상태 코드, 헤더, 쿠키·세션, HTTPS",
    concepts: [
      {
        title: "HTTP의 특징",
        body: `<p><b>HTTP</b>(HyperText Transfer Protocol)는 웹에서 클라이언트와 서버가 데이터를 주고받는 규칙입니다.</p>
<ul><li><b>요청-응답 구조</b>: 클라이언트가 요청해야만 서버가 응답</li><li><b>무상태(Stateless)</b>: 서버는 이전 요청을 기억하지 않음 → 로그인 유지를 위해 쿠키·세션·토큰이 필요</li><li><b>비연결성</b>: 기본적으로 응답 후 연결을 끊음 (현재는 Keep-Alive로 재사용)</li></ul>
<pre>POST /api/users HTTP/1.1          ← 시작줄 (메서드, 경로, 버전)
Host: api.example.com              ← 헤더
Content-Type: application/json

{"name": "kim"}                    ← 본문(body)</pre>`
      },
      {
        title: "HTTP 메서드",
        body: `<table><tr><th>메서드</th><th>의미</th><th>멱등성</th></tr>
<tr><td>GET</td><td>자원 조회</td><td>O</td></tr>
<tr><td>POST</td><td>자원 생성 / 처리 요청</td><td>X</td></tr>
<tr><td>PUT</td><td>자원 전체 교체</td><td>O</td></tr>
<tr><td>PATCH</td><td>자원 일부 수정</td><td>X(보장 안 됨)</td></tr>
<tr><td>DELETE</td><td>자원 삭제</td><td>O</td></tr></table>
<p class="tip">💡 GET은 본문 없이 쿼리 파라미터로 데이터를 전달하고, 서버 상태를 바꾸면 안 됩니다(안전한 메서드).</p>`
      },
      {
        title: "HTTP 상태 코드",
        body: `<ul><li><b>2xx 성공</b>: 200 OK, 201 Created, 204 No Content</li><li><b>3xx 리다이렉션</b>: 301 영구 이동, 302 임시 이동, 304 Not Modified(캐시 사용)</li><li><b>4xx 클라이언트 오류</b>: 400 Bad Request, 401 Unauthorized(인증 필요), 403 Forbidden(권한 없음), 404 Not Found, 409 Conflict, 429 Too Many Requests</li><li><b>5xx 서버 오류</b>: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</li></ul>
<p class="tip">💡 401은 "누구인지 모름(로그인 안 함)", 403은 "누구인지 알지만 권한 없음"입니다.</p>`
      },
      {
        title: "HTTP 헤더",
        body: `<p>헤더는 요청·응답에 대한 <b>부가 정보</b>를 <code>이름: 값</code> 형태로 담습니다.</p>
<ul><li><code>Content-Type</code>: 본문의 형식 (application/json, text/html)</li><li><code>Authorization</code>: 인증 정보 (Bearer 토큰 등)</li><li><code>Cookie</code> / <code>Set-Cookie</code>: 쿠키 전달 / 저장 지시</li><li><code>Cache-Control</code>: 캐시 정책 (no-cache, max-age=3600)</li><li><code>User-Agent</code>: 클라이언트 정보</li><li><code>Location</code>: 리다이렉트할 주소 (3xx, 201과 함께)</li></ul>`
      },
      {
        title: "쿠키와 세션",
        body: `<p>HTTP는 무상태이므로 "로그인한 사용자"를 기억하려면 별도 장치가 필요합니다.</p>
<p><b>쿠키</b>: 서버가 <code>Set-Cookie</code>로 보내면 브라우저가 저장하고, 이후 요청마다 자동으로 함께 보내는 작은 데이터. 클라이언트에 저장됩니다.</p>
<p><b>세션</b>: 사용자 정보는 <b>서버에 저장</b>하고, 브라우저에는 세션 ID만 쿠키로 줍니다. 서버가 세션 ID로 사용자를 찾습니다.</p>
<p class="tip">💡 쿠키 보안 옵션: <code>HttpOnly</code>(JS 접근 차단), <code>Secure</code>(HTTPS에서만 전송), <code>SameSite</code>(CSRF 완화)</p>`
      },
      {
        title: "HTTPS와 TLS",
        body: `<p><b>HTTPS</b> = HTTP + <b>TLS</b> 암호화. 중간에서 데이터를 훔쳐보거나 바꾸지 못하게 합니다.</p>
<ul><li><b>대칭키</b>: 암호화·복호화에 같은 키 → 빠름, 키 전달이 문제</li><li><b>비대칭키(공개키)</b>: 공개키로 암호화, 개인키로 복호화 → 안전하지만 느림</li><li>TLS는 핸드셰이크에서 비대칭키로 <b>대칭키를 안전하게 교환</b>하고, 이후 통신은 대칭키로 암호화</li><li><b>인증서(CA)</b>로 서버가 진짜인지 확인</li></ul>`
      }
    ],
    terms: [
      ["HTTP", "웹에서 클라이언트와 서버가 데이터를 주고받는 요청-응답 프로토콜"],
      ["무상태(Stateless)", "서버가 이전 요청의 상태를 기억하지 않는 HTTP의 특성"],
      ["GET", "자원을 조회하는 HTTP 메서드. 서버 상태를 바꾸지 않아야 함"],
      ["POST", "자원을 생성하거나 처리를 요청하는 HTTP 메서드. 멱등하지 않음"],
      ["PUT", "자원 전체를 교체하는 HTTP 메서드"],
      ["PATCH", "자원의 일부만 수정하는 HTTP 메서드"],
      ["DELETE", "자원을 삭제하는 HTTP 메서드"],
      ["200 OK", "요청이 성공했음을 나타내는 상태 코드"],
      ["201 Created", "요청이 성공해 새 자원이 생성되었음을 나타내는 상태 코드"],
      ["401 Unauthorized", "인증이 필요하거나 인증에 실패했음을 나타내는 상태 코드"],
      ["403 Forbidden", "인증은 되었지만 해당 자원에 접근할 권한이 없음을 나타내는 상태 코드"],
      ["404 Not Found", "요청한 자원을 찾을 수 없음을 나타내는 상태 코드"],
      ["500 Internal Server Error", "서버 내부에서 처리 중 오류가 발생했음을 나타내는 상태 코드"],
      ["Content-Type", "요청·응답 본문의 데이터 형식을 알려주는 헤더"],
      ["쿠키", "서버가 브라우저에 저장시키고, 이후 요청마다 자동으로 전송되는 작은 데이터"],
      ["세션", "사용자 상태 정보를 서버에 저장하고 세션 ID로 식별하는 방식"],
      ["HTTPS", "TLS로 암호화된 HTTP. 도청과 위변조를 막음"]
    ],
    quiz: [
      { type: "mc", q: "로그인은 했지만 관리자 페이지에 접근할 권한이 없을 때 적절한 상태 코드는?", options: ["400", "401", "403", "404"], answer: 2, explain: "인증(누구인지)은 되었지만 인가(권한)가 없으므로 403 Forbidden입니다. 401은 인증 자체가 안 된 경우입니다." },
      { type: "mc", q: "새 회원을 생성하는 요청이 성공했을 때 가장 적절한 상태 코드는?", options: ["200 OK", "201 Created", "204 No Content", "302 Found"], answer: 1, explain: "새 자원이 생성되면 201 Created를 사용하고, 보통 Location 헤더에 새 자원 주소를 담습니다." },
      { type: "ox", q: "HTTP는 무상태(Stateless) 프로토콜이므로 서버는 기본적으로 이전 요청을 기억하지 않는다.", answer: true, explain: "그래서 로그인 상태 유지를 위해 쿠키, 세션, 토큰을 사용합니다." },
      { type: "mc", q: "자원의 일부 필드만 수정할 때 주로 사용하는 메서드는?", options: ["GET", "PUT", "PATCH", "POST"], answer: 2, explain: "PATCH는 부분 수정, PUT은 전체 교체입니다." },
      { type: "ox", q: "세션 방식에서는 사용자 정보를 브라우저 쿠키에 모두 저장한다.", answer: false, explain: "세션 방식은 사용자 정보를 서버에 저장하고, 브라우저 쿠키에는 세션 ID만 저장합니다." },
      { type: "mc", q: "JavaScript에서 쿠키에 접근하지 못하게 막아 XSS 피해를 줄이는 쿠키 옵션은?", options: ["Secure", "HttpOnly", "SameSite", "Max-Age"], answer: 1, explain: "HttpOnly 쿠키는 document.cookie로 읽을 수 없어 XSS로 인한 세션 탈취를 줄여줍니다." },
      { type: "mc", q: "5xx 상태 코드가 의미하는 것은?", options: ["요청 성공", "리다이렉션", "클라이언트 오류", "서버 오류"], answer: 3, explain: "2xx 성공, 3xx 리다이렉션, 4xx 클라이언트 오류, 5xx 서버 오류입니다." }
    ],
    summary: [
      "HTTP는 요청-응답 구조이며 무상태(Stateless)다.",
      "GET 조회 / POST 생성 / PUT 전체 수정 / PATCH 부분 수정 / DELETE 삭제",
      "2xx 성공, 3xx 리다이렉션, 4xx 클라이언트 오류, 5xx 서버 오류",
      "401 = 인증 안 됨, 403 = 권한 없음",
      "쿠키는 클라이언트 저장, 세션은 서버 저장(세션 ID만 쿠키로).",
      "HTTPS = HTTP + TLS. 비대칭키로 대칭키를 교환한 뒤 대칭키로 통신."
    ]
  },

  {
    id: 3,
    title: "API 설계",
    desc: "REST, URI 설계, JSON, 멱등성, 페이지네이션",
    concepts: [
      {
        title: "API란?",
        body: `<p><b>API</b>(Application Programming Interface)는 프로그램끼리 소통하는 <b>약속된 창구</b>입니다. 백엔드에서 "API를 만든다"는 보통 <b>HTTP로 호출할 수 있는 엔드포인트</b>를 만든다는 뜻입니다.</p>
<pre>GET /api/products/42
→ 200 OK
{ "id": 42, "name": "키보드", "price": 59000 }</pre>
<p>프론트엔드·모바일 앱·다른 서버가 이 API를 호출해 데이터를 주고받습니다.</p>`
      },
      {
        title: "REST",
        body: `<p><b>REST</b>(Representational State Transfer)는 HTTP를 잘 활용하는 API 설계 스타일입니다.</p>
<ul><li><b>자원(Resource)</b>은 URI로 표현한다 → <code>/users/1</code></li><li><b>행위</b>는 HTTP 메서드로 표현한다 → GET, POST, PUT, DELETE</li><li><b>표현</b>은 JSON 등으로 주고받는다</li><li><b>무상태</b>: 각 요청은 필요한 정보를 모두 담는다</li></ul>
<p>이 원칙을 잘 따른 API를 <b>RESTful API</b>라고 합니다.</p>`
      },
      {
        title: "RESTful URI 설계 규칙",
        body: `<table><tr><th>나쁜 예 ❌</th><th>좋은 예 ✅</th></tr>
<tr><td><code>GET /getUsers</code></td><td><code>GET /users</code></td></tr>
<tr><td><code>POST /createUser</code></td><td><code>POST /users</code></td></tr>
<tr><td><code>POST /deleteUser?id=3</code></td><td><code>DELETE /users/3</code></td></tr>
<tr><td><code>GET /user/3/Orders</code></td><td><code>GET /users/3/orders</code></td></tr></table>
<ul><li>URI에 <b>동사 대신 명사</b>, 컬렉션은 <b>복수형</b></li><li>소문자 사용, 단어 구분은 하이픈(<code>-</code>)</li><li>계층 관계는 <code>/</code>로 표현</li><li>필터·정렬·검색은 쿼리 파라미터: <code>/users?role=admin&sort=name</code></li></ul>`
      },
      {
        title: "JSON과 직렬화",
        body: `<p><b>JSON</b>(JavaScript Object Notation)은 API에서 가장 많이 쓰는 데이터 형식입니다.</p>
<pre>{
  "id": 1,
  "name": "Kim",
  "tags": ["admin", "dev"],
  "address": { "city": "Seoul" },
  "active": true
}</pre>
<p><b>직렬화(Serialization)</b>: 객체 → 전송 가능한 형식(JSON 문자열)으로 변환<br><b>역직렬화</b>: JSON 문자열 → 객체로 변환</p>`
      },
      {
        title: "멱등성 (Idempotency)",
        body: `<p><b>같은 요청을 여러 번 보내도 결과(서버 상태)가 한 번 보낸 것과 같은 성질</b>입니다.</p>
<ul><li><code>GET /users/1</code> 100번 → 상태 변화 없음 → 멱등 ✅</li><li><code>DELETE /users/1</code> 2번 → 이미 삭제된 상태 그대로 → 멱등 ✅</li><li><code>PUT /users/1 {name:"A"}</code> 여러 번 → 결과 동일 → 멱등 ✅</li><li><code>POST /orders</code> 2번 → 주문이 2개 생성 → 멱등 ❌</li></ul>
<p class="tip">💡 네트워크 오류로 재시도할 때 중요합니다. 결제처럼 중복이 위험한 POST는 <b>멱등 키(Idempotency-Key)</b>를 함께 보내 중복 처리를 막습니다.</p>`
      },
      {
        title: "페이지네이션과 버저닝",
        body: `<p><b>페이지네이션</b>: 많은 데이터를 나눠서 응답</p>
<ul><li><b>오프셋 방식</b>: <code>?page=3&size=20</code> → 구현 쉬움, 뒤 페이지로 갈수록 느림</li><li><b>커서 방식</b>: <code>?cursor=abc&size=20</code> → 마지막 항목 기준으로 이어서 조회, 대용량·무한 스크롤에 유리</li></ul>
<p><b>API 버저닝</b>: 기존 사용자를 깨뜨리지 않고 API를 바꾸기 위해 버전을 붙입니다. <code>/api/v1/users</code>, <code>/api/v2/users</code></p>
<p class="tip">💡 REST 외에도 필요한 필드만 골라 요청하는 <b>GraphQL</b>, 고성능 서버 간 통신용 <b>gRPC</b>가 있습니다.</p>`
      }
    ],
    terms: [
      ["API", "프로그램끼리 데이터를 주고받기 위해 약속한 인터페이스"],
      ["엔드포인트", "API가 요청을 받는 구체적인 URL + 메서드 (예: GET /users)"],
      ["REST", "자원은 URI로, 행위는 HTTP 메서드로 표현하는 API 설계 스타일"],
      ["리소스(자원)", "API가 다루는 대상 데이터. URI로 식별됨 (예: /users/1)"],
      ["JSON", "키-값 쌍으로 이루어진, API에서 가장 널리 쓰는 텍스트 데이터 형식"],
      ["직렬화", "객체를 JSON 문자열 등 전송·저장 가능한 형식으로 변환하는 것"],
      ["역직렬화", "JSON 문자열 등을 다시 프로그램의 객체로 변환하는 것"],
      ["멱등성", "같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같은 성질"],
      ["경로 파라미터", "URL 경로에 포함되는 값. 특정 자원 식별에 사용 (예: /users/{id})"],
      ["쿼리 파라미터", "URL ? 뒤에 붙는 값. 필터·정렬·검색에 사용 (예: ?sort=name)"],
      ["페이지네이션", "많은 데이터를 페이지 단위로 나누어 응답하는 기법 (오프셋, 커서 방식)"],
      ["API 버저닝", "기존 클라이언트를 깨뜨리지 않도록 API에 버전을 붙여 관리하는 것 (/v1, /v2)"],
      ["GraphQL", "클라이언트가 필요한 필드만 골라 요청할 수 있는 API 쿼리 언어"],
      ["Webhook", "특정 이벤트가 발생하면 서버가 미리 등록된 URL로 HTTP 요청을 보내 알려주는 방식"]
    ],
    quiz: [
      { type: "mc", q: "RESTful한 URI 설계로 가장 적절한 것은?", options: ["POST /createUser", "GET /getUserList", "DELETE /users/3", "GET /User/3/Orders"], answer: 2, explain: "URI는 명사·복수형·소문자로 자원을 표현하고, 행위는 HTTP 메서드(DELETE)로 표현합니다." },
      { type: "mc", q: "다음 중 멱등하지 않은 메서드는?", options: ["GET", "PUT", "DELETE", "POST"], answer: 3, explain: "POST는 호출할 때마다 새 자원이 생길 수 있어 멱등하지 않습니다." },
      { type: "ox", q: "REST에서 행위(조회, 생성, 삭제 등)는 URI에 동사로 표현하는 것이 원칙이다.", answer: false, explain: "행위는 HTTP 메서드로 표현하고, URI는 자원(명사)만 나타냅니다." },
      { type: "mc", q: "객체를 JSON 문자열로 변환하는 과정을 무엇이라 하는가?", options: ["역직렬화", "직렬화", "정규화", "캐싱"], answer: 1, explain: "객체 → 전송 가능한 형식 변환은 직렬화, 그 반대는 역직렬화입니다." },
      { type: "mc", q: "무한 스크롤처럼 대용량 데이터를 이어서 조회할 때 성능상 유리한 페이지네이션은?", options: ["오프셋 방식", "커서 방식", "전체 조회 후 프론트에서 자르기", "랜덤 샘플링"], answer: 1, explain: "커서 방식은 마지막 항목 기준으로 이어 조회하므로 앞부분을 건너뛰는 비용이 없어 대용량에 유리합니다." },
      { type: "ox", q: "필터·정렬 조건은 보통 쿼리 파라미터로 전달한다. (예: /products?sort=price)", answer: true, explain: "특정 자원 식별은 경로 파라미터, 필터·정렬·검색은 쿼리 파라미터가 일반적입니다." }
    ],
    summary: [
      "API는 프로그램끼리 소통하는 약속. 백엔드는 HTTP 엔드포인트를 만든다.",
      "REST: 자원은 URI(명사·복수형), 행위는 HTTP 메서드.",
      "JSON이 표준 데이터 형식. 객체↔JSON 변환 = 직렬화/역직렬화.",
      "멱등성: 여러 번 보내도 결과 동일. GET/PUT/DELETE는 멱등, POST는 아님.",
      "식별은 경로 파라미터(/users/1), 필터·정렬은 쿼리 파라미터(?sort=).",
      "페이지네이션은 오프셋·커서 방식. 버전은 /v1, /v2로 관리."
    ]
  },

  {
    id: 4,
    title: "데이터베이스",
    desc: "RDB, SQL, 정규화, 인덱스, 트랜잭션, NoSQL",
    concepts: [
      {
        title: "데이터베이스와 RDB",
        body: `<p><b>데이터베이스(DB)</b>는 데이터를 체계적으로 저장하는 곳이고, 이를 관리하는 소프트웨어를 <b>DBMS</b>라고 합니다.</p>
<p><b>관계형 DB(RDB)</b>는 데이터를 <b>테이블(행·열)</b>로 저장하고 테이블끼리 관계를 맺습니다. (MySQL, PostgreSQL, Oracle)</p>
<pre>users                       orders
id | name  | email          id | user_id | total
---+-------+--------         ---+---------+------
1  | Kim   | k@a.com         10 |    1    | 30000
2  | Lee   | l@a.com         11 |    1    | 12000</pre>
<ul><li><b>기본 키(PK)</b>: 행을 유일하게 식별 (users.id)</li><li><b>외래 키(FK)</b>: 다른 테이블의 PK를 참조 (orders.user_id → users.id)</li></ul>`
      },
      {
        title: "SQL 기본",
        body: `<pre>-- 조회
SELECT name, email FROM users WHERE id = 1;
-- 생성
INSERT INTO users (name, email) VALUES ('Park', 'p@a.com');
-- 수정
UPDATE users SET name = 'Choi' WHERE id = 2;
-- 삭제
DELETE FROM users WHERE id = 2;
-- 조인: 사용자별 주문
SELECT u.name, o.total
FROM users u JOIN orders o ON u.id = o.user_id;
-- 집계
SELECT user_id, SUM(total) FROM orders GROUP BY user_id;</pre>
<p class="tip">⚠️ UPDATE/DELETE에 <code>WHERE</code>를 빠뜨리면 테이블 전체가 바뀝니다!</p>
<p><b>INNER JOIN</b>은 양쪽에 모두 있는 행만, <b>LEFT JOIN</b>은 왼쪽 테이블의 모든 행 + 매칭되는 오른쪽 행(없으면 NULL)을 가져옵니다.</p>`
      },
      {
        title: "정규화",
        body: `<p><b>정규화</b>는 데이터 <b>중복을 줄이고</b> 이상 현상(삽입·수정·삭제 이상)을 막기 위해 테이블을 나누는 과정입니다.</p>
<p>예: 주문 테이블에 고객 이름·주소를 매번 저장하면, 주소가 바뀔 때 모든 주문 행을 수정해야 합니다 → 고객 테이블로 분리하고 고객 ID만 참조.</p>
<ul><li>1NF: 한 칸에 하나의 값만 (원자값)</li><li>2NF: 기본 키 전체에 종속</li><li>3NF: 키가 아닌 컬럼끼리 종속 제거</li></ul>
<p class="tip">💡 <b>반정규화</b>: 조회 성능을 위해 일부러 중복을 허용하기도 합니다. (JOIN 비용 감소)</p>`
      },
      {
        title: "인덱스",
        body: `<p><b>인덱스</b>는 책의 "찾아보기"처럼 원하는 행을 <b>빠르게 찾게 해주는 자료구조</b>입니다. 주로 <b>B-Tree(B+Tree)</b>를 사용합니다.</p>
<pre>CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE email = 'k@a.com';  -- 전체 스캔 대신 인덱스 탐색</pre>
<ul><li>✅ WHERE, JOIN, ORDER BY에 자주 쓰이는 컬럼에 효과적</li><li>❌ 쓰기(INSERT/UPDATE/DELETE) 시 인덱스도 갱신 → 쓰기가 느려지고 저장 공간 사용</li><li>❌ 값 종류가 적은 컬럼(성별 등)은 효과가 적음</li></ul>`
      },
      {
        title: "트랜잭션과 ACID",
        body: `<p><b>트랜잭션</b>은 "전부 성공하거나 전부 실패해야 하는" 작업 묶음입니다.</p>
<pre>BEGIN;
UPDATE accounts SET balance = balance - 10000 WHERE id = 1;  -- A 출금
UPDATE accounts SET balance = balance + 10000 WHERE id = 2;  -- B 입금
COMMIT;   -- 둘 다 성공 시 확정 / 실패 시 ROLLBACK</pre>
<ul><li><b>A</b>tomicity 원자성: 전부 아니면 전무</li><li><b>C</b>onsistency 일관성: 규칙(제약조건)을 항상 만족</li><li><b>I</b>solation 격리성: 동시에 실행되는 트랜잭션끼리 간섭하지 않음</li><li><b>D</b>urability 지속성: 커밋된 결과는 장애가 나도 유지</li></ul>`
      },
      {
        title: "NoSQL과 ORM",
        body: `<p><b>NoSQL</b>은 테이블 대신 유연한 구조로 저장하는 DB입니다. 스키마가 자유롭고 수평 확장이 쉽습니다.</p>
<ul><li>문서형: MongoDB (JSON 형태 문서)</li><li>키-값형: Redis, DynamoDB</li><li>컬럼형: Cassandra</li><li>그래프형: Neo4j</li></ul>
<p><b>ORM</b>(Object-Relational Mapping)은 SQL을 직접 쓰지 않고 코드의 객체로 DB를 다루게 해줍니다. (JPA/Hibernate, Django ORM, Prisma, Sequelize)</p>
<p class="tip">⚠️ <b>N+1 문제</b>: 목록 1번 조회 후, 각 항목의 연관 데이터를 N번 추가 조회하는 성능 문제. JOIN(fetch join)이나 일괄 조회로 해결합니다.</p>`
      }
    ],
    terms: [
      ["DBMS", "데이터베이스를 생성·관리·조회하는 소프트웨어 (MySQL, PostgreSQL 등)"],
      ["RDB", "데이터를 행과 열로 된 테이블에 저장하고 테이블 간 관계를 맺는 데이터베이스"],
      ["기본 키(PK)", "테이블에서 각 행을 유일하게 식별하는 컬럼"],
      ["외래 키(FK)", "다른 테이블의 기본 키를 참조하여 관계를 맺는 컬럼"],
      ["SQL", "관계형 데이터베이스에서 데이터를 조회·조작하는 언어"],
      ["JOIN", "여러 테이블을 공통 컬럼 기준으로 연결해 함께 조회하는 SQL 연산"],
      ["정규화", "중복을 줄이고 이상 현상을 막기 위해 테이블을 분리하는 과정"],
      ["인덱스", "조회 속도를 높이기 위해 컬럼 값을 정렬해 둔 자료구조 (주로 B-Tree)"],
      ["트랜잭션", "전부 성공하거나 전부 실패해야 하는 데이터베이스 작업의 묶음"],
      ["ACID", "트랜잭션이 보장해야 할 원자성·일관성·격리성·지속성"],
      ["커밋(COMMIT)", "트랜잭션의 변경 내용을 DB에 확정 반영하는 것"],
      ["롤백(ROLLBACK)", "트랜잭션을 취소하고 변경 이전 상태로 되돌리는 것"],
      ["NoSQL", "테이블 대신 문서·키-값 등 유연한 구조로 저장하는 비관계형 데이터베이스"],
      ["ORM", "코드의 객체와 DB 테이블을 매핑해 SQL 없이 DB를 다루게 해주는 기술"],
      ["N+1 문제", "목록 조회 1번 후 각 항목의 연관 데이터를 N번 추가 조회하는 성능 문제"]
    ],
    quiz: [
      { type: "mc", q: "다른 테이블의 기본 키를 참조하는 컬럼은?", options: ["기본 키", "외래 키", "인덱스", "유니크 키"], answer: 1, explain: "외래 키(FK)는 다른 테이블의 PK를 참조해 테이블 간 관계를 만듭니다." },
      { type: "mc", q: "계좌 이체 중 출금은 성공했는데 입금에서 오류가 났다. 출금까지 취소되어야 하는 이유와 관련된 ACID 속성은?", options: ["원자성", "일관성", "격리성", "지속성"], answer: 0, explain: "원자성(Atomicity): 트랜잭션은 전부 성공하거나 전부 실패해야 합니다." },
      { type: "ox", q: "인덱스를 많이 만들수록 조회와 쓰기 성능이 모두 좋아진다.", answer: false, explain: "인덱스는 조회를 빠르게 하지만, 쓰기 시 인덱스도 함께 갱신해야 하므로 쓰기 성능은 떨어지고 저장 공간도 사용합니다." },
      { type: "mc", q: "왼쪽 테이블의 모든 행을 유지하면서 오른쪽 테이블에서 매칭되는 행을 붙이는 JOIN은?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], answer: 1, explain: "LEFT JOIN은 왼쪽 행을 모두 가져오고, 매칭이 없으면 오른쪽 값은 NULL입니다." },
      { type: "mc", q: "게시글 10개를 조회한 뒤, 각 게시글의 작성자를 1개씩 추가 조회해 총 11번 쿼리가 실행됐다. 이 문제는?", options: ["데드락", "N+1 문제", "SQL Injection", "캐시 스탬피드"], answer: 1, explain: "목록 1번 + 연관 데이터 N번 = N+1 문제입니다. JOIN이나 일괄 조회(IN 절)로 해결합니다." },
      { type: "ox", q: "정규화의 주된 목적은 데이터 중복을 줄이고 이상 현상을 방지하는 것이다.", answer: true, explain: "정규화로 테이블을 분리하면 중복이 줄어 수정·삽입·삭제 이상을 막을 수 있습니다." },
      { type: "mc", q: "다음 중 문서형(Document) NoSQL 데이터베이스는?", options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"], answer: 1, explain: "MongoDB는 JSON과 유사한 문서를 저장하는 대표적인 문서형 NoSQL입니다. 나머지는 RDB입니다." }
    ],
    summary: [
      "RDB는 테이블(행·열)로 저장. PK는 행 식별, FK는 다른 테이블 참조.",
      "SQL CRUD = SELECT / INSERT / UPDATE / DELETE. UPDATE·DELETE엔 WHERE 필수.",
      "정규화는 중복 제거, 반정규화는 조회 성능을 위해 중복 허용.",
      "인덱스(B-Tree)는 조회↑ 쓰기↓. 자주 검색하는 컬럼에 사용.",
      "트랜잭션은 전부 성공/전부 실패. ACID = 원자성·일관성·격리성·지속성.",
      "NoSQL은 유연한 스키마·수평 확장. ORM 사용 시 N+1 문제에 주의."
    ]
  },

  {
    id: 5,
    title: "인증과 보안",
    desc: "인증·인가, JWT, OAuth, 해싱, 웹 공격, CORS",
    concepts: [
      {
        title: "인증 vs 인가",
        body: `<p><b>인증(Authentication)</b>: "<b>누구</b>인가?" 를 확인 → 로그인<br><b>인가(Authorization)</b>: "<b>무엇을 할 수 있는가?</b>" 를 확인 → 권한 검사</p>
<p>예: 회사 출입증으로 건물에 들어가는 것 = 인증, 출입증 등급에 따라 서버실 출입 가능 여부 = 인가</p>
<p class="tip">💡 인증 실패 → 401, 인가 실패 → 403</p>`
      },
      {
        title: "세션 기반 vs 토큰 기반 인증",
        body: `<table><tr><th></th><th>세션 기반</th><th>토큰 기반(JWT)</th></tr>
<tr><td>상태 저장</td><td>서버(세션 저장소)</td><td>클라이언트(토큰)</td></tr>
<tr><td>확장성</td><td>서버가 여러 대면 세션 공유 필요(Redis 등)</td><td>서버가 상태를 안 가져 확장 쉬움</td></tr>
<tr><td>강제 로그아웃</td><td>세션 삭제로 쉬움</td><td>토큰 만료 전엔 어려움</td></tr></table>
<p>토큰 방식은 보통 <b>Access Token</b>(짧은 만료, 예: 30분)과 <b>Refresh Token</b>(긴 만료, Access Token 재발급용)을 함께 사용합니다.</p>`
      },
      {
        title: "JWT 구조",
        body: `<p><b>JWT</b>(JSON Web Token)는 <code>헤더.페이로드.서명</code> 세 부분을 점으로 이은 문자열입니다.</p>
<pre>eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiIxIiwicm9sZSI6InVzZXIifQ . SflKxwRJ...
     Header                     Payload                    Signature
 (알고리즘)              (사용자 id, 권한, 만료시간)     (위변조 검증)</pre>
<ul><li>Payload는 Base64로 <b>인코딩만</b> 되어 있어 누구나 읽을 수 있음 → <b>비밀번호 등 민감정보 금지</b></li><li>Signature는 서버의 비밀키로 만들어서, 내용이 바뀌면 검증 실패</li><li>요청 시 <code>Authorization: Bearer &lt;토큰&gt;</code> 헤더로 전송</li></ul>`
      },
      {
        title: "OAuth 2.0",
        body: `<p><b>OAuth 2.0</b>은 비밀번호를 넘기지 않고 <b>다른 서비스(구글, 카카오 등)의 권한을 위임</b>받는 표준입니다. "카카오로 로그인" 기능이 대표적입니다.</p>
<ol><li>사용자가 "카카오로 로그인" 클릭 → 카카오 로그인 페이지로 이동</li><li>사용자가 동의하면 카카오가 우리 서버로 <b>인가 코드</b> 전달</li><li>우리 서버가 인가 코드로 카카오에 <b>Access Token</b> 요청</li><li>토큰으로 사용자 정보 조회 → 우리 서비스 회원가입/로그인 처리</li></ol>`
      },
      {
        title: "비밀번호 저장: 해싱과 솔트",
        body: `<p>비밀번호는 절대 평문으로 저장하지 않습니다. <b>해싱</b>(단방향 변환)한 값을 저장합니다.</p>
<ul><li><b>암호화</b>: 키로 복호화 가능 (양방향) — 주민번호, 카드번호 등</li><li><b>해싱</b>: 원래 값으로 되돌릴 수 없음 (단방향) — 비밀번호</li><li><b>솔트(Salt)</b>: 해싱 전에 붙이는 랜덤 값. 같은 비밀번호도 다른 해시가 되어 레인보우 테이블 공격을 막음</li></ul>
<p class="tip">💡 비밀번호에는 MD5/SHA-256 단독 대신 일부러 느리게 설계된 <b>bcrypt, scrypt, Argon2</b>를 사용합니다.</p>`
      },
      {
        title: "주요 웹 공격과 CORS",
        body: `<ul><li><b>SQL Injection</b>: 입력값에 SQL을 끼워 넣어 DB를 조작<br><code>' OR '1'='1</code> → 해결: <b>Prepared Statement(파라미터 바인딩)</b>, ORM 사용</li>
<li><b>XSS</b>: 게시글 등에 악성 스크립트를 심어 다른 사용자 브라우저에서 실행 → 해결: 출력 시 <b>이스케이프</b>, HttpOnly 쿠키, CSP</li>
<li><b>CSRF</b>: 로그인된 사용자가 모르게 위조된 요청을 보내게 함 → 해결: <b>CSRF 토큰</b>, SameSite 쿠키</li></ul>
<p><b>CORS</b>(Cross-Origin Resource Sharing): 브라우저는 기본적으로 다른 출처(도메인·포트·프로토콜이 다른 곳)로의 요청 응답을 막습니다(동일 출처 정책). 서버가 <code>Access-Control-Allow-Origin</code> 헤더로 허용할 출처를 지정해야 합니다.</p>`
      }
    ],
    terms: [
      ["인증(Authentication)", "사용자가 누구인지 확인하는 과정 (로그인)"],
      ["인가(Authorization)", "인증된 사용자가 특정 자원에 접근할 권한이 있는지 확인하는 과정"],
      ["JWT", "헤더.페이로드.서명으로 구성된, 서명으로 위변조를 검증하는 토큰"],
      ["Access Token", "API 접근에 사용하는 짧은 만료 시간의 토큰"],
      ["Refresh Token", "Access Token이 만료되었을 때 재발급받기 위한 긴 만료 시간의 토큰"],
      ["OAuth 2.0", "비밀번호 공유 없이 제3자 서비스에 권한을 위임하는 표준 (소셜 로그인)"],
      ["해싱", "원래 값으로 되돌릴 수 없는 단방향 변환. 비밀번호 저장에 사용"],
      ["솔트(Salt)", "해싱 전에 덧붙이는 랜덤 값. 같은 입력도 다른 해시가 되게 함"],
      ["암호화", "키를 사용해 데이터를 변환하며, 키로 복호화할 수 있는 양방향 변환"],
      ["SQL Injection", "입력값에 SQL 구문을 삽입해 데이터베이스를 조작하는 공격"],
      ["XSS", "웹 페이지에 악성 스크립트를 삽입해 다른 사용자의 브라우저에서 실행시키는 공격"],
      ["CSRF", "로그인한 사용자가 의도하지 않은 요청을 보내도록 위조하는 공격"],
      ["CORS", "다른 출처의 요청을 서버가 헤더로 허용해주는 브라우저 보안 정책"],
      ["Prepared Statement", "SQL 구조와 입력값을 분리해 바인딩하여 SQL Injection을 막는 방식"]
    ],
    quiz: [
      { type: "mc", q: "'사용자가 누구인지 확인하는 것'을 뜻하는 용어는?", options: ["인가", "인증", "암호화", "검증"], answer: 1, explain: "인증(Authentication)은 신원 확인, 인가(Authorization)는 권한 확인입니다." },
      { type: "ox", q: "JWT의 Payload는 암호화되어 있으므로 비밀번호를 넣어도 안전하다.", answer: false, explain: "Payload는 Base64 인코딩일 뿐 누구나 디코딩해서 읽을 수 있습니다. 민감정보를 넣으면 안 됩니다." },
      { type: "mc", q: "비밀번호를 DB에 저장하는 가장 올바른 방법은?", options: ["평문 저장", "Base64 인코딩 후 저장", "AES로 암호화해 저장", "솔트를 붙여 bcrypt로 해싱해 저장"], answer: 3, explain: "비밀번호는 복원할 필요가 없으므로 솔트 + 느린 해시 함수(bcrypt 등)로 단방향 해싱합니다." },
      { type: "mc", q: "SQL Injection을 막는 가장 기본적인 방법은?", options: ["HTTPS 사용", "Prepared Statement(파라미터 바인딩)", "CORS 설정", "쿠키에 HttpOnly 설정"], answer: 1, explain: "SQL 구조와 입력값을 분리해 바인딩하면 입력값이 SQL로 해석되지 않습니다." },
      { type: "mc", q: "프론트(localhost:3000)에서 API(localhost:8080)를 호출했더니 브라우저에서 차단되었다. 원인과 관련된 개념은?", options: ["CSRF", "CORS", "XSS", "DNS"], answer: 1, explain: "포트가 다르면 다른 출처입니다. 서버가 Access-Control-Allow-Origin 헤더로 허용해줘야 합니다." },
      { type: "ox", q: "Refresh Token은 Access Token보다 만료 시간이 길다.", answer: true, explain: "Access Token은 짧게(탈취 피해 최소화), Refresh Token은 길게 두고 Access Token 재발급에 사용합니다." },
      { type: "mc", q: "게시판에 <script>를 심어 다른 사용자의 쿠키를 탈취하는 공격은?", options: ["XSS", "CSRF", "SQL Injection", "DDoS"], answer: 0, explain: "XSS(Cross-Site Scripting)입니다. 출력 이스케이프, HttpOnly 쿠키, CSP로 방어합니다." }
    ],
    summary: [
      "인증 = 누구인가(401), 인가 = 권한이 있는가(403).",
      "세션은 서버에 상태 저장, JWT는 클라이언트가 토큰 보관(확장 쉬움).",
      "JWT = Header.Payload.Signature. Payload는 누구나 읽을 수 있음.",
      "Access Token은 짧게, Refresh Token은 길게. OAuth 2.0 = 소셜 로그인.",
      "비밀번호는 솔트 + bcrypt로 해싱(단방향). 암호화는 양방향.",
      "SQL Injection → Prepared Statement, XSS → 이스케이프, CSRF → 토큰. CORS는 다른 출처 허용 정책."
    ]
  },

  {
    id: 6,
    title: "서버 아키텍처와 성능",
    desc: "모놀리식·MSA, 확장, 로드밸런서, 캐시, 메시지 큐",
    concepts: [
      {
        title: "웹 서버와 WAS",
        body: `<p><b>웹 서버</b>(Nginx, Apache): 정적 파일(HTML, 이미지) 제공, 요청을 뒤쪽 서버로 전달<br><b>WAS</b>(Tomcat, Node.js 앱, Django 등): 비즈니스 로직 실행, DB 연동 등 <b>동적 처리</b></p>
<pre>클라이언트 → [Nginx: 리버스 프록시] → [WAS ×N] → [DB]</pre>
<p><b>리버스 프록시</b>: 클라이언트 대신 요청을 받아 내부 서버로 전달. SSL 처리, 로드 밸런싱, 캐싱, 내부 서버 숨김 역할을 합니다.</p>`
      },
      {
        title: "모놀리식 vs 마이크로서비스(MSA)",
        body: `<p><b>모놀리식</b>: 모든 기능을 하나의 애플리케이션으로 개발·배포<br>✅ 개발·배포·디버깅이 단순 &nbsp; ❌ 커지면 수정 영향 범위가 크고 부분 확장이 어려움</p>
<p><b>MSA</b>: 기능별(회원, 주문, 결제…)로 독립된 작은 서비스로 나눔<br>✅ 서비스별 독립 배포·확장, 기술 선택 자유 &nbsp; ❌ 서비스 간 통신, 분산 트랜잭션, 운영 복잡도 증가</p>
<p class="tip">💡 처음부터 MSA를 하기보다 모놀리식으로 시작해 필요할 때 분리하는 경우가 많습니다.</p>`
      },
      {
        title: "스케일 업 vs 스케일 아웃",
        body: `<p><b>스케일 업(수직 확장)</b>: 서버 한 대의 CPU·메모리를 더 좋게 → 간단하지만 한계가 있고 비쌈, 단일 장애점</p>
<p><b>스케일 아웃(수평 확장)</b>: 서버 대수를 늘림 → 이론상 무한 확장, 장애에 강함. 단, <b>서버가 상태를 갖지 않도록(Stateless)</b> 설계해야 함 (세션은 Redis 등 외부 저장소로)</p>
<p><b>로드 밸런서</b>: 여러 서버에 요청을 나눠주는 장치. 라운드 로빈, 최소 연결 등의 알고리즘을 쓰고, <b>헬스 체크</b>로 죽은 서버는 제외합니다.</p>`
      },
      {
        title: "캐시",
        body: `<p><b>캐시</b>는 자주 쓰는 데이터를 <b>빠른 저장소(메모리)</b>에 임시 보관해 DB 부하를 줄이고 응답을 빠르게 합니다. 대표: <b>Redis</b>, Memcached</p>
<pre>// Cache-Aside (Look-aside) 패턴
data = cache.get(key)
if (data 없음) {            // 캐시 미스
  data = db.query(...)
  cache.set(key, data, TTL)
}
return data                 // 캐시 히트면 DB 안 감</pre>
<ul><li><b>TTL</b>: 캐시 만료 시간</li><li><b>캐시 무효화</b>: 원본이 바뀌면 캐시도 삭제/갱신해야 함 (어려운 문제!)</li><li>적합: 자주 읽고 잘 안 바뀌는 데이터 (상품 정보, 랭킹)</li></ul>`
      },
      {
        title: "메시지 큐와 비동기 처리",
        body: `<p><b>메시지 큐</b>는 작업을 큐에 넣어두고 다른 서버(컨슈머)가 꺼내서 <b>비동기로 처리</b>하게 합니다. (Kafka, RabbitMQ, AWS SQS)</p>
<pre>[주문 API] --"주문완료" 메시지--> [Queue] --> [메일 발송 워커]
                                         --> [포인트 적립 워커]</pre>
<ul><li>응답 속도 향상: 오래 걸리는 작업(메일, 이미지 처리)을 뒤로 미룸</li><li>결합도 감소: 생산자와 소비자가 서로 몰라도 됨</li><li>트래픽 완충: 순간 폭주를 큐가 흡수</li></ul>`
      },
      {
        title: "CDN과 성능 지표",
        body: `<p><b>CDN</b>(Content Delivery Network): 전 세계에 분산된 서버에 이미지·JS·영상 같은 정적 파일을 캐시해 <b>사용자와 가까운 곳에서</b> 제공합니다. (CloudFront, Cloudflare)</p>
<p><b>성능 지표</b></p>
<ul><li><b>Latency(지연 시간)</b>: 요청 하나가 응답까지 걸리는 시간</li><li><b>Throughput(처리량)</b>: 단위 시간당 처리하는 요청 수 (TPS, RPS)</li><li><b>가용성</b>: 서비스가 정상 동작하는 시간 비율 (99.9% = 연간 약 8.7시간 다운)</li></ul>
<p class="tip">💡 <b>단일 장애점(SPOF)</b>: 그 하나가 죽으면 전체가 멈추는 지점. 이중화로 제거합니다.</p>`
      }
    ],
    terms: [
      ["웹 서버", "정적 파일을 제공하고 요청을 뒤쪽 서버로 전달하는 서버 (Nginx, Apache)"],
      ["WAS", "비즈니스 로직을 실행해 동적인 응답을 만드는 애플리케이션 서버 (Tomcat 등)"],
      ["리버스 프록시", "클라이언트 요청을 대신 받아 내부 서버로 전달하는 서버"],
      ["모놀리식", "모든 기능을 하나의 애플리케이션으로 개발·배포하는 구조"],
      ["MSA", "기능별로 독립적으로 배포 가능한 작은 서비스들로 나눈 아키텍처"],
      ["스케일 업", "서버 한 대의 성능(CPU, 메모리)을 높이는 수직 확장"],
      ["스케일 아웃", "서버 대수를 늘려 부하를 나누는 수평 확장"],
      ["로드 밸런서", "들어오는 요청을 여러 서버에 고르게 분배하는 장치"],
      ["캐시", "자주 쓰는 데이터를 빠른 저장소에 임시 보관해 응답 속도를 높이는 기법"],
      ["Redis", "메모리 기반 키-값 저장소. 캐시·세션 저장소로 많이 사용"],
      ["TTL", "캐시나 DNS 레코드 등의 데이터가 유효한 시간(만료 시간)"],
      ["메시지 큐", "메시지를 큐에 저장해 생산자와 소비자가 비동기로 통신하게 하는 미들웨어"],
      ["CDN", "정적 파일을 전 세계 분산 서버에 캐시해 사용자 가까이에서 제공하는 네트워크"],
      ["SPOF", "그 하나가 장애 나면 전체 시스템이 멈추는 단일 장애점"],
      ["Latency", "요청 하나가 응답을 받기까지 걸리는 지연 시간"],
      ["Throughput", "단위 시간당 처리할 수 있는 요청(작업)의 양"]
    ],
    quiz: [
      { type: "mc", q: "서버 대수를 늘려서 트래픽을 분산하는 확장 방식은?", options: ["스케일 업", "스케일 아웃", "샤딩", "레플리케이션"], answer: 1, explain: "서버 성능을 올리는 것은 스케일 업(수직), 서버 수를 늘리는 것은 스케일 아웃(수평)입니다." },
      { type: "ox", q: "스케일 아웃을 하려면 서버가 로그인 세션 등 상태를 각자 메모리에 들고 있는 것이 좋다.", answer: false, explain: "서버가 여러 대면 요청이 다른 서버로 갈 수 있으므로, 서버는 Stateless로 두고 세션은 Redis 같은 외부 저장소에 둡니다." },
      { type: "mc", q: "캐시에서 데이터를 먼저 찾고, 없으면 DB에서 읽어 캐시에 저장하는 패턴은?", options: ["Write-Through", "Cache-Aside", "Write-Back", "Read-Replica"], answer: 1, explain: "Cache-Aside(Look-aside)는 가장 널리 쓰이는 캐시 읽기 전략입니다." },
      { type: "mc", q: "회원가입 후 환영 메일 발송을 응답과 분리해 비동기로 처리하려 할 때 적합한 것은?", options: ["CDN", "메시지 큐", "인덱스", "리버스 프록시"], answer: 1, explain: "메시지 큐에 작업을 넣고 워커가 처리하면 API 응답이 빨라지고 결합도가 낮아집니다." },
      { type: "mc", q: "다음 중 MSA의 단점으로 가장 적절한 것은?", options: ["서비스별 독립 배포 가능", "서비스별 독립 확장 가능", "서비스 간 통신과 운영 복잡도 증가", "기술 스택을 서비스별로 선택 가능"], answer: 2, explain: "MSA는 독립성이 장점이지만, 네트워크 통신·분산 트랜잭션·모니터링 등 운영 복잡도가 커집니다." },
      { type: "ox", q: "CDN은 정적 파일을 사용자와 가까운 서버에서 제공해 응답 속도를 높인다.", answer: true, explain: "CDN은 엣지 서버에 콘텐츠를 캐시해 지리적으로 가까운 곳에서 응답합니다." }
    ],
    summary: [
      "웹 서버(Nginx)는 정적 파일·리버스 프록시, WAS는 동적 비즈니스 로직.",
      "모놀리식은 단순, MSA는 독립 배포·확장 가능하지만 운영 복잡.",
      "스케일 업 = 성능 향상(수직), 스케일 아웃 = 대수 증가(수평, Stateless 필수).",
      "로드 밸런서가 요청 분산 + 헬스 체크.",
      "캐시(Redis)는 Cache-Aside 패턴 + TTL. 무효화에 주의.",
      "메시지 큐로 비동기 처리·결합도 감소. CDN으로 정적 파일 가속. SPOF는 이중화로 제거."
    ]
  },

  {
    id: 7,
    title: "운영체제와 동시성",
    desc: "프로세스·스레드, 동기·비동기, 락, 데드락, 풀",
    concepts: [
      {
        title: "프로세스와 스레드",
        body: `<p><b>프로세스</b>: 실행 중인 프로그램. 각자 <b>독립된 메모리 공간</b>을 가짐<br><b>스레드</b>: 프로세스 안의 실행 흐름 단위. 같은 프로세스의 스레드끼리 <b>메모리(힙)를 공유</b></p>
<table><tr><th></th><th>프로세스</th><th>스레드</th></tr>
<tr><td>메모리</td><td>독립</td><td>공유 (스택만 별도)</td></tr>
<tr><td>생성·전환 비용</td><td>큼</td><td>작음</td></tr>
<tr><td>안정성</td><td>하나 죽어도 다른 프로세스 영향 적음</td><td>하나 문제 시 프로세스 전체 영향</td></tr></table>
<p><b>컨텍스트 스위칭</b>: CPU가 실행 대상을 바꿀 때 상태를 저장·복원하는 작업. 많을수록 오버헤드.</p>`
      },
      {
        title: "동기 vs 비동기, 블로킹 vs 논블로킹",
        body: `<p><b>동기(Sync)</b>: 작업이 끝날 때까지 기다렸다가 다음 작업 진행<br><b>비동기(Async)</b>: 작업을 맡겨두고 다른 일을 하다가 완료되면 콜백·이벤트로 결과를 받음</p>
<p><b>블로킹</b>: 호출한 쪽이 결과가 올 때까지 <b>멈춰서</b> 기다림<br><b>논블로킹</b>: 호출 즉시 반환되어 다른 일을 계속할 수 있음</p>
<pre>// 비동기 예 (JavaScript)
const user = await fetch('/api/user');  // 기다리는 동안 다른 요청 처리 가능</pre>
<p class="tip">💡 Node.js는 <b>싱글 스레드 + 이벤트 루프 + 논블로킹 I/O</b>로 많은 동시 요청을 처리합니다. Spring MVC는 전통적으로 <b>요청당 스레드</b> 모델입니다.</p>`
      },
      {
        title: "동시성 vs 병렬성",
        body: `<p><b>동시성(Concurrency)</b>: 여러 작업을 번갈아 실행해 <b>동시에 진행되는 것처럼</b> 보이게 함 (싱글 코어로도 가능)</p>
<p><b>병렬성(Parallelism)</b>: 여러 작업을 <b>실제로 같은 순간에</b> 실행 (멀티 코어 필요)</p>
<pre>동시성:  A A B B A B A   (한 코어에서 번갈아)
병렬성:  코어1: A A A A
         코어2: B B B B</pre>`
      },
      {
        title: "경쟁 상태와 락",
        body: `<p><b>경쟁 상태(Race Condition)</b>: 여러 스레드가 공유 자원을 동시에 수정해 결과가 실행 순서에 따라 달라지는 문제</p>
<pre>재고 = 1
스레드A: 재고 읽음(1) → 1 > 0 이므로 판매 → 재고 = 0
스레드B: 재고 읽음(1) → 1 > 0 이므로 판매 → 재고 = 0
→ 1개 재고로 2개 판매! 😱</pre>
<p>해결: <b>임계 영역</b>(공유 자원 접근 코드)을 한 번에 하나만 실행하도록 <b>락(Lock)/뮤텍스</b>, 세마포어 사용. DB에서는 <b>비관적 락</b>(SELECT ... FOR UPDATE), <b>낙관적 락</b>(version 컬럼으로 충돌 감지)을 사용합니다.</p>`
      },
      {
        title: "데드락 (교착 상태)",
        body: `<p><b>데드락</b>: 두 개 이상의 작업이 서로가 가진 자원을 기다리며 <b>영원히 멈춘</b> 상태</p>
<pre>스레드A: 락1 보유 → 락2 기다림
스레드B: 락2 보유 → 락1 기다림   → 둘 다 영원히 대기</pre>
<p><b>발생 4조건</b> (모두 만족해야 발생)</p>
<ol><li>상호 배제: 자원은 한 번에 하나만 사용</li><li>점유와 대기: 자원을 가진 채 다른 자원을 기다림</li><li>비선점: 남의 자원을 강제로 빼앗을 수 없음</li><li>순환 대기: 서로 꼬리를 물고 기다림</li></ol>
<p class="tip">💡 해결: 락을 항상 <b>같은 순서</b>로 획득, 타임아웃 설정 등으로 조건 중 하나를 깨뜨립니다.</p>`
      },
      {
        title: "스레드 풀과 커넥션 풀",
        body: `<p>스레드나 DB 연결을 요청마다 새로 만들면 비용이 큽니다. 그래서 <b>미리 만들어두고 재사용</b>합니다.</p>
<ul><li><b>스레드 풀</b>: 정해진 수의 스레드를 만들어두고 작업을 배정 → 스레드 폭증 방지</li><li><b>커넥션 풀</b>: DB 연결을 미리 열어두고 빌려 쓰고 반납 (HikariCP 등)</li></ul>
<p class="tip">⚠️ 풀 크기가 너무 작으면 대기가 길어지고, 너무 크면 DB·메모리에 부담을 줍니다. 커넥션을 반납하지 않으면 <b>커넥션 누수</b>로 서비스가 멈출 수 있습니다.</p>`
      }
    ],
    terms: [
      ["프로세스", "실행 중인 프로그램. 독립된 메모리 공간을 가짐"],
      ["스레드", "프로세스 내의 실행 흐름 단위. 같은 프로세스의 메모리를 공유"],
      ["컨텍스트 스위칭", "CPU가 실행 중인 작업을 바꿀 때 상태를 저장하고 복원하는 과정"],
      ["동기", "작업이 끝날 때까지 기다린 뒤 다음 작업을 진행하는 방식"],
      ["비동기", "작업 완료를 기다리지 않고 진행하며, 결과는 콜백·이벤트 등으로 받는 방식"],
      ["블로킹", "호출한 쪽이 결과가 반환될 때까지 멈춰서 기다리는 것"],
      ["논블로킹", "호출이 즉시 반환되어 호출한 쪽이 다른 작업을 계속할 수 있는 것"],
      ["이벤트 루프", "이벤트 큐의 작업을 하나씩 꺼내 처리하는 반복 구조 (Node.js의 핵심)"],
      ["동시성", "여러 작업을 번갈아 실행해 동시에 진행되는 것처럼 보이게 하는 것"],
      ["병렬성", "여러 작업을 여러 코어에서 실제로 같은 순간에 실행하는 것"],
      ["경쟁 상태", "여러 스레드가 공유 자원에 동시에 접근해 결과가 순서에 따라 달라지는 문제"],
      ["임계 영역", "공유 자원에 접근하는 코드 구간. 한 번에 하나의 스레드만 실행해야 함"],
      ["뮤텍스(락)", "임계 영역에 한 번에 하나의 스레드만 들어가도록 막는 잠금 장치"],
      ["데드락", "두 개 이상의 작업이 서로의 자원을 기다리며 영원히 멈춘 상태"],
      ["커넥션 풀", "DB 연결을 미리 만들어 두고 재사용하는 기법"],
      ["스레드 풀", "스레드를 미리 만들어 두고 작업을 배정해 재사용하는 기법"]
    ],
    quiz: [
      { type: "ox", q: "같은 프로세스 안의 스레드들은 힙 메모리를 공유한다.", answer: true, explain: "스레드는 코드·데이터·힙을 공유하고 스택만 각자 가집니다. 그래서 동기화 문제가 생깁니다." },
      { type: "mc", q: "두 스레드가 서로 상대가 가진 락을 기다리며 멈춘 상태는?", options: ["경쟁 상태", "데드락", "기아 상태", "컨텍스트 스위칭"], answer: 1, explain: "서로의 자원을 기다리며 영원히 진행하지 못하는 상태는 데드락(교착 상태)입니다." },
      { type: "mc", q: "재고가 1개인데 동시에 들어온 두 주문이 모두 성공했다. 이 문제의 원인은?", options: ["데드락", "경쟁 상태(Race Condition)", "N+1 문제", "캐시 미스"], answer: 1, explain: "여러 스레드가 공유 자원(재고)을 동시에 읽고 수정한 경쟁 상태입니다. 락이나 DB 락으로 해결합니다." },
      { type: "mc", q: "싱글 코어 CPU에서 여러 작업을 번갈아 실행해 동시에 처리되는 것처럼 보이게 하는 것은?", options: ["병렬성", "동시성", "분산 처리", "멀티 프로세싱"], answer: 1, explain: "동시성은 번갈아 실행(논리적 동시), 병렬성은 실제 동시 실행(멀티 코어)입니다." },
      { type: "ox", q: "데드락 발생 4조건 중 하나만 깨뜨려도 데드락을 예방할 수 있다.", answer: true, explain: "데드락은 상호배제·점유와 대기·비선점·순환 대기가 모두 만족될 때 발생하므로, 하나만 깨도 예방됩니다." },
      { type: "mc", q: "DB 연결을 미리 만들어 두고 빌려 쓰고 반납하는 기법은?", options: ["커넥션 풀", "캐시", "샤딩", "인덱스"], answer: 0, explain: "커넥션 풀은 연결 생성 비용을 줄입니다. (예: HikariCP)" }
    ],
    summary: [
      "프로세스는 독립 메모리, 스레드는 프로세스 메모리 공유(스택만 별도).",
      "동기/비동기 = 결과를 기다리나, 블로킹/논블로킹 = 호출자가 멈추나.",
      "Node.js는 싱글 스레드 + 이벤트 루프 + 논블로킹 I/O.",
      "동시성은 번갈아 실행, 병렬성은 실제 동시에 실행(멀티 코어).",
      "경쟁 상태는 락/뮤텍스로 해결. DB는 비관적 락·낙관적 락.",
      "데드락 4조건: 상호배제·점유대기·비선점·순환대기. 스레드 풀·커넥션 풀로 재사용."
    ]
  },

  {
    id: 8,
    title: "개발·배포·운영",
    desc: "Git, 테스트, CI/CD, Docker, 클라우드, 모니터링",
    concepts: [
      {
        title: "Git과 협업",
        body: `<p><b>Git</b>은 코드 변경 이력을 관리하는 <b>분산 버전 관리 시스템</b>입니다.</p>
<pre>git clone &lt;url&gt;            # 저장소 복제
git checkout -b feature/login  # 브랜치 생성
git add . && git commit -m "로그인 API 추가"
git push origin feature/login  # 원격에 올리기
# → GitHub에서 Pull Request 생성 → 코드 리뷰 → main에 merge</pre>
<ul><li><b>브랜치</b>: 독립된 작업 공간</li><li><b>Pull Request(PR)</b>: 내 브랜치를 합쳐달라는 요청 + 코드 리뷰</li><li><b>충돌(Conflict)</b>: 같은 부분을 서로 다르게 고쳤을 때 수동으로 해결</li></ul>`
      },
      {
        title: "테스트",
        body: `<ul><li><b>단위 테스트(Unit)</b>: 함수·클래스 하나를 독립적으로 검증. 빠르고 많이 작성</li><li><b>통합 테스트(Integration)</b>: DB, 외부 API 등 여러 구성요소가 함께 잘 동작하는지 검증</li><li><b>E2E 테스트</b>: 사용자 입장에서 전체 흐름을 검증. 느리고 적게 작성</li></ul>
<p><b>테스트 피라미드</b>: 단위 테스트를 가장 많이, E2E를 가장 적게.</p>
<p><b>Mock</b>: 외부 의존성(결제 API 등)을 가짜 객체로 대체해 테스트를 독립적으로 만듦</p>
<p class="tip">💡 <b>TDD</b>: 실패하는 테스트 작성 → 통과하는 코드 작성 → 리팩터링 순환</p>`
      },
      {
        title: "CI/CD",
        body: `<p><b>CI (지속적 통합)</b>: 코드를 push할 때마다 자동으로 <b>빌드 + 테스트</b>해서 문제를 빨리 발견</p>
<p><b>CD (지속적 배포/전달)</b>: 테스트를 통과한 코드를 자동으로 서버에 <b>배포</b></p>
<pre>push → [빌드] → [테스트] → [Docker 이미지 생성] → [배포]
         (GitHub Actions, Jenkins, GitLab CI)</pre>
<p><b>배포 전략</b></p>
<ul><li><b>롤링</b>: 서버를 하나씩 순차 교체</li><li><b>블루-그린</b>: 새 환경(그린)을 띄우고 트래픽을 한 번에 전환, 문제 시 즉시 롤백</li><li><b>카나리</b>: 일부 사용자에게만 먼저 배포해 검증 후 확대</li></ul>`
      },
      {
        title: "Docker와 컨테이너",
        body: `<p>"내 컴퓨터에선 되는데요?" 문제를 해결합니다. <b>앱 + 실행 환경</b>을 통째로 묶어 어디서나 똑같이 실행합니다.</p>
<ul><li><b>이미지</b>: 실행 환경의 설계도(읽기 전용 템플릿)</li><li><b>컨테이너</b>: 이미지를 실행한 인스턴스</li><li><b>Dockerfile</b>: 이미지를 만드는 명령 모음</li></ul>
<pre>FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]</pre>
<p><b>VM vs 컨테이너</b>: VM은 OS 전체를 가상화(무거움), 컨테이너는 호스트 OS 커널을 공유(가볍고 빠름)</p>
<p class="tip">💡 여러 컨테이너 관리: <b>Docker Compose</b>(로컬), <b>Kubernetes</b>(운영 오케스트레이션)</p>`
      },
      {
        title: "클라우드",
        body: `<p>서버를 직접 사지 않고 필요한 만큼 빌려 씁니다. (AWS, GCP, Azure)</p>
<ul><li><b>IaaS</b>: 서버·네트워크 같은 인프라를 빌림 (AWS EC2)</li><li><b>PaaS</b>: 플랫폼까지 제공, 코드만 올림 (Heroku, Elastic Beanstalk)</li><li><b>SaaS</b>: 완성된 소프트웨어를 사용 (Gmail, Slack)</li></ul>
<table><tr><th>AWS 서비스</th><th>역할</th></tr>
<tr><td>EC2</td><td>가상 서버</td></tr><tr><td>S3</td><td>파일(객체) 저장소</td></tr>
<tr><td>RDS</td><td>관리형 관계형 DB</td></tr><tr><td>Lambda</td><td>서버리스 함수 실행</td></tr></table>`
      },
      {
        title: "설정, 로깅, 모니터링",
        body: `<p><b>환경 변수</b>: DB 비밀번호, API 키 등은 코드에 하드코딩하지 않고 환경 변수(<code>.env</code>)로 분리합니다. <code>.env</code>는 Git에 올리지 않습니다(<code>.gitignore</code>).</p>
<p><b>로그 레벨</b>: <code>DEBUG &lt; INFO &lt; WARN &lt; ERROR</code> — 운영에서는 보통 INFO 이상만 기록</p>
<p><b>모니터링</b>: CPU, 메모리, 응답 시간, 에러율 등을 지표로 수집하고 이상 시 알림 (Prometheus + Grafana, Datadog, CloudWatch)</p>
<p class="tip">💡 관측 가능성(Observability)의 3요소: <b>로그, 메트릭, 트레이스</b></p>`
      }
    ],
    terms: [
      ["Git", "코드 변경 이력을 관리하는 분산 버전 관리 시스템"],
      ["브랜치", "기존 코드에 영향을 주지 않고 독립적으로 작업하기 위한 갈래"],
      ["Pull Request", "작업한 브랜치를 합쳐달라고 요청하고 코드 리뷰를 받는 기능"],
      ["단위 테스트", "함수나 클래스 같은 작은 단위를 독립적으로 검증하는 테스트"],
      ["통합 테스트", "여러 구성 요소(DB, 외부 API 등)가 함께 잘 동작하는지 검증하는 테스트"],
      ["Mock", "테스트에서 실제 의존성 대신 사용하는 가짜 객체"],
      ["CI", "코드 변경 시마다 자동으로 빌드·테스트하는 지속적 통합"],
      ["CD", "검증된 코드를 자동으로 배포 환경에 반영하는 지속적 배포/전달"],
      ["블루-그린 배포", "새 환경을 미리 띄우고 트래픽을 한 번에 전환하는 배포 전략"],
      ["카나리 배포", "일부 사용자에게만 먼저 배포해 검증한 뒤 점차 확대하는 배포 전략"],
      ["Docker", "애플리케이션과 실행 환경을 컨테이너로 묶어 실행하는 플랫폼"],
      ["이미지", "컨테이너를 만들기 위한 읽기 전용 템플릿(실행 환경 설계도)"],
      ["컨테이너", "이미지를 실행한 격리된 인스턴스. 호스트 OS 커널을 공유해 가벼움"],
      ["IaaS", "서버·네트워크 등 인프라를 빌려 쓰는 클라우드 서비스 모델 (EC2)"],
      ["환경 변수", "비밀번호·API 키 등 설정 값을 코드 밖에서 주입하는 변수"],
      ["모니터링", "서버의 지표(CPU, 응답 시간, 에러율 등)를 수집·관찰하고 이상 시 알리는 활동"]
    ],
    quiz: [
      { type: "mc", q: "코드를 push할 때마다 자동으로 빌드와 테스트를 수행하는 것은?", options: ["CI", "CD", "IaaS", "TDD"], answer: 0, explain: "CI(지속적 통합)는 자동 빌드·테스트, CD는 자동 배포입니다." },
      { type: "mc", q: "새 버전을 일부 사용자(예: 5%)에게만 먼저 배포해 검증하는 전략은?", options: ["롤링 배포", "블루-그린 배포", "카나리 배포", "핫픽스"], answer: 2, explain: "탄광의 카나리아처럼 소수에게 먼저 배포해 위험을 감지하는 카나리 배포입니다." },
      { type: "ox", q: "컨테이너는 VM처럼 각각 독립된 게스트 OS 전체를 포함하므로 무겁다.", answer: false, explain: "컨테이너는 호스트 OS 커널을 공유하므로 VM보다 가볍고 빠르게 실행됩니다." },
      { type: "mc", q: "Docker에서 컨테이너를 만들기 위한 읽기 전용 템플릿은?", options: ["볼륨", "이미지", "네트워크", "레지스트리"], answer: 1, explain: "이미지(설계도)를 실행한 것이 컨테이너입니다." },
      { type: "ox", q: "DB 비밀번호는 환경 변수로 분리하고, .env 파일은 Git에 올리지 않는다.", answer: true, explain: "비밀 정보가 저장소에 노출되지 않도록 .gitignore에 .env를 추가합니다." },
      { type: "mc", q: "AWS에서 이미지·파일을 저장하는 객체 스토리지 서비스는?", options: ["EC2", "RDS", "S3", "Lambda"], answer: 2, explain: "S3는 객체 저장소, EC2는 가상 서버, RDS는 관리형 DB, Lambda는 서버리스 함수입니다." }
    ],
    summary: [
      "Git: 브랜치에서 작업 → PR로 코드 리뷰 → main에 merge.",
      "테스트 피라미드: 단위 테스트 多, 통합 中, E2E 少. 외부 의존성은 Mock.",
      "CI = 자동 빌드·테스트, CD = 자동 배포. 롤링/블루-그린/카나리 배포.",
      "Docker: 이미지(설계도) → 컨테이너(실행). VM보다 가벼움.",
      "클라우드 IaaS/PaaS/SaaS. AWS EC2 서버, S3 파일, RDS DB.",
      "비밀 정보는 환경 변수로. 로그·메트릭·트레이스로 모니터링."
    ]
  }
];
