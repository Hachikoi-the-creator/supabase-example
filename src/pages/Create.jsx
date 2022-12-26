import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";

export default function Create() {
  const navigator = useNavigate();
  const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    meth: "",
    rating: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const verifyInputs = () => {
    const { meth, title, rating } = formData;

    if (meth && title && !isNaN(+rating) && +rating < 11) {
      setErr(null);
      return true;
    }

    setErr("BAKA DESU");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verifyInputs()) return;
    // do the POST request
    // insert must always be an array
    const { meth, title, rating } = formData;

    const { data, error } = await supabase
      .from("i-screams")
      .insert([{ title, meth, rating }])
      .select(); //nedeed in V2 to get data

    if (error) {
      console.log("ERROR IN POST REQUEST \n", error);
      setErr("Inputs were okay, but server had an error, sadge");
    }

    if (data) {
      console.log("SUCCESSFULLY ADDED", data);
      setErr(null);
      navigator("/");
    }
  };

  const lazySmart = ["title", "meth", "rating"];

  return (
    <form onSubmit={handleSubmit} className="create-form">
      {err && <label>PLEASE FILL ALL FIELDS CORRECTLY</label>}

      {lazySmart.map((e) => (
        <Fragment key={e}>
          <label htmlFor={e}>{e}</label>
          <input
            type="text"
            placeholder={`enter a ${e}`}
            name={e}
            onChange={handleChange}
          />
        </Fragment>
      ))}
      <button type="submit">CREATE</button>
    </form>
  );
}
