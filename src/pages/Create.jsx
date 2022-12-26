import Form from "../components/Form";
import supabase from "../utils/supabaseClient";

export default function Create() {
  const handleAdd = async (title, meth, rating) => {
    // do the POST request
    // insert must always be an array
    const { data, error } = await supabase
      .from("i-screams")
      .insert([{ title, meth, rating }])
      .select(); //nedeed in V2 to get data

    if (error) {
      console.log("ERROR IN POST REQUEST \n", error);
      return { success: false, error };
    }

    if (data) {
      console.log("SUCCESSFULLY ADDED", data);
      return { success: true };
    }
  };

  return <Form {...{ handleAdd }} />;
}
