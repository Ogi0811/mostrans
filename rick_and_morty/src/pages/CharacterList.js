import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PiHeartbeat } from "react-icons/pi";
import { PiAlien } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContex";
import NavigationBar from "./NavigationsBar";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const { setSelectedCharacter } = useContext(CharacterContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error Fetching Data", error);
      });
  }, []);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    console.log(character.id);
    navigate(`/character/${character.id}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-4">
        <h5 className="text-center">Rick and Morty Character</h5>
        <div className="row mt-3">
          {characters.map((character) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={character.id}>
              <div
                className="card"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "1rem",
                  // margin: "20px",
                  borderRadius: "10px",
                  border: "none",
                }}
                onClick={() => handleCardClick(character)}
              >
                <img
                  src={character.image}
                  className="card-img-top rounded"
                  alt={character.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold text-truncate">
                    {character.name}
                  </h5>
                  <div className="d-flex align-items-center mb-2">
                    <PiHeartbeat className="mr-2" />
                    <p className="mb-0">{character.status}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <PiAlien className="mr-2" />
                    <p className="mb-0">{character.species}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
