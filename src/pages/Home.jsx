import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scream from "../components/Scream";
import supabase from "../utils/supabaseClient";

export default function Home() {
  const [dbError, setDbError] = useState(null);
  const [iScreams, setIScreams] = useState(null);

  useEffect(() => {
    (async () => {
      // from table "i-screams" select everything
      const { data, error } = await supabase
        .from("i-screams")
        .select()
        .order("rating", { ascending: false });

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
  }, []);

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
