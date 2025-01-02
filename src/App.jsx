import React, { useState,useEffect } from 'react'
import {Data} from "./EmployeData"



function App(props) {
const [id, setId] = useState(0);
const [data,setData] = useState(['']);
const [firstName,setFirstname] = useState(" ");
const [lastName,setLastname] = useState(" ");
const [age,setAge] = useState("");
const[update , setUpdate]= useState(false);
console.log(update);

// handle Save function
const handleSave =(e)=>{

  let error = '' ;
  if(firstName === '')
    error += `FirstName is required`;
  if(lastName === '')
    error += `LastName is Required`;
  if(age ==='' || isNaN(age))
    error += `Age is required`;
  if(error === ''){

    alert('Record Saved');
    handleClear(); // // Optionally clear the fields after saving
    e.preventDefault();

    const dt = [...data];
    const newObject = {

      id:data.length+1,
      firstName:firstName,
      lastName:lastName,
      age:age
      }
    dt.push(newObject)
    setData(dt)
      }
      else{
       alert(`Error: ${error}`);
      }
    }



// update

const handleUpdate = () => {
  const updatedData = [...data];
  const index = updatedData.findIndex((item) => item.id === id);
  
  if (index !== -1) {
    updatedData[index] = {      
      id,
      firstName,
      lastName,
      age,
    };
    setData(updatedData);
    setUpdate(false);
    handleClear(); // Optionally clear the fields after updating
    alert('Record updated successfully!');
  } else {
    alert('Update failed: Item not found');
  }
};


// handle Edit
const handleEdit =(id)=>{
  alert(id);
  setUpdate(true);
const dt = data.filter(item=> item.id===id);
if (dt !== undefined){
  setUpdate(true);
  setId(id);
  setFirstname(dt[0].firstName);
  setLastname(dt[0].lastName);
  setAge(dt[0].age);
}
}


// handle Clear function 
const handleClear = ()=> {
  alert('clear Record?')
  setFirstname('');
  setLastname('');
  setAge('');
  setUpdate(false);
  setId('');
}


// handle Delete
const handleDelete =(id) =>{
  alert(id);
  if(id>0)
  if(window.confirm('are you sure to delete this record?')){
    const dt = data.filter(item => item.id !==id);
    setData(dt);
  }
  setTimeout(function(){
    alert('Record deleted Successfully +_+')
  }, 1500 )

};

// 
useEffect(()=>{
  setData(Data)
  console.log(Data)
},[]);



return (
<div className='App'>
  <div style={{display:'flex', justifyContent:'center' ,marginTop:"20px", marginBottom:"30px", backgroundColor: 'aqua'  }}>
    <div>
      <label >First Name:
      <input type='text' placeholder='Enter Your First Name' onChange={(e)=> setFirstname(e.target.value)} value={firstName} />
      </label>
    </div>

    <div>
      <label>Last Name:
      <input type="text" placeholder='Enter your LastName' onChange={(e) => setLastname(e.target.value)} value={lastName} />
      </label>
    </div>

    <div>
      <label>age:
      <input type="number" placeholder='Enter your Age' onChange={(e) => setAge(e.target.value)} value ={age} />
      </label>
    </div>
   
    <div>
{/* logic update save buttons */}
    {
!update ?
    <button className="btn btn-primary mx-2" onClick={(e) => handleSave(e)}>save</button>
    :
    <button className="btn btn-primary mx-2" onClick={() => handleUpdate()}>Update</button>
    }
   
   <button className='btn btn-danger mx-2' onClick={() => handleClear()} >Clear</button>
    </div>
 
  </div>

{/*  */}
<div>
<table className="table table-striped table-hover" > 
  <thead>
    <tr>
      <td>sr.No</td>
      <td>Id</td>
      <td>First Name</td>
      <td>Last Name</td>
      <td>Age</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
    {/* { employe data show} */}
    {
      data.map((item, index)=>{
        return(
        <tr key={index +1}>
          <td>{index +1}</td>
          <td>{item.id +1}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName }</td>
          <td>{item.age }</td>
          <td>
            <button className='btn btn-primary mx-2' onClick={()=>handleEdit(item.id) } >Edit</button>
            
            <button className='btn btn-danger ' onClick={()=>handleDelete(item.id) } >Delete</button>
          </td>
          </tr>
        )
      })
    }

  </tbody>

</table>
</div>


</div>
  )
}

export default App
