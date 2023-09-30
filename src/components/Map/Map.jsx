import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, Rating, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"

import useStyles from "./styles"
import mapStyles from './mapStyles'

const Map = ({ coordinates, setCoordinates, setMarginBounds, places, setChildClicked }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(event) => {
          setCoordinates({ lat: event.center.lat, lng: event.center.lng })
          setMarginBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, idx) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={idx}
          >
            {
              isDesktop ? (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/0d/5d/72/c9/romantic-table-at-restaurant.jpg'}
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              ) : (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              )
            }
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
