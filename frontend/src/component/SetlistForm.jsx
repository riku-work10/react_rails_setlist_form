import { useState } from "react";

const SetlistForm = ({ onSetlistCreated }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [songs, setSongs] = useState(
    Array(5)
      .fill(null)
      .map((_, index) => ({ title: "", order: index + 1 })) // 順番を1, 2, 3, 4, 5に設定
  );
  const [encoreSongs, setEncoreSongs] = useState([]); // アンコール用の曲の状態管理

  const handleSongChange = (index, e) => {
    const newSongs = [...songs];
    newSongs[index][e.target.name] = e.target.value;
    setSongs(newSongs);
  };

  const handleEncoreChange = (index, e) => {
    const newEncoreSongs = [...encoreSongs];
    newEncoreSongs[index][e.target.name] = e.target.value;
    setEncoreSongs(newEncoreSongs);
  };

  const addSong = () => {
    setSongs([...songs, { title: "", order: songs.length + 1 }]);
  };

  const addEncoreSong = () => {
    setEncoreSongs([...encoreSongs, { title: "", order: encoreSongs.length + 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/setlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setlist: { event_name: eventName, event_date: eventDate, description },
        user_id: 1,  // user_idを送信
      }),
    });

    if (response.ok) {
      const setlist = await response.json();

      // 楽曲の追加
      for (const song of songs) {
        await fetch(`http://localhost:3000/api/v1/setlists/${setlist.id}/songs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song: { title: song.title, order: (song.order) },
          }),
        });
      }

      // アンコール曲の追加
      for (const encoreSong of encoreSongs) {
        await fetch(`http://localhost:3000/api/v1/setlists/${setlist.id}/songs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song: { title: encoreSong.title, order: `En-${(encoreSong.order)}` },
          }),
        });
      }

      onSetlistCreated();
      setEventName("");
      setEventDate("");
      setDescription("");
      setSongs(Array(5).fill(null).map((_, index) => ({ title: "", order: index + 1 }))); // リセット後も順番を1, 2, 3, 4, 5に戻す
      setEncoreSongs([]); // アンコール用の曲もリセット
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>イベント名</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="イベント名"
          required
        />
      </div>
      <div>
        <label>イベント日付</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>イベント説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="イベントの説明"
        />
      </div>

      {/* 曲の入力フォーム */}
      {songs.map((song, index) => (
        <div key={index}>
          <div>
            <label>曲名 {song.order}</label>
            <input
              type="text"
              name="title"
              value={song.title}
              onChange={(e) => handleSongChange(index, e)}
              placeholder={`曲名 ${song.order}`}
              required
            />
          </div>
          <div>
            <label>順番</label>
            <input
              type="number"
              name="order"
              value={song.order}
              onChange={(e) => handleSongChange(index, e)}
              required
            />
          </div>
        </div>
      ))}

      {/* アンコール曲の入力フォーム */}
      <div>
        <h3>アンコール曲</h3>
        {encoreSongs.map((encoreSong, index) => (
          <div key={index}>
            <div>
              <label>アンコール曲名 {index + 1}</label>
              <input
                type="text"
                name="title"
                value={encoreSong.title}
                onChange={(e) => handleEncoreChange(index, e)}
                placeholder={`アンコール曲名 ${index + 1}`}
                required
              />
            </div>
            <div>
              <label>順番</label>
              <input
                type="number"
                name="order"
                value={encoreSong.order}
                onChange={(e) => handleEncoreChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEncoreSong}>アンコール曲を追加</button>
      </div>

      <button type="button" onClick={addSong}>曲を追加</button>
      <button type="submit">セットリスト投稿</button>
    </form>
  );
};

export default SetlistForm;
