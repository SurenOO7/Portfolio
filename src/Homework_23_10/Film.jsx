import React, {useState, useEffect} from 'react'
import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.REACT_APP_OMDB_ACCESS_KEY;


export default function Film(props) {
    const [movie, setMovie] = useState("");
    
    function more(){
        var apiURI = `https://www.omdbapi.com/?i=${props.location.aboutProps.id}&apikey=${API_KEY}`;
        fetch(apiURI)
        .then((res) => res.json())
        .then((data) => {
            setMovie(data);
        });
    }
    useEffect(()=>{
        if(props.location.hasOwnProperty('aboutProps')){
            more()
        }
        else{
            props.history.push("/")
        }
        
    
    }, [])
    

    return (
        <div className="containter_film">
            <div className="poster">
                <img
                    className="movie_image"
                    src={movie.Poster}
                    alt={movie.Title}
                />
            </div>
            <div className="descr">
                {Object.keys(movie).map((elem, index)=>{
                if(index!==14 && index!==13 && index!==9 ){
                return (
                <div key = {index} className="descrLine"><div className="descrName">{elem}:</div><div>{movie[elem]}</div></div>
                )}
                })}
            </div>
            {console.log(props)}
        </div>
        
    )
}

//movie֊ի մեջ մտնում ա արժեքը, ասինխրոն ա
// առանձին route֊երի մեջ դիր Մինչև film ընգած մասն էլ
