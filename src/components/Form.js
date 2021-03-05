import React, {useState, useEffect} from 'react'
import APIService from "./APIService";
import {useCookies} from "react-cookie";

function Form(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [token] = useCookies(["mytoken"])

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)  
    }, [props.article])

    const updateArticle =() =>{
        APIService.UpdateArticle(props.article.id, {title, description}, token["mytoken"])
        .then(res => props.updatedInformation(res))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, description}, token["mytoken"])
        .then(res => props.insertedInformation(res))
    }

    return (
        <div>
            
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor= "title" className="form-lable">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter your Title" value={title} onChange={e => setTitle(e.target.value)}/>

                    <label htmlFor= "Description" className="form-lable">Description</label>
                    <textarea className="form-control" id="Description" rows="5" value={description} onChange={e => setDescription(e.target.value)}/>

                    <br/>

                    {
                        props.article.id ? <button className="btn btn-success" onClick ={updateArticle}>Update Article</button> : <button className="btn btn-success" onClick ={insertArticle}>Insert Article</button> 
                    }
                    
                </div>
            ) : null}
        </div>
    )
}

export default Form
