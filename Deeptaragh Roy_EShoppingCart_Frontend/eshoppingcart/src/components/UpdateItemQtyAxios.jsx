import axios from "axios";
class UpdateItemQtyAxios {
    async updateItemQtyAxios(url) {
      
      console.log("token :",sessionStorage.getItem("token"))
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    };

      let article={};

      
      let axiosResponse;
      let result;
      let error = "";
      console.log("in func");
      try {
        axiosResponse = await axios.put(url,article,config).catch((err) => {
          if (err.response.status !== 200) {
            console.log(err.response.status);
            error = err.response.status;
            throw new Error("CANNOT ADD TO CART");
          }
          throw err;
        });
      } catch (err) {
        
        result = err;
      }
      if (error === "") {
        result = axiosResponse.data;
        
      }
      console.log("resp ", axiosResponse);
  
      return result;
    }
  }
  
  export default new UpdateItemQtyAxios();
  