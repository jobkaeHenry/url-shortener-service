import Checkbox from "@/components/atom/Checkbox";
import InputWithLabel from "@/components/form/InputWithLabel";
import { useState } from "react";
// import EyeIcon from "@/assets/eyeIcon.svg";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atom/Button";
import MobileWrapper from "@/layouts/MobileWrapper";
import Text from "@/components/atom/Text";
import { login, signUp } from "@/data/URL/local/user/url";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegExp, passwordRegExp } from "@/utils/regExp";
import axios from "@/lib/api/axios";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "@/hooks/user/useLogin";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("user");
  const navigate = useNavigate();
  const loginHandler = useLogin();
  const [serverError, setServerError] = useState("");

  // 훅 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .post(login, data)
      .then((res) => {
        const { accessToken } = res.data;
        const { refreshToken } = res.data;
        loginHandler({ accessToken, refreshToken });

        if (window.history.length < 2) {
          navigate("/");
        } else {
          navigate(-1);
        }
      })
      .catch((err) => {
        const ErrorCode = err?.response?.status;
        if (ErrorCode > 499) {
          setServerError("server Error");
        }
        if (ErrorCode === 401) {
          setServerError("wrong Password");
        }
      });
  };

  return (
    <>
      <MobileWrapper as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          type={"email"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          label={t("이메일")}
          placeholder={t("이메일")}
          // 이메일 훅폼
          error={errors.email ? true : false}
          {...register("email", {
            required: true,
            pattern: emailRegExp,
          })}
        />

        <InputWithLabel
          type={showPassword ? "text" : "password"}
          label={t("비밀번호")}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          placeholder={t("비밀번호")}
          // icon={EyeIcon}
          error={errors.password ? true : false}
          onClick={() => setShowPassword((prev) => !prev)}
          // 패스워드 훅폼
          {...register("password", {
            required: true,
            pattern: passwordRegExp,
          })}
        />
        <Text role={"alert"} typography={"p"} color={"var(--alert-red)"}>
          {serverError}
        </Text>
        <Button type="submit">{t("로그인")}</Button>

        <Link to={signUp}>
          <Text typography={"p"} color={"var(--font-gray)"}>
            {t("계정이 없으신가요?")}
            <Text typography={"p"} color={"var(--main)"} bold>
              {` ${t("회원가입")}`}
            </Text>
          </Text>
        </Link>
      </MobileWrapper>
    </>
  );
};
export default Login;
