import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import Form from "../components/Form";

export default function Update() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [screamData, setScreamData] = useState(null);

  useEffect(() => {
    (async () => {
      // only select the items where the id eq-ual to the value id + specify we expect only one element
      const { data, error } = await supabase
        .from("i-screams")
        .select()
        .eq("id", id)
        .single();

      // if they somehow go to a i-scream that doesn't exist...
      if (error) {
        console.log(error);
        navigator("/", { replace: true });
        return;
      }

      if (data) setScreamData(data);
    })();
  }, []);

  const handleUpdate = async (title, meth, rating) => {
    // got all data corrretly
    const { data, error } = await supabase
      .from("i-screams")
      .update({ title, meth, rating })
      .eq("id", id)
      .select();

    if (error) {
      console.log("ERROR IN UPDATE REQUEST \n", error);
      return { success: false };
    }

    if (data) {
      console.log("SUCCESSFULLY ADDED", data);
      return { success: true };
    }
  };

  return <Form defaultData={screamData} {...{ handleUpdate }} />;
}
