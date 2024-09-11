import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationsBar";

export default function CharactersByLocation() {
  const [locations, setLocations] = useState(() => {
    const storedLocations = localStorage.getItem("locations");
    return storedLocations ? JSON.parse(storedLocations) : {};
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3>Characters By Location</h3>
        {Object.keys(locations).length === 0 ? (
          <p>No locations available. Assign a character to a location first.</p>
        ) : (
          <div>
            <h4>Select Location</h4>
            <ul className="list-group mb-4">
              {Object.keys(locations).map((location) => (
                <li
                  key={location}
                  onClick={() => handleSelectLocation(location)}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                >
                  {location}
                </li>
              ))}
            </ul>

            {selectedLocation && (
              <div>
                <h4>Characters in {selectedLocation}</h4>
                <div className="row">
                  {locations[selectedLocation].length > 0 ? (
                    locations[selectedLocation].map((character) => (
                      <div key={character.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                          <img
                            src={character.image}
                            className="card-img-top"
                            alt={character.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No characters found in this location.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
