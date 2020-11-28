import React, {useEffect, useState} from 'react';

import ApiClient from "./api-client";

import './Comments.scss';

const Comments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        ApiClient.getComments().then(setComments);
    }, []);

    return (
        <div className="comments">
            {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
}

export default Comments;

export const Comment = ({comment}) => {
    return (
        <div className="comment">
            <div className="surface">
                {comment.image && <img className="image" src={`${ApiClient.base}/img/${comment.image}`} alt={""}/>}
                {comment.content.split("\n").map((paragraph, index) => (
                    <div className="text" key={index}>{paragraph}</div>
                ))}
                <div className="footer">- {comment.author}</div>
            </div>
        </div>
    );
}
