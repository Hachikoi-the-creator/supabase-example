import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

export default function Form({ handleAdd, handleUpdate, defaultData }) {
  const navigator = useNavigate();
  const [err, setErr] = useState(null);
  const titleRef = useRef();
  const methRef = useRef();
  const ratingRef = useRef();

  const disectInputValues = () => {
    return {
      title: titleRef.current.value,
      meth: methRef.current.value,
      rating: ratingRef.current.value,
    };
  };

  const verifyInputs = () => {
    const { title, meth, rating } = disectInputValues();

    if (meth && title && !isNaN(+rating) && +rating < 11) {
      setErr(null);
      return true;
    }

    setErr("BAKA DESU");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { meth, title, rating } = disectInputValues();

    const reqSucceded = () => {
      setErr(null);
      navigator("/");
      return;
    };

    const reqFailed = (msg, error, meth) => {
      console.log(msg, error);
      setErr(`Failed ${meth}`);
    };

    // add data to db
    if (handleAdd && verifyInputs()) {
      setErr(null);
      const { success, error } = await handleAdd(title, meth, rating);

      success && reqSucceded();

      error && reqFailed("Error Creating new entry", error, "POST");
    }

    // update item
    if (handleUpdate && verifyInputs()) {
      setErr(null);
      const { success, error } = await handleUpdate(title, meth, rating);

      success && reqSucceded();

      error && reqFailed("Error Updating existing entry", error, "UPDATE");
    }
  };

  const switchRefPick = (name) => {
    switch (name) {
      case "title":
        return titleRef;
      case "meth":
        return methRef;
      case "rating":
        return ratingRef;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      {err && <label>PLEASE FILL ALL FIELDS CORRECTLY</label>}

      {["title", "meth", "rating"].map((e) => {
        return (
          <InputField
            key={e}
            prepopulate={Boolean(defaultData)}
            type="text"
            name={e}
            reference={switchRefPick(e)}
            defaultValue={defaultData ? defaultData[e] : ""}
          />
        );
      })}

      <button type="submit">CREATE</button>
    </form>
  );
}
