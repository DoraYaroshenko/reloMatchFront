import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet} from '../services/apiService'
import LeaveComment from './LeaveComment';
import Carousel from 'react-bootstrap/Carousel';
import CommentItem from './CommentItem';
import { useUserData } from '../hooks/useUserData';

const CommentsComp = () => {
    const [commentsAr, setCommentsAr] = useState([]);
    const [newComment, setNewComment] = useState(false);

    useEffect(() => {
        doApi();
    }, [newComment])

    const doApi = async () => {
        try {
            const URL = localStorage["user"]?(API_URL + "/comments/myComments?perPage=Infinity"):(API_URL + "/comments?perPage=Infinity");
            const data = await doApiGet(URL);
            const comments = [...data]
            console.log(comments)
            setCommentsAr(comments);
        } catch (error) {
            console.log(error);
            // alert("There is a problem");
        }
    }

    return (
        <div className='container mb-5 col-12' data-bs-theme="dark">
            <h3 className='display-4 text-center text-dark'>Our customers reviews:</h3>
            <div>
                {localStorage["user"] &&
                    <LeaveComment setNewComment={setNewComment} newComment={newComment}
                        setCommentsAr={setCommentsAr} />
                }
                <Carousel fade interval={null}>
                    {commentsAr.map(item => {
                        const stars = new Array(item.stars).fill(null);
                        return (
                            <Carousel.Item className='px-0 px-lg-5 col-12 col-md-6' key={item._id}>
                            <CommentItem item={item} key={item._id} doApi={doApi} stars={stars}/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default CommentsComp;
