import axios from "axios";
class AdminDeleteProductAxios {
    async AdminDeleteProductAxios(id) {
      
      console.log("token :",sessionStorage.getItem("token"))
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

      let url="http://localhost:8084/product-service/product/deleteproduct/"+id

      
      let axiosResponse;
      let result;
      let error = "";
      console.log("in func");
      try {
        axiosResponse = await axios.delete(url,config).catch((err) => {
          if (err.response.status !== 200) {
            console.log(err.response.status);
            error = err.response.status;
            throw new Error("CANNOT DELETE PRODUCT");
          }
          throw err;
        });
      } catch (err) {
        alert(err);
        result = err;
      }
      if (error === "") {
        result = axiosResponse.data;
        alert("DELETED PRODUCT SUCCESSFULLY")
      }
      console.log("resp ", axiosResponse);
  
      return result;
    }
  }
  
  export default new AdminDeleteProductAxios();
  