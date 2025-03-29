import { useEffect, useState } from "react";

const SetlistList = () => {
  const [setlists, setSetlists] = useState([]);

  useEffect(() => {
    fetchSetlists();
  }, []);

  const fetchSetlists = async () => {
    const response = await fetch("http://localhost:3000/api/v1/setlists");
    if (response.ok) {
      const data = await response.json();
      setSetlists(data);
    }
  };

  return (
    <div>
      <h2>セットリスト一覧</h2>
      {setlists.map((setlist) => (
        <div key={setlist.id}>
          <h3>{setlist.event_name}</h3>
          <p>{setlist.event_date}</p>
          <p>{setlist.description}</p>

          {/* 通常の曲を表示 */}
          <h4>通常の曲</h4>
          <ul>
            {setlist.songs
              .filter((song) => !String(song.order).includes("En")) // Encoreを含まない曲
              .map((song) => (
                <li key={song.id}>
                  {song.order}. {song.title}
                </li>
              ))}
          </ul>

          {/* アンコール曲を表示 */}
          <h4>アンコール曲</h4>
          <ul>
            {setlist.songs
              .filter((song) => String(song.order).includes("En")) // Encoreを含む曲
              .map((song) => (
                <li key={song.id}>
                  {song.order}. {song.title}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SetlistList;
