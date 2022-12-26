import { Link } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import editSvg from "../assets/edit.svg";
import removeSvg from "../assets/remove.svg";

export default function Scream({ data }) {
  const { title, rating, meth, id } = data;

  const removeHandler = async () => {
    const { data, error } = await supabase
      .from("i-screams")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log("There has been an error trying to remove the item");
    }
    if (data) {
      console.log("Succesfully removed", data);
      window.location.reload();
    }
  };

  return (
    <div className="scream">
      <h3>{title}</h3>
      <p className="rate">{rating}/10</p>
      <h5>{meth}</h5>
      <Link to={`update/${id}`} className="title">
        <img src={editSvg} alt="edit icon" />
      </Link>
      <button onClick={removeHandler}>
        <img src={removeSvg} alt="trash can icon" />
      </button>
    </div>
  );
}
