import { redirectTo } from "@/data/URL/server/shortUrl/createUrl";
import axios from "@/lib/api/axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const RedirectTo = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${redirectTo}/${id}`)
      .then((res) => {
        window.location.assign(
          res.data.includes("http") ? res.data : `https://${res.data}`
        );
      })
      .catch((err) => {
        navigate("/missing");
      });
  }, []);

  return <></>;
};

export default RedirectTo;
