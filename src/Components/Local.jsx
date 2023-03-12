import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Paging.css'
import Pagination from 'react-js-pagination';
import {app} from '../firebase'
import { getDatabase, ref, set } from "firebase/database";

const Local = ({local}) => {
  const db = getDatabase(app);

  const[page,setPage] = useState(1);
  const [form, setForm] = useState({
    city: '인천',
    menu:'아마스빈'
  })
  const cities = ['인천','서울','경기도','부산','대구','광주','전주','경주','제주도']
  const menus = ['중식','일식','한식','양식','분식']
  
  const [query,setQuery] = useState('인천중식')
  const [documents, setDocuments] = useState(null);
  const [total, setTotal] = useState(1);

  const callAPI = async() =>{   
    const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const config = {
      headers:{'Authorization': 'KakaoAK dc8d40f2136deeecad5055925f2695db'},
      params:{query:query,page:page,size:5}
    }
    const result = await axios(url, config);
    console.log(result.data);
    setDocuments(result.data.documents);
    setTotal(result.data.meta.pageable_count);
  }

  const onChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit = (e)=>{
   e.preventDefault();
    console.log(form);
    setQuery(form.city+""+form.menu);
    setPage(1);
  }

  const onChangePage = (e) => {
    setPage(e); };

  useEffect(()=>{
    callAPI();
  },[query,page])


  const onFavorite = (e, doc) =>{
    e.preventDefault();
    if(!window.confirm("즐겨찾기 하시겠습니까?"))return;
    
    const email = sessionStorage.getItem('email').replace('.','');
    set(ref(db,`favorite/${email}/${doc.id}`),doc)
}

  if(documents===null){
    return<h1>Loading..........</h1>
  }
  return (
    <div>
      <h1>맛집검색🤤</h1>
      <form onSubmit={onSubmit}>
        <select onChange={onChange} name='city'>
          {cities.map(city=>(
            <option key={city}>{city}</option>
          ))}
        </select>

        <select onChange={onChange} name='menu'>
            {menus.map(menu=>(
                <option key={menu}>{menu}</option>
              
            ))}
        </select>
        <button>검색</button>
        <span style={{marginLeft:'10px'}}>검색수: {total}</span>

      </form>


      <table style={{marginTop:'20px'}}>
        <thead>
          <tr>
            <td>ID</td>
            <td>상호명</td>
            <td>주소</td>
            <td>전화번호</td>
            {sessionStorage.getItem('email')&& <td>즐겨찾기</td>}
          </tr>
        </thead>

        <tbody>
          {documents.map(doc=>(
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.place_name}</td>
              <td>{doc.address_name}</td>
              <td>{doc.phone}</td>
              {sessionStorage.getItem('email')&& <td><a href='#' style={{cursor:'pointer', textDecoration:'none'}} title="즐겨찾기" onClick={(e)=>onFavorite(e,doc)}>⭐</a></td>}
              
            </tr>
          ))}
        </tbody>
      </table>
          <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              prevPageText={"◀"}
              nextPageText={"▶"}
              onChange={ onChangePage }/>
    </div>
  )
}

export default Local