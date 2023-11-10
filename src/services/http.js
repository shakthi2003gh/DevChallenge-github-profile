import provider from "./providerConfig";
import GitHub from "../assets/github-mark-white.svg";

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

const placeholderReposData = [
  {
    id: 170876990,
    title: ".github",
    description: "Community health files for the @GitHub organization",
    forksCount: 2518,
    starCount: 733,
    updatedAt: "2023-11-08T05:55:06Z",
  },
  {
    id: 632088451,
    title: "accessibility-alt-text-bot",
    description:
      "An action to remind users to add alt text on Issues, Pull Requests, and Discussions",
    license: "MIT",
    forksCount: 10,
    starCount: 53,
    updatedAt: "2023-10-22T21:11:17Z",
  },
  {
    id: 95114338,
    title: "accessibilityjs",
    description: "Client side accessibility error scanner.",
    license: "MIT",
    forksCount: 72,
    starCount: 2180,
    updatedAt: "2023-10-29T09:23:54Z",
  },
  {
    id: 221181294,
    title: "actions-cheat-sheet",
    description: "A cheat sheet for GitHub Actions",
    license: "MIT",
    forksCount: 38,
    starCount: 195,
    updatedAt: "2023-10-06T14:08:26Z",
  },
];

export function getUserProfile(userid = "") {
  return new Promise((resolve) => {
    if (!userid?.trim()) return resolve(placeholderUserData);

    provider(`/users/${userid}`)
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

export function getUserRepositories(userid) {
  return new Promise((resolve) => {
    if (!userid?.trim()) return resolve(placeholderReposData);

    provider(`/users/${userid}/repos?per_page=4`)
      .then(({ data }) => {
        resolve(
          data.map((repo) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description,
            license: repo.license?.spdx_id,
            forksCount: repo.forks_count,
            starCount: repo.stargazers_count,
            updatedAt: repo.updated_at,
          }))
        );
      })
      .catch(() => {
        resolve(placeholderReposData);
      });
  });
}

export function searchUser(searchQuery) {
  const { id, image, description } = placeholderUserData;

  return new Promise((resolve) => {
    if (!searchQuery?.trim()) return resolve([{ id, image, description }]);

    provider(`/search/users?q=${searchQuery}&per_page=4`)
      .then(({ data }) => {
        const userList = data.items.map(({ login: userid }) => {
          return getUserProfile(userid).then((user) => ({
            id: user.id,
            image: user.image || GitHub,
            description: user.description,
          }));
        });

        Promise.all(userList).then(resolve);
      })
      .catch(() => {
        resolve([{ id, image, description }]);
      });
  });
}
