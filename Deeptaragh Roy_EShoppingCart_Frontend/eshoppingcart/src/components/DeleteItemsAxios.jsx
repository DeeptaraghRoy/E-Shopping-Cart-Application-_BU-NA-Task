import axios from "axios";
class DeleteItemsAxios {
    async deleteItemsAxios(url) {
      
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
        alert("ITEM DELETED SUCCESSFULLY")
      }
      console.log("resp ", axiosResponse);
      
      return result;
    }
  }
  
  export default new DeleteItemsAxios();
  