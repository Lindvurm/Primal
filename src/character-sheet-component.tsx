import React, { useState, useEffect, ChangeEvent } from "react";
import escamasIcon from './iconos/escamas.png';
import huesosIcon from './iconos/huesos.png';
import sangreIcon from './iconos/sangre.png';
import zimaIcon from './iconos/zima.png';
import irideIcon from './iconos/iride.png';
import kobaureoIcon from './iconos/kobaureo.png';
import nilleaIcon from './iconos/nillea.png';
import tamaneiIcon from './iconos/tamanei.png';
import almalexiaIcon from './iconos/almalexia.png';
import meliusIcon from './iconos/melius.png';
import anthemonIcon from './iconos/anthemon.png';
import skellicorniaIcon from './iconos/skellicornia.png';
import fuegoIcon from './iconos/fuego.png';
import cuernoIcon from './iconos/cuerno.png';
import coralIcon from './iconos/coral.png';
import cristalIcon from './iconos/cristal.png';
import rayoIcon from './iconos/rayo.png';
import metalIcon from './iconos/metal.png';
import plumaIcon from './iconos/pluma.png';
import venenoIcon from './iconos/veneno.png';
import hieloIcon from './iconos/hielo.png';

import greatBowIcon from './iconos/GB.png';
import greatSwordIcon from './iconos/GS.png';
import hammerIcon from './iconos/H.png';
import heavyGunIcon from './iconos/HG.png';
import dualBladeIcon from './iconos/DB.png';
import swordShieldIcon from './iconos/SS.png';

interface Skills {
  [key: string]: boolean[];
}

interface Materials extends Record<string, number> {
  escamas: number;
  huesos: number;
  sangre: number;
  zima: number;
  iride: number;
  kobaureo: number;
}

interface Plants extends Record<string, number> {
  nillea: number;
  tamanei: number;
  almalexia: number;
  melius: number;
  anthemon: number;
  skellicornia: number;
}

interface Elements extends Record<string, number> {
  fuego: number;
  cuerno: number;
  coral: number;
  cristal: number;
  rayo: number;
  metal: number;
  pluma: number;
  veneno: number;
  hielo: number;
}

interface Character {
  name: string;
  class: string;
  skills: Skills;
  materials: Materials;
  plants: Plants;
  elements: Elements;
  notes: string;
}

const defaultCharacter: Character = {
  name: "",
  class: "",
  skills: {
    A: [false, false],
    B: [false, false],
    C: [false, false],
    D: [false, false],
    E: [false, false],
  },
  materials: {
    escamas: 0,
    huesos: 0,
    sangre: 0,
    zima: 0,
    iride: 0,
    kobaureo: 0,
  },
  plants: {
    nillea: 0,
    tamanei: 0,
    almalexia: 0,
    melius: 0,
    anthemon: 0,
    skellicornia: 0,
  },
  elements: {
    fuego: 0,
    cuerno: 0,
    coral: 0,
    cristal: 0,
    rayo: 0,
    metal: 0,
    pluma: 0,
    veneno: 0,
    hielo: 0,
  },
  notes: "",
};

const classOptions = [
  { name: "Great Bow", icon: greatBowIcon },
  { name: "Great Sword", icon: greatSwordIcon },
  { name: "Hammer", icon: hammerIcon },
  { name: "Heavy Gun", icon: heavyGunIcon },
  { name: "Dual Blade Karah", icon: dualBladeIcon },
  { name: "Sword and Shield Ljonar", icon: swordShieldIcon },
];

