import { Link } from "react-router-dom";

export default function Scream({ data }) {
  const { title, rating, meth, id } = data;

  return (
    <div className="scream">
      <h3>{title}</h3>
      <p className="rate">{rating}/10</p>
      <h5>{meth}</h5>
      <Link to={`update/${id}`} className="title">
        UPDATE ICON
      </Link>
    </div>
  );
}
