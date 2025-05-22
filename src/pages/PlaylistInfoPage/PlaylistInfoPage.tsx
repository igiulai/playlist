import { useParams, useNavigate } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistInfoPage.css";

export function PlaylistInfoPage() {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const playlist = PLAYLISTS[Number(playlistId)];

    if (!playlist || playlist.genre === "Non Music") {
        return (
            <div className="playlistInfoPage">
                <h2>PlaylistInfoPage</h2>
                <p>Плейлист не существует</p>
            </div>
        );
    }

    // Функция для обработки клика по жанру
    const handleGenreClick = () => {
        // Переход на страницу PlaylistsPage с фильтром по жанру
        navigate(`/playlists?genre=${playlist.genre}`);
    };

    return (
        <div className="playlistInfoPage">
            <h2>PlaylistInfoPage</h2>
            <h3>{playlist.name}</h3>
            <p>
                Жанр:{" "}
                <span
                    onClick={handleGenreClick}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                    {playlist.genre}
                </span>
            </p>
            <ul>
                {playlist.songs.map((song, index) => (
                    <li key={index}>{song}</li>
                ))}
            </ul>
        </div>
    );
}