const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number | null>(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    if (activeCharacterIndex !== null) {
      const updatedCharacters = [...characters];
      updatedCharacters[activeCharacterIndex] = character;
      setCharacters(updatedCharacters);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    }
  }, [character]);

  const handleInputChange = (
    section: keyof Character,
    key: string,
    value: string | number | boolean,
    index?: number
  ) => {
    if (section === "skills" && index !== undefined) {
      setCharacter((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [key]: prev.skills[key].map((item, i) =>
            i === index ? (value as boolean) : item
          ),
        },
      }));
    } else if (typeof value === "number") {
      setCharacter((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [key]: value,
        },
      }));
    } else {
      setCharacter((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = classOptions.find(option => option.name === e.target.value);
    setCharacter(prev => ({
      ...prev,
      class: selectedClass ? selectedClass.name : ""
    }));
  };

  const saveCharacter = () => {
    const newCharacters = [...characters, character];
    setCharacters(newCharacters);
    localStorage.setItem("characters", JSON.stringify(newCharacters));
  };

  const loadCharacters = () => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  };

  const handleCharacterSelect = (index: number) => {
    setCharacter(characters[index]);
    setActiveCharacterIndex(index);
  };

  const deleteCharacter = (index: number) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
    localStorage.setItem("characters", JSON.stringify(newCharacters));
    if (activeCharacterIndex === index) {
      setCharacter(defaultCharacter);
      setActiveCharacterIndex(null);
    }
  };

  const renderSkillTree = () => (
    <div className="mb-4">
      <h3 className="font-bold mb-2 text-white bg-black p-2">SKILL TREE</h3>
      {Object.entries(character.skills).map(([key, values]) => (
        <div key={key} className="mb-2">
          <div className="font-semibold">{key}</div>
          <div className="flex space-x-2">
            {values.map((value, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleInputChange("skills", key, !value, index)
                  }
                  className="mr-2"
                />
                {index + 1}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection = <T extends Record<string, number>>(title: string, items: T, icons: { [key: string]: string }) => (
    <div className="mb-4">
      <h3 className="font-bold mb-2 text-white bg-black p-2">{title.toUpperCase()}</h3>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(items).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="capitalize flex items-center">
              <img src={icons[key]} alt={key} className="w-6 h-6 mr-2" />
              {key}
            </span>
            <input
              type="number"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(
                  title.toLowerCase() as keyof Character,
                  key,
                  parseInt(e.target.value) || 0
                )
              }
              className="w-12 p-1 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const materialIcons = {
    escamas: escamasIcon,
    huesos: huesosIcon,
    sangre: sangreIcon,
    zima: zimaIcon,
    iride: irideIcon,
    kobaureo: kobaureoIcon,
  };

  const plantIcons = {
    nillea: nilleaIcon,
    tamanei: tamaneiIcon,
    almalexia: almalexiaIcon,
    melius: meliusIcon,
    anthemon: anthemonIcon,
    skellicornia: skellicorniaIcon,
  };

  const elementIcons = {
    fuego: fuegoIcon,
    cuerno: cuernoIcon,
    coral: coralIcon,
    cristal: cristalIcon,
    rayo: rayoIcon,
    metal: metalIcon,
    pluma: plumaIcon,
    veneno: venenoIcon,
    hielo: hieloIcon,
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <input
          className="p-2 border rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          placeholder="PLAYER NAME"
          value={character.name}
          onChange={(e) =>
            handleInputChange("name", "name", e.target.value)
          }
        />
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            className="p-2 border rounded w-full sm:w-auto"
            value={character.class}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {classOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={saveCharacter}
          >
            Save
          </button>
        </div>
      </div>

      {character.class && (
        <div className="mb-4 flex items-center">
          <img
            src={classOptions.find(option => option.name === character.class)?.icon}
            alt={character.class}
            className="w-8 h-8 mr-2"
          />
          <span>{character.class}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>{renderSkillTree()}</div>
        <div>{renderSection("materials", character.materials, materialIcons)}</div>
        <div>{renderSection("plants", character.plants, plantIcons)}</div>
        <div>{renderSection("elements", character.elements, elementIcons)}</div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2 text-white bg-black p-2">NOTES</h3>
        <textarea
          value={character.notes}
          onChange={(e) =>
            handleInputChange("notes", "notes", e.target.value)
          }
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2 text-white bg-black p-2">Saved Characters</h3>
        <ul className="list-disc pl-5">
          {characters.map((char, index) => (
            <li
              key={index}
              className="cursor-pointer mb-1 p-2 rounded hover:bg-gray-200 flex justify-between items-center"
              onClick={() => handleCharacterSelect(index)}
            >
              <span>{char.name} - {char.class}</span>
              <button
                className="ml-4 p-1 bg-red-500 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCharacter(index);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterSheet;
