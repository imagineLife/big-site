async function addThemeValueFetch({ email, theme, value, jwt }) {
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes/${theme}/values`

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      credentials: "include",
    },
    body: JSON.stringify({ value }),
  })

  return response.status === 200
}

export default addThemeValueFetch
