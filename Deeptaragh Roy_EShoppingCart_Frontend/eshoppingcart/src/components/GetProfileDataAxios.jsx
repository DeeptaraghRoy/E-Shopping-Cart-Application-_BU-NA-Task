import axios from "axios";
class GetProfileDataAxios {
  async GetProfileDataAxios() {
    let url = "http://localhost:8084/profilejwt/ViewProfile";
    let axiosResponse;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    };
    let result;
    let error = "";
    console.log("in func");
    try {
      axiosResponse = await axios.get(url, config).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("CANNOT FETCH ACCOUNT");
        }
        throw err;
      });
    } catch (err) {
      alert(err);
      result = err;
    }
    if (error === "") {
      result = axiosResponse.data;
    }
    console.log("profile ", axiosResponse);

    return result;
  }
}
export default new GetProfileDataAxios();