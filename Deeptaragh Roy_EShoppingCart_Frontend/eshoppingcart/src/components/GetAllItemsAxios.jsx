import axios from "axios";
class GetAllItemsAxios {
  async GetAllItemsAxios() {
    let url = "http://localhost:8084/cart-service/cart/GetAllItemsByUsername";
    let axiosResponse;
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };
    let result;
    let error = "";
    console.log("in func");
    try {
      axiosResponse = await axios.get(url,config).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("CANNOT FETCH ITEMS");
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
    console.log("getAllAxios ", axiosResponse);

    return result;
  }
}

export default new GetAllItemsAxios();
