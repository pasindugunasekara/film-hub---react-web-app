/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../hooks/useGenre";


const Movies = () => {

    const [page, setpage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectGenres, setSelectGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL=useGenres(selectGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );

        setContent(data.results);
        setNumOfPages(data.total_pages); 
    };

    useEffect(() => {
        fetchMovies();
    }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres 
                type="movie" 
                selectGenres={selectGenres} 
                genres={genres} 
                setGenres={setGenres} 
                setSelectGenres={setSelectGenres} 
                setpage={setpage}
            />
            <div className="trending">
                {
                    content && content.map((c) => 
                        <SingleContent 
                            key={c.id} 
                            id={c.id} 
                            poster={c.poster_path} 
                            title={c.title || c.name} 
                            date={c.first_air_date}
                            media_type='movie'
                            vote_average={c.vote_average} 
                        />
                    )
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setpage={setpage} numOfPages={numOfPages}/>
            )}
            
        </div>
    )
}

export default Movies
