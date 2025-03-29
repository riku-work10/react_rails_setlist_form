import { useState } from "react";
import SetlistList from "./component/SetlistList";
import SetlistForm from "./component/SetlistForm";

function App() {
  const [reload, setReload] = useState(false);

  const handleSetlistCreated = () => {
    setReload(!reload);
  };

  return (
    <div>
      <h1>セットリスト投稿アプリ</h1>
      <SetlistForm onSetlistCreated={handleSetlistCreated} />
      <SetlistList key={reload} />
    </div>
  );
}

export default App;
