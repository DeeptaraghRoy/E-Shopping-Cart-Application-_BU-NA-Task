import axios from "axios";
class EditProfileDataAxios {
  async EditProfileDataAxios(body) {
    let url = "http://localhost:8084/profilejwt/UpdateProfile";
    let axiosResponse;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    };
    let result;
    let error = "";
    console.log("in func");
    try {
      axiosResponse = await axios.put(url,body, config).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("CANNOT UPDATE ACCOUNT");
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
export default new EditProfileDataAxios();