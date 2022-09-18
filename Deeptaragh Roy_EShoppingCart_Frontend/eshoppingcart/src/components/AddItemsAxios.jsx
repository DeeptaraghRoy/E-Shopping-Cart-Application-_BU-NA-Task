import axios from "axios";
class AddItemsAxios {
    async addItemsAxios(url) {
      
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
        axiosResponse = await axios.post(url,article,config).catch((err) => {
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
        alert("ADDED ITEMS SUCCESSFULLY")
      }
      console.log("resp ", axiosResponse);
  
      return result;
    }
  }
  
  export default new AddItemsAxios();
  