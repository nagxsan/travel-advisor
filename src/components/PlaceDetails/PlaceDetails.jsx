import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardActions, CardContent, Chip, Rating } from '@mui/material'
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"

import useStyles from "./styles"

const PlaceDetails = ({ place, selected, id }) => {
  const classes = useStyles()

  if (selected===true) {
    document.getElementsByClassName(id)[0]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Card elevation={6} className={id}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/0d/5d/72/c9/romantic-table-at-restaurant.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          {place?.web_url && (
            <Button size="small" color="primary" onClick={() => window.open(place.web_url, "_blank")}>
              Trip Advisor
            </Button>
          )}
          {place?.website && (
            <Button size="small" color="primary" onClick={() => window.open(place.website, "_blank")}>
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
