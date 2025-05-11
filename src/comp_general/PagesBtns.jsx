import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { doApiGet } from '../services/apiService';

const PagesBtns = (props) => {
  const [pages, setPages] = useState(0);
  const url = props.apiUrl;

  useEffect(() => {
    doApi();
  }, [url]);

  const doApi = async () => {
    try {
      const data = await doApiGet(url);
      console.log(data);
      setPages(data.pages);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <span>Page: </span>
      {[...Array(pages)].map((item,i)=>{
        return(
          <Link key={i} to={props.linkTo+(i+1)} className={props.cssClass}>{i+1}</Link>
        )
      })}
    </div>
  )
}

export default PagesBtns