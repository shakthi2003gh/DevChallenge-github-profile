import { octokit } from "./octokit";

const placeholderUserData = {
  id: "github",
  image: "https://avatars.githubusercontent.com/u/9919?v=4",
  name: "GitHub",
  description: "How people build software.",
  followers: 31136,
  following: 0,
  location: "San Francisco, CA",
  repositoriesUrl: "https://api.github.com/users/github/repos",
  type: "Organization",
};

export function getUserProfile(userid = "") {
  return new Promise((resolve) => {
    if (!userid?.trim()) return resolve(placeholderUserData);

    octokit
      .request(`GET /users/${userid}`)
      .then(({ data }) => {
        resolve({
          id: data.login,
          image: data.avatar_url,
          name: data.name || "No username",
          description: data.bio,
          followers: data.followers || 0,
          following: data.following || 0,
          location: data.location || "location not set",
          type: data.type,
        });
      })
      .catch(() => {
        resolve(placeholderUserData);
      });
  });
}
