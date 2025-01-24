# JWT 프로젝트 반영

- 사용자 인증은 2가지가 있습니다.
- 세션 인증
- JWT 인증
- 하이브리드 인증(세션 + JWT)

## 1. jwt(JSON Web Token)

- 복잡한 문자열(토큰)을 서버에서 만들어 준다.

## 2. 정석 시나리오

- 사용자가 로그인
- Respaonse 로 2개의 값이 오는게 정석
- accessToken : 서버에서 만들어서 돌려줌
  - api 호출시 첨부함.
- refreshToken : 서버에서 만들어서 돌려줌
  - api 호출시 401 (Unauthorized) 일 때 사용함 : 인증만료가 되었다.
  - 인증키 즉 accessToken 이 만료시 새로 요청해서
  - 새로운 accessToken, refreshToken 을 받아오는 용도
- 2개의 값을 클라이언트가 보관(Recoil, Context, Cookie 등)
- api 를 호출할 때 /api/tourlist 할 때 accessToken 을 함께 보내줌

## 3. 시나리오 2

- 사용자가 로그인 후
- Response 로 accessToken 만 온 경우
- refreshToken이 없다..
- 서버관리자가 15분마다 accessToken 을 만료 시켜버림.

## 4. accessToken 만 있는 경우 처리방법

### 4.1. 만료되면 logout 즉, 로그인 화면으로 이동시키는 방법

### 4.2. 만료되면 다시 accessToken 을 요청하고 다시 새로운 토큰 axios 호출한다.

## 4. 필요한 npm 들

- axios
- react-cookie

## 5. 로그인 후 jwt 정보 관리하기

```jsx
import axios from "axios";
import { useRecoilState } from "recoil";
import { setCookie } from "./utils/cookie";
import { LoginInfoState } from "./atoms/userInfo";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(LoginInfoState);
  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data);
      // 리코일에 전체 저장
      setLoginInfo(res.data.resultData);
      // 쿠키에 보관하기
      setCookie("accessToken", res.data.resultData.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        로그인
      </button>
      <p>인증키 : {loginInfo?.accessToken}</p>
    </div>
  );
}
export default App;
```

## 6. jwt 정보에 있는 accessToken 을 이용해서 API 호출하기

- axios 호출시 header 에 Authrization 에 Bearer 로 담는다
- 만약 401 즉, 만료가 오면
- 대응법 1: 로그인으로 다시 이동
- 대응법 2: 토큰 재발급 후 다시 axios 호출

```jsx
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { getCookie, removeCookie, setCookie } from "./utils/cookie";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data);
      // 리코일에 전체 저장
      setLoginInfo(res.data.resultData);
      // 쿠키에 보관하기
      setCookie("accessToken", res.data.resultData.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        로그인
      </button>
      <p>인증키 : {loginInfo?.accessToken}</p>

      <Test />
    </div>
  );
}
export default App;

function Test() {
  // 리코일
  const [liginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const callFn = async () => {
    try {
      // accessToken 을 담아서 보내기
      // 리코일에서 찾기
      // const accessToken = liginInfo.accessToken;
      // 쿠키에서 찾기
      const accessToken = getCookie("accessToken");
      // console.log(accessToken);
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      // 만약에 인증키 만료라면 UnAuthorized
      if (res.status === 401) {
        // 인증키가 만료되었다고 온다면
        // 선택을 해야 한다.
        // 1번 케이스 : 강제로 로그인 이동
        //alert("다시 로그인을 해주세요.");
        // alert("라우터로 login 창으로 이동시킨다.");
        // removeCookie("accessToken");
        // setLoginInfo({});
        // 2번 케이스 : 다시 accessToken 을 받자.
        resetToken();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetToken = async () => {
    try {
      const res = await axios.get("/api/user/access-token");
      console.log(res);
      setCookie("accessToken");
      setLoginInfo(prev => ({
        ...prev,
        accessToken: res.data.ressulData.accessToken,
      }));
      // 원래하려던 API 다시 호출
      callFn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>테스트</h1>
      <button onClick={() => callFn()}>api 호출</button>
    </div>
  );
}
```
