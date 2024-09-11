import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { CharacterContext } from "../context/CharacterContex";
import axios from "axios";
import { PiAlien } from "react-icons/pi";
import { PiHeartbeat } from "react-icons/pi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import NavigationBar from "./NavigationsBar";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState(() => {
    const storedLocations = localStorage.getItem("locations");
    return storedLocations ? JSON.parse(storedLocations) : {};
  });

  const [assignedLocation, setAssignedLocation] = useState(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(characterResponse.data);

        const episodeRequests = characterResponse.data.episode.map((url) =>
          axios.get(url)
        );
        const episodeResponses = await Promise.all(episodeRequests);
        setEpisodes(episodeResponses.map((res) => res.data));

        const locationFound = Object.keys(locations).find((loc) =>
          locations[loc].some((char) => char.id === characterResponse.data.id)
        );
        if (locationFound) {
          setAssignedLocation(locationFound);
        }
      } catch (error) {
        console.error("Error fetching character data", error);
      }
    };

    fetchCharacterData();
  }, [id]);

  const handleAssignLocation = () => {
    if (!location) {
      alert("Please enter a location name");
      return;
    }

    // Cek apakah karakter sudah ada di salah satu lokasi
    const characterExistsInAnyLocation = Object.values(locations).some(
      (charactersInLocation) =>
        charactersInLocation.some((char) => char.id === character.id)
    );

    if (characterExistsInAnyLocation) {
      alert(
        "Character already assigned to a location! Cannot assign to another."
      );
      return;
    }

    const newLocations = { ...locations };

    if (newLocations[location]) {
      if (
        newLocations[location].some(
          (existingCharacter) => existingCharacter.id === character.id
        )
      ) {
        alert("Character already assigned to this location!");
        return;
      }
      newLocations[location].push(character);
    } else {
      newLocations[location] = [character];
    }

    setLocations(newLocations);
    localStorage.setItem("locations", JSON.stringify(newLocations));
    setAssignedLocation(location);
    setLocation("");
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3>Persona Character</h3>
        <div className="row">
          <div className="col-md-4">
            <img
              src={character.image}
              className="card-img-top rounded"
              alt={character.name}
            />
          </div>
          <div className="col-md-8">
            <h2>{character.name}</h2>
            <div className="d-flex align-items-center mb-2">
              <PiHeartbeat className="mr-2" />
              <p className="mb-0">{character.status}</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <PiAlien className="mr-2" />
              <p className="mb-0">{character.species}</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <BsGenderAmbiguous className="mr-2" />
              <p className="mb-0">{character.gender}</p>
            </div>
            {assignedLocation && (
              <div className="d-flex align-items-center mb-2">
                <IoLocationOutline className="mr-2" />
                <p className="mb-0">{assignedLocation}</p>
              </div>
            )}
            {!assignedLocation && (
              <div className="mt-4">
                <h4>Assign Character to Location</h4>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location name"
                  className="form-control"
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAssignLocation}
                >
                  Assign Location
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3>Episodes</h3>
          <div className="episode-grid">
            {episodes.length > 0 ? (
              episodes.slice(0, 10).map((episode) => (
                <div key={episode.id} className="episode-card">
                  <div>
                    <strong>
                      {episode.name} | {episode.episode}
                    </strong>
                    <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                      {episode.air_date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No episodes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
