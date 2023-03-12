import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import {getDatabase,ref,onValue, DataSnapshot ,remove} from 'firebase/database'

import LocalMap from './LocalMap'

const Favorite = () => {
  
  const [doc,setDoc] = useState(null);
  const email = sessionStorage.getItem('email').replace('.','');
  const db = getDatabase();
  const[documents,setDocuments] = useState(null);
  
  const callAPI = () =>{ 
    onValue(ref(db,`favorite/${email}`),(snapshot)=>{
     const data = snapshot.val();
     let rows = []
     snapshot.forEach(row=>{
      rows.push(row.val());
     })
     console.log(rows);
     setDocuments(rows);
    })
  }

  const onDelete = (e,id) =>{
    e.preventDefault();
    if(!window.confirm(`${id}번 버튼을 삭제하시겠습니까?`))return;
    remove(ref(db,`favorite/${email}/${id}`));

  }


  useEffect(()=>{
    callAPI();
  },[])

  if(documents===null){
    return<h1>Loading.......</h1>
  }
  return (
    <div>
      <h1>⭐즐겨찾기 목록</h1>
      <table style={{marginTop:'20px'}}>
        <thead>
          <tr>
            <td>ID</td>
            <td>상호명</td>
            <td>주소</td>
            <td>위치보기</td>
            <td>전화번호</td>
          </tr>
        </thead>

        <tbody>
          {documents.map(doc=>(
            <tr key={doc.id}>
              <td>{doc.id} <a href="#" style={{textDecoration:'none'}} onClick={(e)=>onDelete(e,doc.id)}>🗑</a></td>
              <td>{doc.place_name}</td>
              <td>{doc.address_name}</td>
              <td><button onClick={()=>setDoc(doc)}>위치보기</button></td>
              <td>{doc.phone}</td>                     
            </tr>
          ))}
        </tbody>
      </table>
          {doc !==null && <LocalMap local={doc}></LocalMap>}
    </div>
  )
}

export default Favorite