import axios from "axios";
import { useRef, useState } from "react";
import "./App.css";

const url = `http://localhost:5000/user`;

function App() {
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");

  const [remove, setRemove] = useState(false);
  const [removeErr, setRemoveErr] = useState("");
  const input = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoad(true);
    const img = input.current.files[0];
    const formData = new FormData();
    formData.append("image", img);
    try {
      const { data } = await axios.post(`${url}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });

      setImg(data);
      setLoad(false);
      setErr("");
      formData.delete("adminProfile");
    } catch (error) {
      setErr(error.message);
      setLoad(false);
      formData.delete("adminProfile");
    }
  };

  const handleRemove = async () => {
    if (!img) return;
    setLoad(true);
    try {
      const { data } = await axios.delete(`${url}/remove`, {
        data: { source: img },
      });
      setRemove(data);
      setImg("");
      setLoad(false);
      setErr("");
    } catch (error) {
      setRemoveErr(error.message);
      setLoad(false);
    }
  };

  return (
    <div className="App">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter a name</label>
        <input id="name" type="file" ref={input} />
        <br />
        <input type="submit" />
      </form>
      <button onClick={handleRemove} style={{ padding: "16px" }}>
        Delete photo
      </button>
      <div>
        {load && <p>loading....</p>}
        {err && <p>{err}</p>}
        {img && (
          <>
            <p>{img.originalname}</p>
            <p>{img.path}</p>
            <p>{img.destination}</p>
            <img
              src={`http://localhost:3000/${img.path}`}
              alt={img.name}
              style={{ height: "100px", width: "100px" }}
            />
          </>
        )}
        {remove && "image has removed"}
        {removeErr && "err has occured"}
      </div>
    </div>
  );
}

export default App;
