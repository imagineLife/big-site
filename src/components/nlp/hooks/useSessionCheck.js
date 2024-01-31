import { useQuery } from "react-query"

function useSessionCheck(enabled, apiReadyKey) {
  console.log("%c useSessionCheck", "background-color: pink; color: black;")
  console.log({
    enabled,
    apiReadyKey,
  })
  return useQuery(
    `sessionAuthCheck-${apiReadyKey}`,
    () =>
      fetch(`${process.env.GATSBY_NLP_API_URL}/api/session`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiReadyKey}`,
        },
      }).then(async res => {
        if (res.status !== 200) return false
        const jsonRes = await res.json()
        return jsonRes
      }),
    {
      enabled: Boolean(enabled && Boolean(apiReadyKey)),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000,
      retry: false,
    }
  )
}

export default useSessionCheck
