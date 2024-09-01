import React, { useState } from "react"
import "../styles/Card.css"

interface Card {
  data: { data: string[]; setData: React.Dispatch<React.SetStateAction<string[]>> }
  card: { selectedCards: Set<string>; setSelectedCards: React.Dispatch<React.SetStateAction<Set<string>>> }
  src: string
  score: React.Dispatch<React.SetStateAction<number>>
}

const shuffleArray = (arr: string[]) => {
  const shuffled: string[] = [...arr]

  for (let i = 0; i < arr.length; i += 1) {
    const randIndex = Math.floor(Math.random() * (i + 1))
    ;[shuffled[randIndex], shuffled[i]] = [shuffled[i], shuffled[randIndex]]
  }

  return shuffled
}

const Card = ({
  card: { selectedCards, setSelectedCards },
  data: { data, setData },
  src,
  score: setCurrentScore,
}: Card) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = () => {
    if (selectedCards.has(src)) {
      alert("You lost!")

      setCurrentScore(0)
      setSelectedCards(new Set())
    } else {
      setCurrentScore((c) => c + 1)

      const newSelected = new Set(selectedCards)
      newSelected.add(src)

      setSelectedCards(newSelected)
      setData(shuffleArray(data))
    }
  }

  return (
    <button onClick={handleClick} className={isLoading ? "loading" : ""}>
      <div>
        <img
          src={src}
          alt="Clickable card"
          onLoad={() => {
            setIsLoading(false)
          }}
        />
      </div>
    </button>
  )
}

export default Card
