import { useState, useEffect } from "react";
import Card from "../components/card";
import { getUserRepositories } from "../services/http";

export default function Repositories({ userid, type }) {
  const [reporsitories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetch = () => {
    setLoading(true);

    getUserRepositories(userid)
      .then(setRepositories)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(handleFetch, [userid]);

  const viewAllReposUrl =
    type === "Organization"
      ? `orgs/${userid}/repositories`
      : `${userid}?tab=repositories`;

  return (
    <>
      {!loading && reporsitories.length !== 0 ? (
        <>
          <div className="repositories">
            {reporsitories.map((rep) => (
              <a
                key={rep.id}
                href={`https://github.com/${userid}/${rep.title}`}
                target="_blank"
              >
                <Card {...rep} />
              </a>
            ))}
          </div>

          <a
            href={"https://github.com/" + viewAllReposUrl}
            className="view-all"
            target="_blank"
          >
            View all repositories
          </a>
        </>
      ) : (
        <div className="no-reporsitory-alert">
          {loading ? "Loading..." : "User doesn't have any repositories yet."}
        </div>
      )}
    </>
  );
}
