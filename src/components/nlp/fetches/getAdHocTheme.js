export default function getSentenceThemes(text, jwt) {
  const NLP_API = `${process.env.GATSBY_NLP_API_URL}/api/nlp`
  return fetch(`${NLP_API}/themes/ad-hoc/${encodeURI(text)}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).then(d => d.json())
}
