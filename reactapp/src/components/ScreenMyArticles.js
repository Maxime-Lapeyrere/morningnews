import React, { useState, useEffect } from "react";
import "../App.css";
import {useParams, Redirect, Link } from "react-router-dom";
import { Card, Modal } from "antd";
import Nav from "./Nav";
import "antd/dist/antd.css";
import { ReadOutlined, DeleteOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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

  var deletewishdb  = async (article) => {
    let deleteArticlewishdb = await fetch(`/delete-wishlist/${article.title}`, {
      method: "DELETE",
      });
    let responsesaddwish = await deleteArticlewishdb.json()
  }
  


  if (props.myToken) {
    if (props.myArticles < 1) {
      return (
        <div>
          <Nav />

          <div className="Banner" />

          <div className="Card">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <h1>
                Vous n'avez encore aucun article ajouté à votre liste de
                lecture.
              </h1>
              <Link to="/source" className="boutonajout">
                <h3>Commencez à en ajouter dès maintenant</h3>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Nav />

          <div className="Banner" />

          <div className="Card">
            {props.myArticles.map((article, i) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                  style={{
                    width: 300,
                    margin: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={<img alt="example" src={article.urlToImage} />}
                  actions={[
                    <ReadOutlined type="read" key="ellipsis2" onClick={()=>{showModal(article.title, article.content)}}/>,
                    <DeleteOutlined
                      type="delete"
                      key="ellipsis"
                      onClick={() => {
                        props.deleteFromWishList(article);
                        deletewishdb(article)
                      }}
                    />,
                  ]}
                >
                  <Meta
                    title={article.title}
                    description={article.description}
                  />
                  <Modal
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    {content}
                  </Modal>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/" />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishList: function (article) {
      dispatch({ type: "deleteArticle", articleLiked: article });
      console.log(article);
    },
  };
}

function mapStateToProps(state) {
  return { myArticles: state.wishList, myToken: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
