async function deleteThemeFetch({ email, theme, jwt }) {
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes/${theme}`
  const response = await fetch(fetchUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      credentials: "include",
    },
  })

  return response.status === 200
}

export default deleteThemeFetch
