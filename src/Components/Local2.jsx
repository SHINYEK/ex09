import axios from 'axios';
import './Paging.css'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';

const Local2 = () => {
    const [page,setPage] = useState(1);
    const [documents,setDocuments] = useState(null);
    const [total, setTotal] = useState(1);
    const [query, setQuery] = useState('인천중식');
    const [local, setLocal] = useState('인천')
    const [category,setCategory] = useState('중식')
    const callAPI = async() =>{
        const url="https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers:{'Authorization': 'KakaoAK dc8d40f2136deeecad5055925f2695db'},
            params:{query:query,page:page,size:5}
        }
        
        const result = await axios(url,config);
        setDocuments(result.data.documents);
        console.log(result.data.documents)
        setTotal(result.data.meta.pageable_count)
    }

    const onChange = (e) =>{
        setLocal(e.target.value);
    }

    const onChange2 = (e) =>{
        setCategory(e.target.value)
    }

    const onClick = () =>{
        setQuery(local+''+category);
        setPage(1);
    }

    const onChangePage = (e) => {
        setPage(e); };
    

    useEffect(()=>{
        callAPI();
    },[query,page])

    if(documents===null){
        return <h1>Loading.........</h1>
    }
  return (
    <div>
        <h1>맛집검색🤤</h1>
       <div style={{marginBottom:'10px'}}>
        <select onChange={onChange} defaultValue="인천">
                <option >인천</option>
                <option>경기도</option>
                <option>부산</option>
                <option>서울</option>
                <option>제주도</option>
            </select>

            <select onChange={onChange2} defaultValue="중식">
                <option>중식</option>
                <option>일식</option>
                <option>한식</option>
                <option>양식</option>
                <option>술집</option>
            </select>

            <button onClick={onClick}>검색</button>
       </div>

        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>상호명</td>
                    <td>주소</td>
                    <td>전화번호</td>
                </tr>
            </thead>
            <tbody>
                {documents.map(store=>(
                    <tr key={store.id}>
                        <td>{store.id}</td>
                        <td>{store.place_name}</td>
                        <td>{store.address_name}</td>
                        <td>{store.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={ onChangePage }/>

    </div>
  )
}

export default Local2