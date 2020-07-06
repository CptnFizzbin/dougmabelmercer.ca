import React, {useState} from "react";

import ApiClient from "../api-client.js";
import {Comment} from "./Comments.jsx";

import "./AddComment.scss";

const AddComment = () => {
    const [comment, setComment] = useState(null);

    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [image] = useState("");

    const [saving, setSaving] = useState(false);

    if (comment) {
        return (<Comment comment={comment} key={comment.id}/>);
    }

    const onAuthorChange = (event) => setAuthor(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);
    const onSave = async () => {
        if (saving) return;
        setSaving(true);
        const comment = await ApiClient.putComment({author, content, image});
        setSaving(false);
        setComment(comment);
    }

    return (
        <div className="comment add-comment">
            <div className="surface">
                <div className={'text'}>
                    <textarea placeholder={"Message..."} onChange={onContentChange} disabled={saving} value={content}/>
                </div>
                <div className="footer">
                    <input placeholder={'Name'} onChange={onAuthorChange} value={author} disabled={saving}/>
                </div>
                <div className="text">
                    <div className="save-btn" onClick={onSave}>{saving ? "Saving..." : "Add Memory"}</div>
                </div>
            </div>
        </div>
    );
}

export default AddComment;
