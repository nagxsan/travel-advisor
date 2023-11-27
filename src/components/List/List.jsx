import React from 'react'
import { CircularProgress, Grid, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import PlaceDetails from "../PlaceDetails/PlaceDetails"

import useStyles from "./styles"

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants and Attractions near you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(event) => setType(event.target.value)}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(event) => setRating(event.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>Above 1.0</MenuItem>
              <MenuItem value={2}>Above 2.0</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container className={classes.list} spacing={3}>
            {
              places?.map((place, idx) => (
                <Grid item xs={12} key={idx}>
                  <PlaceDetails place={place} selected={Number(childClicked)===idx} id={`listItem${idx}`} />
                </Grid>
              ))
            }
          </Grid>
        </>
      )}
    </div>
  )
}

export default List
