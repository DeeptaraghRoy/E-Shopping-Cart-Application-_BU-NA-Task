import axios from "axios";
class DeleteProfileDataAxios {
  async DeleteProfileDataAxios() {
    let url = "http://localhost:8084/profilejwt/DeleteProfile";
    let axiosResponse;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    };
    let result;
    let error = "";
    console.log("in func");
    try {
      axiosResponse = await axios.delete(url, config).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("CANNOT DELETE ACCOUNT");
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
export default new DeleteProfileDataAxios();