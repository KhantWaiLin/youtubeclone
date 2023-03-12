import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Stack, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromApi } from '../utils/fetchFromApi';

const VideoDetail = () => {

  const [videoDetail, setvideoDetail] = useState(null);
  const [videos, setvideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then(
      (data) => setvideoDetail(data.items[0])
    );
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setvideos(data.items));
  }, [id]);

  console.log(videoDetail);
  console.log(videos);

  if (!videoDetail?.snippet) return "Loading";

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" fontWeight="bold" variant="h5" py={1} px={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", color: "gray", marginLeft: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" alignItems="center" gap="20px">
                <Typography variant='body1' sx={{ opacity: "0.7" }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: "0.7" }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>

            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ xs: 5, md: 1 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" start="start"/>
        </Box>

      </Stack>

    </Box >
  )
}

export default VideoDetail