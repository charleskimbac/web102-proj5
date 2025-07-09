function Card({ name, shedding, playfulness, family_friendly, image_link, addToBan }) {
    console.log("Card component rendered with props:", { name, shedding, playfulness, family_friendly, image_link });
    return (
        <div className="card">
            <h2>{name}</h2>
            <button onClick={() => addToBan("shedding", shedding)}>Shedding (where 1 indicates no shedding and 5 indicates maximum shedding): {shedding}</button>
            <button onClick={() => addToBan("playfulness", playfulness)}>Playfulness (where 1 indicates serious and stern and 5 indicates maximum playfulness): {playfulness}</button>
            <button onClick={() => addToBan("family_friendly", family_friendly)}>Family Friendly (where 1 indicates minimal affection and 5 indicates maximum affection): {family_friendly}</button>
            <br /><br />
            <img src={image_link} alt={name} style={{ "maxHeight": "200px" }} />
        </div>
    );
}

export default Card;