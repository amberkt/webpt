import React, { useEffect, useState } from "react"
import axios from "axios"
import Button from "./Button"

const KillFeed: React.FC = () => {
  const [gameData, setGameData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fetching, setFetching] = useState<boolean>(false)

  const fetchData = async () => {
    setFetching(true)

    try {
      // const timestamp = Date.now()
      const response = await axios.get(
        `http://interview.wptdev.com/api/killfeed`
      )

      const data = response.data.payload

      if (data.length === 0) {

        setError("No data to retrieve at the moment")

      } else {
        setGameData(data)
        setError(null)
      }

    } catch (error: any) {
      setError(error.response.data.message)
    }
    setFetching(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {error ? (
        <div>
          <h1>There was an error fetching the data</h1>
          <Button onClick={fetchData} disabled={fetching}>
            {fetching ? "Fetching..." : "Try again"}
          </Button>

          <h2>{error}</h2>
        </div>
      ) : (
        <div>
          <h1>Kill Feed</h1>

          <Button onClick={fetchData} disabled={fetching}>
            {fetching ? "Fetching..." : "Fetch"}
          </Button>
          <ul>
            {gameData.map((property, index) => (
              <li key={index}>
                <p>
                  Character {property.source_character}, with ID:{" "}
                  {property.source_player_id}, attacked character{" "}
                  {property.target_character} with ID: {property.target_player_id}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Damage</th>
                      <th>Platform</th>
                      <th>Region</th>
                      <th>Method of Attack</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{property.damage}</td>
                      <td>{property.platform}</td>
                      <td>{property.region}</td>
                      <td>{property.method}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default KillFeed
