import React, { useEffect, useState } from "react"
const useMyThemes = (emailString, jwt) => {
  // const [localThemes, setLocalThemes] = useSessionStorage("nlp-themes")
  const [localThemes, setLocalThemes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.GATSBY_NLP_API_URL}/api/users/${emailString}/themes`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      const jsonRes = await res.json()
      setLocalThemes(jsonRes)
    }
    fetchData()
  }, [])

  return localThemes
}

export default useMyThemes
