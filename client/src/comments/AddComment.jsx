import React, {useState} from "react";

import ApiClient from "../api-client.js";
import {Comment} from "./Comments.jsx";

import "./AddComment.scss";

const AddComment = () => {
    const [comment, setComment] = useState(null);
    const [errors, setErrors] = useState({});

    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [image] = useState(null);

    const [saving, setSaving] = useState(false);

    if (comment) {
        return (<Comment comment={comment} key={comment.id}/>);
    }

    const onAuthorChange = (event) => setAuthor(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);
    const onSave = async () => {
        if (saving) return;

        try {
            setSaving(true);
            const comment = await ApiClient.putComment({author, content, image});
            setComment(comment);
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors);
            } else {
                throw error;
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="comment add-comment">
            <div className="surface">
                <div className='text'>
                    <textarea placeholder={"Message..."} onChange={onContentChange} disabled={saving} value={content}/>
                    {errors.content ? <div className={'error'}>{errors.content}</div> : null}
                </div>
                <div className="text">
                    <input placeholder={'Name'} onChange={onAuthorChange} value={author} disabled={saving}/>
                    {errors.author ? <div className={'error'}>{errors.author}</div> : null}
                </div>
                <div className="text">
                    <div className="save-btn" onClick={onSave}>{saving ? "Saving..." : "Add Memory"}</div>
                </div>
            </div>
        </div>
    );
}

export default AddComment;
