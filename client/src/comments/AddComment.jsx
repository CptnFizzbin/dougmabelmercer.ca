import React, {useState} from "react";

import "./AddComment.scss";

const AddComment = () => {
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();

    const onAuthorChange = (event) => setAuthor(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);

    return (
        <div className="comment add-comment">
            <div className="surface">
                <div className={'text'}>
                    <textarea placeholder={"Add Comment"} onChange={onContentChange}>{content}</textarea>
                </div>
                <div className="footer">
                    <input placeholder={'Name'} onChange={onAuthorChange} value={author}/>
                </div>
            </div>
        </div>
    );
}

export default AddComment;
