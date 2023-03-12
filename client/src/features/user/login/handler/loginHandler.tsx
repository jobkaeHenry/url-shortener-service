import { login } from "@/data/URL/local/user/url";
import useLogin from "@/hooks/user/useLogin";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types/FormValueType";

export const useLoginHandler = () => {
  const loginHandler = useLogin();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

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
  return { onSubmit, errorMessage: serverError };
};
