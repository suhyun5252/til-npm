import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const loginSchema = yup.object({
  uid: yup.string().required("이름은 필수 입니다."),
  umail: yup
    .string()
    .required("이메일은 필수 입니다.")
    .email("유효한 이메일을 입력하세요."),
  upw: yup
    .string()
    .required("비밀번호는 필수 입니다.")
    .min(4, "비밀번호는 최소 4자리입니다."),
  ufile: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
  userimg: yup
    .mixed()
    .test("required", "사용자 이미지는 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
});

function App() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      uid: "",
      umail: "",
      upw: "",
      userimg: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("umail", "a@a.net");
  }, []);

  const handleSubmitForm = data => {
    // 모아서 전송할 데이터(axios.past 전송)
    console.log(data);
  };

  useEffect(() => {
    // trigger();
  }, [trigger]);

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>아이디</label>
        <input {...register("uid")} />
        {/* 오류메세지 */}
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("umail")} />
        <p style={{ color: "red" }}>{errors.umail?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <p style={{ color: "red" }}>{errors.upw?.message}</p>

        <label>파일첨부</label>
        <input type="file" {...register("ufile")} />
        <p style={{ color: "red" }}>{errors.ufile?.message}</p>

        <label>이미지파일첨부</label>
        <input
          type="file"
          {...register("userimg")}
          accept="image/png, image/jpeg"
        />
        <p style={{ color: "red" }}>{errors.userimg?.message}</p>

        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
