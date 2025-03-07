import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
// import App from "./App.jsx";
import "./index.css";
// import AniPage from "./pages/AniPage.jsx";
import Framer from "./pages/Framer.jsx";

createRoot(document.getElementById("root")).render(
  // 전연 store 를 활용함.
  <RecoilRoot>
    {/* <AniPage /> */}
    <Framer />
  </RecoilRoot>,
);
