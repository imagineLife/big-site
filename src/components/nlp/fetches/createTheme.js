async function createThemeFetch({ email, theme, words, jwt }) {
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes/`
  const createBody = {
    theme,
  }
  if (words) {
    createBody.words = words
  }

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      credentials: "include",
    },
    body: JSON.stringify(createBody),
  })

  return response.status === 200
}

export default createThemeFetch
