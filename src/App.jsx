import { Header } from "./Components/Header"
import { Main } from "./Components/Main"
import { useState } from "react"

export function App() {
  const [useAI, setUseAI] = useState(true)

  return (
    <>
      <Header useAI={useAI} setUseAI={setUseAI} />
      <Main useAI={useAI} />
    </>
  )
}
