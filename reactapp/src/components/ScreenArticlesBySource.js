import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import { useParams, Redirect } from "react-router-dom";
import "../App.css";
import { Card,Modal } from "antd";
import Nav from "./Nav";
import Icon from "@ant-design/icons";
import { ReadOutlined,LikeOutlined} from '@ant-design/icons';
const { Meta } = Card;


function ScreenArticlesBySource(props) {  

  const [articlesList, setArticlesList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  let {id} = useParams();

// console.log("testrecup", { id });
useEffect(() => {
  async function loadSrc() {
    const datasrc = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&language=${props.lang}&apiKey=5566be5666604fbd8ccf0a86a6f823c2`);
    const jsonDataSrc = await datasrc.json();
    console.log("testtest", jsonDataSrc.articles);
    setArticlesList(jsonDataSrc.articles);
  }
  loadSrc();
}, []);

var showModal = (title, content) => {
  setVisible(true)
  setTitle(title)
  setContent(content)

}

var handleOk = e => {
  console.log(e)
  setVisible(false)
}
// var titleartcl = 
var handleCancel = e => {
  console.log(e)
  setVisible(false)
}
var addwishdb  = async (article) => {
  let addArticlewishdb = await fetch("/add-wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `titre=${article.title}&description=${article.description}&img=${article.urlToImage}&sourceid=${article.source.id}&sourcename=${article.source.name}&author=${article.author}`});
  let responsesaddwish = await addArticlewishdb.json()
}


if(props.myToken){
  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card">
        {articlesList.map((article, i) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt={article.title} src={article.urlToImage} />}
              actions={[
                <ReadOutlined type="read" key="ellipsis2" onClick={()=>{showModal(article.title, article.content)}}/>,
                <LikeOutlined type="like" key="ellipsis" onClick={ ()=>{props.addToWishList(article);addwishdb(article)} }></LikeOutlined>,
                
              ]}
            >
              <Meta title={article.title} description={article.description} />
              <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                {content}
              </Modal>
            </Card>
          </div>
          ))}
      </div>
    </div>
  );}else{
    return(
      <Redirect to='/' />
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article) { 
        dispatch( {type: 'addArticle',
        articleLiked: article
                          }) 
                          console.log(article)
    }
  }
}

function mapStateToProps(state) {
  
  
  return { myToken: state.token, lang:state.lang}

}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenArticlesBySource);
