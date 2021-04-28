import React, { useState, useEffect } from 'react';
import { Modal, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions,Typography, IconButton, Avatar, Grid, Button, Divider, TextField,InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SkipPrevious, SkipNext } from '@material-ui/icons';

import PortfolioPost from '../PortfolioPost';

export default function PortfolioPostCard(props){
  const [images, setImages] = useState(props.post.images);
  const [tags, setTags] = useState([]);
  const [imagesIndex, setImagesIndex] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const noSpacesTags = props.post.tags.replace(/\s/g, '');
    const formattedTags = noSpacesTags.split(",")
    setTags(formattedTags)

  }, [])

  function nextImage(){
    var newIndex = imagesIndex + 1;
    setImagesIndex(newIndex) 
  }

  function previousImage(){
    var newIndex = imagesIndex - 1;
    setImagesIndex(newIndex) 
  }

  const handleImageOpen = () => {
    setImageOpen(true);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };


  const useStyles = makeStyles({
    cardContent: {
      marginTop: -15,
    },
    modal:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 35,
    },
    modalImage:{
      maxHeight: 500,
      maxWidth: 600,
    },
    cardContent: {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#cccccc', 
      }
    }
  });
  const classes = useStyles();

  

  return (
    <>
      <Grid container className={classes.modalContainer}>
        <Modal
          className={classes.modal}
          open={imageOpen}
          onClose={handleImageClose}
        >
          {props.post.images.length > 0 && (
            <img className={classes.modalImage} src={props.post.images[imagesIndex].url} alt={props.post.title}/>
          )}
          
        </Modal>
      </Grid>

      <Grid container className={classes.modalContainer}>
        <Modal
          className={classes.modal}
          open={formOpen}
          onClose={handleFormClose}
        >
          <PortfolioPost 
            postId={props.post.id}
            title={props.post.title}
            description={props.post.description}
            tags={props.post.tags}
            featured={props.post.featured}
            images={images}
          />
        </Modal>
      </Grid>

      <Card raised="true">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.post.title}
            height="275"
            image={props.post.images.length > 0 ? props.post.images[imagesIndex].url : ""}
            title={props.post.title}
            onClick={handleImageOpen}
          />
        </CardActionArea>

        <Grid container justify="center" spacing={3} className={classes.controlButtons}>
            <Grid item>
              <IconButton 
                color="primary"
                aria-label="previous"
                onClick={previousImage}
                disabled={imagesIndex > 0 
                          ? false
                          : true
                        }
              >
                <SkipPrevious />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton 
                color="primary"
                aria-label="next"
                onClick={nextImage}
                disabled={imagesIndex < (images.length - 1) 
                  ? false
                  : true
                }
              >
                <SkipNext />
              </IconButton>
            </Grid>
        </Grid>
          
        <CardContent 
          className={classes.cardContent}
          onClick={handleFormOpen}
        >

          <Typography gutterBottom variant="h5" component="h2" className={classes.cardContent}>
            {props.post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.description}
          </Typography>
        </CardContent>
        
        <CardActions disableSpacing="true">
          {tags.map(tag => (
              <Button size="small" color="primary">
                #{tag}
              </Button>
          ))}
        </CardActions>
      </Card>
    </>

  )

}