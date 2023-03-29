export default function nlpReducer(a, b) {
  console.log('nlpReducer')
  console.log("a")
  console.log(a)
  console.log("b")
  console.log(b)
  console.log('- - - - ')
  
  switch (b.type) {
    case "text":
      return {
        ...a,
        fileType: "text",
        fileData: b.payload,
      }
    case "excel":
      return {
        ...a,
        fileType: "excel",
        fileData: b.payload,
      }
    case "reset":
      return {
        ...a,
        fileType: null,
        fileData: null,
      }
    case "startApiHandshake":
      return {
        ...a,
        apiInitialized: "started"
      }
    default:
      return a
  }
}
