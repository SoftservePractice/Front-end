import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';


function Category(){
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({name: '', parentCategory: 0});
    const [category, setCategory] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [searchName, setSearchName] = useState('');
    const isMountedRef = useRef(false);
    const [validity, setValidity] = useState({
        name: true,
        parentCategory: true,
      });

  useEffect(() => {
      if (isMountedRef.current) {
          return;
      }
      GetAllData();
      isMountedRef.current = true;
  }, [])

  //ПОЛУЧЕНИЕ ВСЕХ КАТЕГОРИЙ
    async function GetAllData(){
        const result = await getAllData("http://egorhi-001-site1.htempurl.com/category");
        setData(result);
    }
    //ПОЛУЧЕНИЕ КАТЕГОРИИ ПО ID
    async function GetById(id){
        
            await fetch(`http://egorhi-001-site1.htempurl.com/category/${id}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                  },
            })
            .then((res) => res.json())
            .then((data) => setCategory(data))
            .catch ((error)=> {
                console.error(error)});
    }
    //ПОЛУЧЕНИЕ НАЗВАНИЯ РОДИТЕЛЬСКОЙ КАТЕГОРИИ
    function GetCategoryNameById(id){
        const index = data.findIndex(item => item.id === Number(id));
        return data[index] ? data[index].name : undefined;
    }
    //ФИЛЬТР КАТЕГОРИЙ ПО РОДИТЕЛЬСКОМУ ID
    async function GetByParentId(id){
        
            await fetch(`http://egorhi-001-site1.htempurl.com/category?parentId=${id}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                  },
            })
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch ((error)=> {
                console.error(error)});
    }
 //ДОБАВЛЕНИЕ
 async function AddData(){
     setValidity({name: true, parentCategory: true});
     if(validate()){
         const {name, parentCategory} = editData;
         let value = parentCategory ? parentCategory : '';
         const result = await addData(`http://egorhi-001-site1.htempurl.com/category?name=${name}&parentCategory=${value}`);
         console.log(result)
         setData([...data, result])
         setModalVisible(false);
         setEditData({ name: '', parentCategory: undefined });
     }
}
//УДАЛЕНИЕ
async function RemoveData(id){
    const result = await removeData(`http://egorhi-001-site1.htempurl.com/category/${id}`);
    console.log(result)
    if(result){
        setData(removeChildren(data, id));
    }
}
const removeChildren = (data, parentId) => {
    const children = data.filter(item => item.parentCategory === parentId);
    children.forEach(item => {
        removeChildren(data, item.id);
    });
    const newData = data.filter(item => item.id !== parentId && !children.includes(item));
    return newData;
  };
//ОБНОВЛЕНИЕ
async function UpdateData() {
    setValidity({name: true, parentCategory: true});
    if(validate()){
        const {id, name, parentCategory} = editData;
        let value = parentCategory ? parentCategory : '';
        const result = await updateData(`http://egorhi-001-site1.htempurl.com/category/${id}?name=${name}&parentCategory=${value}`);
        if(result){
            const newData = [...data];
            const index = newData.findIndex(item => item.id === Number(id));
            newData[index] = {id: Number(id), name: name, address: parentCategory};
            GetAllData();
        }
        setModalVisible(false);
        setEditData({ name: '', parentCategory: undefined }); 
    }
  }
  function EditData(item){
    setEditData(item); 
    setModalVisible(true);
    setValidity({name: true, parentCategory: true});    
}
function Cancel(){
    setModalVisible(false);
    setEditData({ name: '', parentCategory: null }); 
}
function validate() {
    let isValid = true;
    if (!editData.name) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, name: false }));
    }
    if(!editData.parentCategory){
        setValidity((prevValidity) => ({ ...prevValidity, parentCategory: true }));
    }
    else if (editData.parentCategory < 1 || !data.some(item => item.id == editData.parentCategory)) {
      isValid = false;
      setValidity((prevValidity) => ({ ...prevValidity, parentCategory: false }));
    }
    return isValid;
  }
  return (
      <div className='content'>
          {modalVisible && (
          <div className='content__modal'>
              <div className='content__block-modal'>
                  <button className='content__cancel-btn-modal' onClick={Cancel}>X</button>
                  <input className='main-input' placeholder='Name...' value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })}></input>
                  <input className='main-input' type={'number'} placeholder='Parent Category ID...' value={editData.parentCategory} onChange={(e) => setEditData({ ...editData, parentCategory: e.target.value })}></input>
                  {!editData.id ? 
                  <button className='content__add-btn-modal main-btn' onClick={AddData}>Add</button> :
                  <button className='content__update-btn-modal main-btn' onClick={UpdateData}>Update</button>
                  }
                  
              </div>
          </div>
          )}
          <div className='content__block'>
              <input className='content__input-search main-input' placeholder='Name...' value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
          <button className='content__btn-add main-btn' onClick={() => setModalVisible(true)}>Add Data</button>
          </div>
          {!data ? (<span className='table__no-connect'>No category found</span>) : 
          <div className='content__block-main'>
            <table className='table'>
              <tr>
                <th className='table-point'>ID</th>
                <th className='table-point'>Name</th>
                <th className='table-point'>Parent Category</th>
                <th className='table-point'>Remove</th>
                <th className='table-point'>Update</th>
              </tr>
                      
                          {data.filter((item) => item.name.toLowerCase().includes(searchName.toLowerCase())).map((item) => {
                              return (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.parentCategory ? GetCategoryNameById(item.parentCategory) ? <>Parent: {GetCategoryNameById(item.parentCategory)}</> : '---' : '---'}</th>
                                    <th> <button className="table-btn main-btn" onClick={() => RemoveData(item.id)}>Remove</button></th>
                                    <th> <button className="table-btn main-btn" onClick={() => EditData(item)}>Update</button></th>
                                      </tr>
                              );
                      })}
            </table>   
          </div>
}
      </div>
              
  );
}

export default Category;