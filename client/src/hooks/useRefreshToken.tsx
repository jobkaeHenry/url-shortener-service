import { refreshTokenURL } from "@/data/URL/server/Authentication/refreshToken";
import axios from "@/lib/api/axios";
import { getLS, removeLS, setLS } from "@/utils/localStorage";

const useRefreshToken = () => {
  const refresh = async () => {
    const refreshToken = getLS("refreshToken");
    const response = await axios
      .post(refreshTokenURL, {
        refreshToken,
      })
      .then((res) => {
        setLS("accessToken", res.data.accessToken);
        setLS("refreshToken", res.data.refreshToken);
        return res.data;
      })
      .catch((err) => {
        /**로컬 스토리지 비우기 */
        removeLS("accessToken");
        removeLS("refreshToken");
        return Promise.reject;
      });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
