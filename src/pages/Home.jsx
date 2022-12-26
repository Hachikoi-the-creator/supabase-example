import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scream from "../components/scream";
import supabase from "../utils/supabaseClient";

export default function Home() {
  const [dbError, setDbError] = useState(null);
  const [iScreams, setIScreams] = useState(null);

  useEffect(() => {
    (async () => {
      // from table "i-screams" select everything
      const { data, error } = await supabase.from("i-screams").select();

      if (error) {
        console.log(error);
        setDbError("Couldn't fetch screams");
        setIScreams(null);
      }
      if (!iScreams) {
        setIScreams(data);
        setDbError(null);
      }
    })();
  });

  console.log(iScreams);

  return (
    <div className="home">
      {dbError && <p>{dbError}</p>}
      <div className="screams-container">
        {iScreams?.map((e) => {
          return <Scream key={e.id} data={e} />;
        })}
      </div>
    </div>
  );
}
