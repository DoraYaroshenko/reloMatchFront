import React,{ useState } from 'react'
import { API_URL, doApiMethod } from '../services/apiService'
import { SlLike } from 'react-icons/sl'
import { BsFillStarFill, BsPencil } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"

const CommentItem = ({ item, doApi, stars }) => {
    const [change, setChange] = useState(false);
    const [changeStars, setChangeStars] = useState(0);
    const [commentContent, setCommentContent] = useState("");
    const [commentID, setCommentID] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleEditClick = (item) => {
        setChange(true);
        setChangeStars(item.stars);
        setCommentContent(item.content);
        setCommentID(item._id);
    };

    const likeComment = async (_id) => {
        try {
            const url = API_URL + "/comments/inc/" + _id;
            const data = await doApiMethod(url, "PATCH");
            console.log(data);
            doApi();
        } catch (error) {
            console.log(error);
            alert("There is a problem");
        }
    }

    const deleteComment = async (_id) => {
        try {
            if (window.confirm("Delete item?")) {
                const url = API_URL + "/comments/delete/" + _id;
                const data = await doApiMethod(url, "DELETE");
                console.log(data);
                if (data.deletedCount) {
                    doApi();
                    toast.info("Your comment was deleted succesfully");
                }
                else {
                    toast.error("There is a problem")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeComment = async (_bodyData) => {
        try {
            const url = API_URL + "/comments/" + commentID;
            _bodyData.stars = changeStars;
            const data = await doApiMethod(url, "PUT", _bodyData);
            console.log(data);
            if (data.modifiedCount) {
                setChangeStars(0);
                toast.success("Comment added");
                setChange(false);
                doApi();
            }
        } catch (error) {

        }
    }

    return (
            <div className='bg-light rounded-3 py-4 p-md-5'>
                <div className='px-5 py-md-4 text-center'>
                    <p className='float-md-end h5 text-dark'>{item.updatedAt.substring(0, 10)}</p>
                    <p className='float-md-start h5 text-dark'>{item.user_id.full_name}</p>
                    {!change ? <div>
                        <div>
                            {stars.map((star, index) => {
                                return (
                                    <BsFillStarFill key={index} className='text-warning h5 pe-1' />
                                )
                            })}
                            <h4 className='text-dark'>{item.content}</h4>
                        </div>
                        <div className='pe-md-5'>
                            {localStorage["user"] && <button className='float-md-end btn' onClick={() => likeComment(item._id)}><SlLike className='h5 text-dark' /> {item.likes.length}</button>}
                            {localStorage["user"] && JSON.parse(localStorage["user"])._id == item.user_id._id &&
                                <>
                                    <button className='btn float-md-end' onClick={() => deleteComment(item._id)}><AiFillDelete className='h4 text-dark' /></button>
                                    <button className='btn float-md-end' onClick={() => handleEditClick(item)}><BsPencil className='h4-text-dark' /></button>
                                </>}
                        </div>
                    </div> : <form onSubmit={handleSubmit(changeComment)} className='pb-5 p-md-0'>
                        <div>
                            <button type='button' className='btn btn-white border-0' onClick={() => setChangeStars(1)}><BsFillStarFill className={changeStars >= 1 ? 'text-warning' : 'text-dark'} /></button>
                            <button type='button' className='btn btn-white border-0' onClick={() => setChangeStars(2)}><BsFillStarFill className={changeStars >= 2 ? 'text-warning' : 'text-dark'} /></button>
                            <button type='button' className='btn btn-white border-0'
                                onClick={() => setChangeStars(3)}><BsFillStarFill className={changeStars >= 3 ? 'text-warning' : 'text-dark'} /></button>
                            <button type='button' className='btn btn-white border-0' onClick={() => setChangeStars(4)}><BsFillStarFill className={changeStars >= 4 ? 'text-warning' : 'text-dark'} /></button>
                            <button type='button' className='btn btn-white border-0' onClick={() => setChangeStars(5)}><BsFillStarFill className={changeStars >= 5 ? 'text-warning' : 'text-dark'} /></button>
                        </div>
                        <input defaultValue={commentContent} type='text' className='form-control text-dark' {...register("content", { maxLength: 150 })} />
                        <div className='p-2'><button type='submit' className='btn btn-dark mt-2 float-end'>Publish</button></div>
                        <button type='button' className=' btn btn-light float-end' onClick={() => setChange(false)}>Back</button>
                    </form>}
                </div>
            </div>
    );
};

export default CommentItem