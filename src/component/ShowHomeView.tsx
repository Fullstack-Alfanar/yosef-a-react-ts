import { useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import loadingImg from "../assets/loading/loader.gif";

function ShowHomeView(params: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const sendRequest = () => {
      fetch("https://api.jikan.moe/v3/search/anime?q=" + search)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((js) => {
          setData(
            js.results.filter((e: any) => e.rated !== "Rx" && e.rated !== "R+")
          );

          if (js.results !== null) {
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    if (search !== "" && search !== null) sendRequest();
  }, [search]);

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          margin: "0px 50px 50px 50px",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: "0" }}>Anime List</h2>
        <h6 style={{ color: "#282c34", margin: "0" }}>no hentai allowed</h6>
        <div style={{ display: "flex" }}>
          <input style={{ marginRight: "15px" }} id="1" type="text" />
          <button
            onClick={() => {
              let inp: any = document.getElementById("1");
              setLoading(true);
              setSearch(inp.value);
            }}
          >
            Search
          </button>
        </div>
      </header>
      <div>
        {search === "" || loading ? (
          <div>
            <img src={loadingImg} alt="" />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {data.map((e: any) => {
              return (
                <div key={e.mal_id}>
                  <ShowCard
                    title={e.title}
                    imgSrc={e.image_url}
                    redirect={e.url}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowHomeView;
