import InputWithLabel from "@/components/atom/form/InputWithLabel";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atom/form/Button";
import MobileWrapper from "@/layouts/MobileWrapper";
import Text from "@/components/atom/Text";
import { signUp } from "@/data/URL/local/user/url";
import { useForm } from "react-hook-form";
import { emailRegExp, passwordRegExp } from "@/utils/regExp";
import { Link } from "react-router-dom";
import { FormValues } from "@/features/user/login/types/FormValueType";
import { useLoginHandler } from "@/features/user/login/handler/loginHandler";

const Login = () => {
  const { t } = useTranslation("user");
  const { onSubmit, errorMessage } = useLoginHandler();

  // 훅 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <MobileWrapper as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          type={"email"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          label={t("이메일")}
          placeholder={t("이메일")}
          autoComplete={"username"}
          // 이메일 훅폼
          error={errors.email ? true : false}
          {...register("email", {
            required: true,
            pattern: emailRegExp,
          })}
        />

        <InputWithLabel
          type={"password"}
          label={t("비밀번호")}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          placeholder={t("8자리이상, 특수문자, 알파벳, 숫자 포함")}
          autoComplete={"current-password"}
          error={errors.password ? true : false}
          // 패스워드 훅폼
          {...register("password", {
            required: true,
            pattern: passwordRegExp,
          })}
        />
        <Text role={"alert"} typography={"p"} color={"var(--alert-red)"}>
          {errorMessage}
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
