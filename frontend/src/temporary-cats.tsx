import * as React from "react";
import { useEffect, useState } from "react";

interface Cat {
  name: String;
  age: Number;
  breed: String;
}

const Cats: React.FC = () => {
  const [catData, setCatData] = useState<Cat[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch("http://localhost:3000/cats");
      const data: Cat[] = await response.json();
      setCatData(data);
    };
    fetchCats();
  }, []);

  return (
    <div>
      {catData.map((cat, index) => (
        <div key={index}>
          <div>NAME: {cat.name}</div>
          <div>AGE: {cat.age.toString()}</div>
          <div>BREED: {cat.breed}</div>
        </div>
      ))}
    </div>
  );
};

export default Cats;
