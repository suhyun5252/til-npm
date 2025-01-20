import { useEffect } from "react";
// import axiosInstance from "./apis/fetch";
import { removeCookie, setCookie } from "./utils/cookie";
import jwtAxios from "./apis/jwt";
// import jwtAxios from "./apis/jwt";
import axios from "axios";
import { useRecoilState } from "recoil";

function App() {
  const [user, setUser] = useRecoilState();
  const loginApi = async () => {
    try {
      // 여기는 일반 axios 로 로그인 하고 jwt 를 발급받는다.
      const res = await axios.post("/api/user/access-token", {
        email: "qgq0520@naver.com",
        upw: "1234",
      });
      console.log(res);
      // 성공시 리턴되는 jwt를 보관한다.
      setCookie("accessToken", res.resultData);
      // 사용자의 정보를 App 전체에 접근하려고 한다.
      // useRecoilState 를 가지고서 앱 전체에서 활용하도록
    } catch (error) {
      console.log(error);
      // 실패시 jwt 를 지워지는 코드 쿠키에서 제거
      removeCookie("accessToken");
    }
  };

  //  jwt 인증키는 반드시 필요로 한 axios 호출
  const userInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      console.log(res);
      setUser({ ...res.data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loginApi();
  }, []);
  return (
    <div>
      <button onClick={userInfo}>JWT 를 활용한 호출</button>
    </div>
  );
}
export default App;
