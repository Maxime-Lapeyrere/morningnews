import React,{useState, useEffect} from 'react';
import '../App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { UserOutlined} from '@ant-design/icons';

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);
  const [lang,setLang]= useState("fr");
  const [country, setCountry]=useState("fr")
  useEffect(() => {
    async function loadSources(){
      const data = await fetch(`https://newsapi.org/v2/sources?language=${lang}&country=${country}&apiKey=5566be5666604fbd8ccf0a86a6f823c2`);
      const jsonData = await data.json();
      
      setSourceList(jsonData.sources)
    }
    async function displayArticles(){
      console.log('coucou')
      let display = await fetch('/displayArt',{
        method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.myToken}`
      })
      let responseArticle = await display.json()
      // console.log('article a afficher ---->',responseArticle[0]._id)
      
      for(let i=0;i<responseArticle.length;i++){
        props.addToWishList(responseArticle[i])}
    }
    displayArticles();
    loadSources()
  }, [country]);
  
 

  console.log(props.myToken)
  if(props.myToken){
  return (
    <div>
        <Nav/>
       
       <div className="Banner" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
       <Avatar size={64} style={{marginRight:"1rem", border:"2px solid white"}} icon={<img src="./images/british.png" />} onClick={ ()=>{setLang("en"); setCountry("gb");props.setLangArticle("en")} } />
       <Avatar size={64} style={{marginRight:"1rem", border:"2px solid white"}}icon={<img src="./images/fr.png" />} onClick={ ()=>{setLang("fr");setCountry("fr");props.setLangArticle("fr")} } /> 
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={(source,i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`}/>}
                        title={<Link to={`/ArticlesBySource/${source.id}`} key={i}><h3>{source.name}</h3></Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


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
    setLangArticle: function(lang) { 
        dispatch( {type: 'addLang',
        lang: lang
                          }) 
                          console.log(lang)
    },
    addToWishList: function(article) { 
      dispatch( {type: 'addArticle',
      articleLiked: article
      }) 
      console.log('coucou2',article)
  },
  }
}

function mapStateToProps(state) {
  
  console.log('statetest',state)
  return { myToken: state.token}

}


export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
