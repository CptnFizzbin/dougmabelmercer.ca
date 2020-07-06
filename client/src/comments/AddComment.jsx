import React, {useRef, useState} from "react";

import ApiClient from "../api-client.js";
import {Comment} from "./Comments.jsx";

import "./AddComment.scss";

const AddComment = () => {
    const inputFileRef = useRef(null);

    const [comment, setComment] = useState(null);
    const [errors, setErrors] = useState({});

    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const [saving, setSaving] = useState(false);

    if (comment) {
        return (<Comment comment={comment} key={comment.id}/>);
    }

    const onAddPicture = () => inputFileRef.current.click();
    const onRemovePicture = () => {
        inputFileRef.current.value = null;
        setImage(null);
    }
    const onAuthorChange = (event) => setAuthor(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);
    const onImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setImage({file, url});
    }
    const onKeyDown = (event) => event.key === "Enter" ? onSave() : null;
    const onSave = async () => {
        if (saving) return;

        try {
            setSaving(true);
            const comment = await ApiClient.putComment({
                author,
                content,
                image: image ? image.file : null,
            });
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
                <div className='image'>
                    {image ? (
                        <div>
                            <img src={image.url} alt={""}/>
                            <div className={'rm-img-btn'} onClick={onRemovePicture}>✖</div>
                        </div>
                    ) : (
                        <div className={'add-image'} onClick={onAddPicture}>Add Picture</div>
                    )}
                    {errors.image ? <div className={'text error'}>{errors.image}</div> : null}
                    <div className={'hidden'}>
                        <input type={'file'} ref={inputFileRef} onChange={onImageChange}/>
                    </div>
                </div>
                <div className='text'>
                    <textarea placeholder={"Message..."} onChange={onContentChange} disabled={saving} value={content}/>
                    {errors.content ? <div className={'error'}>{errors.content}</div> : null}
                </div>
                <div className="text" onKeyDown={onKeyDown}>
                    <input placeholder={'Name'} onChange={onAuthorChange} value={author} disabled={saving}/>
                    {errors.author ? <div className={'error'}>{errors.author}</div> : null}
                </div>
                <div className="text">
                    <div className="save-btn" onClick={onSave} tabIndex={0}
                         onKeyDown={onKeyDown}>{saving ? "Saving..." : "Add Memory"}</div>
                </div>
            </div>
        </div>
    );
}

export default AddComment;
