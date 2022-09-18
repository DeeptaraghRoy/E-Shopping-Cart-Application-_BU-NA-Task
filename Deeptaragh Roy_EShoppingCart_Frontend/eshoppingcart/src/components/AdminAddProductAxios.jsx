import axios from "axios";
class AdminAddProductAxios {
    async AdminAddProductAxios(body) {
      
      console.log("token :",sessionStorage.getItem("token"))
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

      let url="http://localhost:8084/product-service/product/addproducts"

      
      let axiosResponse;
      let result;
      let error = "";
      console.log("in func");
      try {
        axiosResponse = await axios.post(url,body,config).catch((err) => {
          if (err.response.status !== 200) {
            console.log(err.response.status);
            error = err.response.status;
            throw new Error("CANNOT ADD PRODUCT");
          }
          throw err;
        });
      } catch (err) {
        alert(err);
        result = err;
      }
      if (error === "") {
        result = axiosResponse.data;
        alert("ADDED PRODUCT SUCCESSFULLY")
      }
      console.log("resp ", axiosResponse);
  
      return result;
    }
  }
  
  export default new AdminAddProductAxios();
  