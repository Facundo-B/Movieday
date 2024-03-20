import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const movie_api_key = process.env.REACT_APP_OMDB_API_KEY

const movie_api_url = `http://www.omdbapi.com/?apikey=${movie_api_key}`


const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const fetchMovies = async (title) => {
        const response = await fetch(`${movie_api_url}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(() => {
        fetchMovies("superman")
    }, [])

    return (
        <div className="app">
            <h1>MovieDay</h1>

            <div className="search">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    fetchMovies(searchTerm)
                }}>
                    <input type="text" placeholder="Search for a movie"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }} />
                    <input type="image" src={searchIcon} alt="search">
                    </input>
                </form>
            </div>

            {
                movies?.length > 0 ? (

                    <div className="container">
                        {
                            movies.map((movie) => {
                                return <MovieCard movie={movie} />
                            })
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }

        </div>
    );
}

export default App