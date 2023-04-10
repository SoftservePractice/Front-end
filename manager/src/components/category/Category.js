import {useState, useEffect, useRef} from 'react';
import {getAllData, addData, removeData, updateData} from '../../modules/requests';



function Category(){
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({name: '', parentCategory: null});
  const [category, setCategory] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [searchName, setSearchName] = useState('');
  const isMountedRef = useRef(false);

  useEffect(() => {
      if (isMountedRef.current) {
          return;
      }
      GetAllData();
      isMountedRef.current = true;
  }, [])

  //ПОЛУЧЕНИЕ ВСЕХ КАТЕГОРИЙ
  async function GetAllData(){
      const result = await getAllData("http://localhost:7083/category");
      setData(result);
  }
  //ПОЛУЧЕНИЕ КАТЕГОРИИ ПО ID
  async function GetById(id){
      
          await fetch(`/category/${id}`,
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
      
          await fetch(`/category?parentId=${id}`,
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
      const {name, parentCategory} = editData;
      if(name.length > 0 && parentCategory >= 0){
          const result = await addData("http://localhost:7083/category/create", {
              name: name, 
              parentCategory: parentCategory ? Number(parentCategory) : null
          });
          setData([...data, result])
          setModalVisible(false);
          setEditData({ name: '', parentCategory: null });
      }
      else{
          Cancel();
      }
  }
  //УДАЛЕНИЕ
  async function RemoveData(id){
      const result = await removeData(`http://localhost:7083/category/delete/${id}`);
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
      const {id, name, parentCategory} = editData;
      if(name.length > 0){
          const result = await updateData("http://localhost:7083/category/update", {
              id: Number(id),
              name: name, 
              parentCategory: parentCategory ? Number(parentCategory) : null
          });
          if(result){
              const newData = [...data];
              const index = newData.findIndex(item => item.id === Number(id));
              newData[index] = {id: Number(id), name: name, address: parentCategory};
              GetAllData();
          }
      }
      else{
          Cancel();
      }
      setModalVisible(false);
      setEditData({ name: '', parentCategory: null }); 
    }
    function EditData(item){
      setEditData(item); 
      setModalVisible(true);
  }
  function Cancel(){
      setModalVisible(false);
      setEditData({ name: '', parentCategory: null }); 
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
                                <tr>
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