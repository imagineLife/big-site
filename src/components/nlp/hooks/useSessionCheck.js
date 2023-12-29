import { useQuery } from "react-query"

function useSessionCheck(enabled, apiReadyKey) {
  console.log("useSessionCheck enabled: ", enabled)
  return useQuery(
    "sessionAuthCheck",
    () =>
      fetch(`${process.env.GATSBY_NLP_API_URL}/api/session`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiReadyKey}`,
        },
      }).then(d => d.json()),
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      retry: false,
    }
  )
}

export default useSessionCheck
