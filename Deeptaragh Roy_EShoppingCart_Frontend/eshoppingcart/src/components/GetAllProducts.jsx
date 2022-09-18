import axios from "axios";
class GetAllProducts {
  async getAllProducts() {
    let url = "http://localhost:8084/cart-service/cart/available-items";
    let axiosResponse;
    let result;
    let error = "";
    console.log("in func");
    try {
      axiosResponse = await axios.get(url).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("CANNOT FETCH PRODUCT");
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
    console.log("resp ", axiosResponse);

    return result;
  }
}

export default new GetAllProducts();
