import { useEffect, useState } from "react"
import "./styles/App.css"
import Card from "./components/Card"

function App() {
  const [data, setData] = useState<string[]>([])
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchAborter = new AbortController()
    const { signal } = fetchAborter

    async function fetchData() {
      try {
        const resp = await fetch("https://api.jikan.moe/v4/characters/125056/pictures", { signal })

        if (!resp.ok) throw new Error("Could not fetch")

        const json = await resp.json()

        const extractedURLs = json.data.map((url: { jpg: { image_url: string } }) => url.jpg.image_url)
        extractedURLs.pop()
        extractedURLs.pop()

        setData(extractedURLs)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()

    return () => {
      fetchAborter.abort("Performing cleanup")
    }
  }, [])

  if (bestScore < currentScore) setBestScore(currentScore)

  useEffect(() => {
    if (currentScore === 12) {
      alert("Congratulations, you won!")

      setCurrentScore(0)
      setBestScore(0)
      setSelectedCards(new Set())
    }
  }, [currentScore])

  return (
    <>
      <header>
        <h1>
          Memory card<span>Dazai edition</span>
        </h1>
        <p>Current score {currentScore}</p>
        <p>Best score: {bestScore}</p>
      </header>
      <main className="card-container">
        {data.length ? (
          data.map((url) => (
            <Card
              src={url}
              data={{ data, setData }}
              key={url}
              score={setCurrentScore}
              card={{ selectedCards, setSelectedCards }}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  )
}

export default App
