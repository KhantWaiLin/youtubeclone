import React from 'react'
import { Stack, Box } from '@mui/material';

import { VideoCard, ChannelCard } from './';

const Videos = ({ videos , direction , start}) => {
  
  if(!videos?.length) return "Loading ...";

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" 
      justifyContent={{md:{start},xs:"center"}} 
       alignItems={{md:"start",xs:"center"}} gap={2}>
      {
        videos.map((item, idx) => (
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))
      }

    </Stack>
  )
}

export default Videos