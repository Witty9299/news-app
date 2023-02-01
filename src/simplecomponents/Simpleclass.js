import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
const categories =[
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
]
const SimpleFuncComp = () => {

    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentpage, setCurrentpage] = useState(undefined);
    const [selectedcategorys,setselectedcatgery]=useState("general")

    const loadNews = (pageNo = 1) => {
        axios({
            url: "https://newsapi.org/v2/top-headlines",
            method: "GET",
            params: {
                country: "in",
                apikey: "8cc24481ab294c78bcce288a570564ab",
                page: pageNo,
                category:selectedcategorys
            },
            

        }).then((res) => {
            if (res.status == 200) {
                setArticles([...articles, ...res.data.articles])
                setTotalArticles(res.data.totalResults)
                setCurrentpage(pageNo)
            }

        }).catch((err) => {
            console.log(err, "not working")
            alert("something went wrong")

        })

    }

    useEffect(() => { loadNews() }, []);
    useEffect(()=>{loadNews()},[selectedcategorys]);
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1 ><i>News Application</i></h1>
            </div>
            <div style={{marginBottom:10}}>
                {categories.map((category)=>{
                    return(
                        <button className="btn btn-info" style={{marginLeft:100}} onClick={()=>{setArticles([])
                            setselectedcatgery(category)
                        }}>{category}</button>
                    )

                })}
            </div>
             <InfiniteScroll
                style={{ display: "flex", flexWrap: "wrap",}}
                dataLength={articles.length}
                next={() => {
                    loadNews(currentpage + 1);
                }}
                hasMore={totalArticles != articles.length}
            >
               
                {
                    articles.map((article, index) => {
                        return (
                            <div className="card" style={{ width: 200, marginRight: 50, marginBottom: 10 }} key={index}>
                                <img src={article.urlToImage} className="card-img-top" alt="..." />
                                <div className="card-body" >
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </InfiniteScroll>
        </>
    )



}
export default SimpleFuncComp;