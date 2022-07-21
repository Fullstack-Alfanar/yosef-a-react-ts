import "../styles/ShowCard.scss";

function ShowCard(params: any) {
  return (
    <>
      <div
        className="ShowCard"
        onClick={() => {
          window.location.href = params.redirect;
        }}
      >
        <img src={params.imgSrc} alt="ShowImage" />
        <div className="showTitle">
          <p>{params.title}</p>
        </div>
      </div>
    </>
  );
}

export default ShowCard;
