async function getAllData(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    };
  };
//ДОБАВЛЕНИЕ
async function addData(url, object){
    try {
        const response = await fetch(url,
            {
                method: "POST",
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }       
}
//УДАЛЕНИЕ
async function removeData(url){
    try {
        const response = await fetch(url,
            {
                method: "DELETE",
            });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    } 
}
//ОБНОВЛЕНИЕ
async function updateData(url) {
    try {
        const response = await fetch(url,
            {
                method: "PATCH",
            });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }     
  }
export {
    getAllData,
    addData,
    removeData,
    updateData
  };