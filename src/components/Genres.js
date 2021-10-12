import { Chip } from "@mui/material";
import { margin } from "@mui/system";
import axios from "axios"
import { useEffect } from "react";

const Genres = ({
    type, 
    selectGenres,
    genres, 
    setGenres,
    setSelectGenres,
    setpage
}) => {

    const handleAdd=(genre)=> {
        setSelectGenres([...selectGenres, genre]);
        setGenres(genres.filter((g)=> g.id !== genre.id ));
        setpage(1);
    }

    const handleRemove=(genre)=> {
        setSelectGenres(
            selectGenres.filter((selected)=> selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setpage(1);
    }

    const fetchGenres = async() => {
        const{data} = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setGenres(data.genres);

    };

    console.log(genres);

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        }
    }, []);

    return (
        
        <div style={{padding: "6px 0", }}>
            
            {selectGenres && 
                selectGenres.map((genre)=>(
                    <Chip 
                        label={genre.name} 
                        style={{margin: 2}} 
                        size="small"
                        color="primary" 
                        clickable 
                        key={genre.id}
                            clickable
                            onDelete={()=>handleRemove(genre)} 
                    />
            ))}

            {genres && 
                genres.map((genre)=>(
                    <Chip 
                        label={genre.name} 
                        style={{margin: 2}} 
                        size="small" 
                        clickable 
                        key={genre.id} 
                        onClick={()=> handleAdd(genre) }
                    />
            ))}
        </div>
    )
};

export default Genres
