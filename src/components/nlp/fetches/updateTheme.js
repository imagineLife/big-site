async function updateThemeFetch({ email, theme, newValue, jwt }) {
  const bodyObj = {
    newTheme: newValue,
  }
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes/${theme}`
  const response = await fetch(fetchUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(bodyObj),
    credentials: "include",
  })

  return response.status === 200
}

export default updateThemeFetch
