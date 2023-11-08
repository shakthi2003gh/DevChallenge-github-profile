import licenseIcon from "../assets/Chield_alt.svg";
import pullrequestIcon from "../assets/Nesting.svg";
import starIcon from "../assets/Star.svg";

export default function Card(props) {
  const { title, description, license } = props;
  const { forksCount, starCount, updatedAt } = props;

  const formatToString = (date) => {
    const now = new Date();
    const updatedDate = new Date(date);

    const diffTime = Math.abs(updatedDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Updated today.";
    if (diffDays === 1) return "Updated yesterday.";
    return `Update at ${diffDays} days ago.`;
  };

  return (
    <div className="repository-card">
      <div className="title fs-title">{title}</div>
      {description ? (
        <p className="description fs-small">{description}</p>
      ) : (
        <p className="placeholder-alert">No description</p>
      )}

      <div className="details fs-small">
        {license && (
          <span className="license">
            <img src={licenseIcon} alt="" />
            {license}
          </span>
        )}

        <span className="pull-request">
          <img src={pullrequestIcon} alt="" />
          {forksCount}
        </span>

        <span className="star">
          <img src={starIcon} alt="" />
          {starCount}
        </span>

        <span className="updatedAt fs-small">{formatToString(updatedAt)}</span>
      </div>
    </div>
  );
}
