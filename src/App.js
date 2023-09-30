import React, { useEffect, useState } from "react"

import { CssBaseline, Grid } from "@mui/material"

import { getPlacesData } from "./api"

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

const App = () => {
  const [places, setPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({})
  const [marginBounds, setMarginBounds] = useState(null)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }, [])

  useEffect(() => {
    const filterPlaces = places?.filter((place) => place?.rating > rating)
    setFilteredPlaces(filterPlaces)
  }, [rating])

  useEffect(() => {
    if (marginBounds?.sw && marginBounds?.ne) {
      setIsLoading(true)
      getPlacesData(type, marginBounds?.sw, marginBounds?.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
        })
    }
  }, [type, marginBounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setMarginBounds={setMarginBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          >
          </Map>
        </Grid>
      </Grid>
    </>
  )
}

export default App