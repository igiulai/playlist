import { ChangeEvent, useState } from "react";
import { PLAYLISTS } from "../../data";
import "./PlaylistsPage.css";
import { Link, useSearchParams } from "react-router-dom";

export function PlaylistsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "");

    const handleSearchTitle = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchParams({ searchTitle: value.toLowerCase(), genre: genreFilter });
    };

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const selectedGenre = event.target.value;
        setGenreFilter(selectedGenre);
        setSearchParams({ searchTitle: searchParams.get("searchTitle") || "", genre: selectedGenre });
    };

    const searchTitle = searchParams.get("searchTitle") || "";
    const filteredPlaylists = PLAYLISTS.filter(
        (playlist) =>
            playlist.genre !== "Non Music" &&
            playlist.name.toLowerCase().includes(searchTitle) &&
            (genreFilter === "" || playlist.genre === genreFilter)
    );

    // Получаем уникальные жанры для фильтра
    const uniqueGenres = Array.from(new Set(PLAYLISTS.map((p) => p.genre).filter((g) => g !== "Non Music")));

    return (
        <div className="playlistsPage">
            <h2>PlaylistsPage</h2>

            <div className="filters">
                <label>
                    Поиск по названию:
                    <input type="text" value={searchTitle} onChange={handleSearchTitle} />
                </label>
                <label>
                    Поиск по жанру:
                    <select value={genreFilter} onChange={handleGenreChange}>
                        <option value="">Все</option>
                        {uniqueGenres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="playlists">
                {filteredPlaylists.map((playlist) => (
                    <Link to={`/playlists/${playlist.id}`} key={playlist.id}>
                        <div>
                            {playlist.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}