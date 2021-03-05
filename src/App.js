import './App.css';
import {useState, useEffect} from "react"
import ArticleList from "./components/ArticleList"
import Form from "./components/Form"
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom"


function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticles] = useState(null)
  const [token, setToken, removeToken] = useCookies(["mytoken"])

  let history = useHistory();

  useEffect(() =>{
    fetch("http://127.0.0.1:8000/api/articles/",{
      "method": "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token['mytoken']}`
      }
    })
    .then(res => res.json())
    .then(res => setArticles(res))
    .catch(error => console.error())
  },[token])

  useEffect(() => {
    if(!token["mytoken"]){
        history.push("/")
        // window.location.href = "/"
    }
 },[history, token])

  const editBtn = (article)=>{
    setEditArticles(article)
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle =>{
      if (myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle;
      }
    })
    setArticles(new_article)
  } 

  const articleForm = () => {
    setEditArticles({title:"", description:""})
  }

  const insertedInformation = (article) => {
    const new_article = [...articles, article]
    setArticles(new_article)
  }

  const deleteBtn = (article) =>{
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id){
        return false
      }
      return true;
    })
    setArticles(new_articles)
  }

  const logoutBtn = () => {
    removeToken(["mytoken"])
  }

  return (
    <div className="App">

      <div className="row">
        <div className="col">
          <h1>Django React blog</h1>
          <br/>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={articleForm}>Add Article</button>
        </div>

        <div className="col">
          <button className="btn btn-primary" onClick={logoutBtn}>Logout</button>
        </div>

      </div>
            
      <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn}/>
      {editArticle ? <Form article = {editArticle} updatedInformation={updatedInformation} insertedInformation={insertedInformation}/> : null }
      
    </div>
  );
}

export default App;
