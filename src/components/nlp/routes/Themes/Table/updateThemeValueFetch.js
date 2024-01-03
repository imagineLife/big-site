async function updateThemeValueFetch({ email, theme, value, newValue, jwt }) {
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes/${theme}/values/${value}`
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ value: newValue }),
    credentials: "include",
  })

  return response.status === 200
}

export default updateThemeValueFetch
