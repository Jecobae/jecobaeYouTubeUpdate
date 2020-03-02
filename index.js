
const fetch = require('node-fetch')
const fs = require('fs')
let mykey = 'AIzaSyDKixZEfALq20c_9ZGOO4kReI1gFw8wsaU';
const PL_POP = 'PLkfUwwo13dlVzxFwznkToC11duvhBtyUS';
const PL_PYTHON = 'PLkfUwwo13dlV4qfiZdiI6Ak8HXfhFDwpB';
async function _getPlayList(plId, pageToken) {
    
  const YOUTUBE_API_KEY = mykey;

  const url =
    'https://www.googleapis.com/youtube/v3/playlistItems' +
    `?maxResults=20&part=id,snippet,contentDetails&fields=nextPageToken,prevPageToken,` +
    'items(id,snippet(title,description,thumbnails(high(url)),publishedAt),contentDetails(videoId))' +
    `&playlistId=${plId}&key=${YOUTUBE_API_KEY }`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  let res = await fetch(url, options);
  let resOk = res && res.ok;
  if (resOk) {
    return a = await res.json()
  }
  
  
}
async function getPlayList(plId, pageToken) {
    let res;
    try {
      res = await _getPlayList(plId, pageToken);
    } catch (error) {
      res = await _getPlayList(plId, pageToken);
    } finally {
      if (!res) {
        return {};
      }
      return {
        pageToken: {
          nextPageToken: res['nextPageToken'],
          prevPageToken: res['prevPageToken'],
        },
        videoInfo: res['items'].map(row => ({
          title: row['snippet']['title'],
          desc: row['snippet']['description'],
          img: row['snippet']['thumbnails']['high']['url'],
          date: row['snippet']['publishedAt'].split('T', 1),
          videoId: row['contentDetails']['videoId'],
        })),
      };
    }
  }
async function a(plId,listName) {
    const json = await getPlayList(plId);
    fs.writeFile(`./data/${listName}.json`, JSON.stringify(json), 'utf8', (err) => {
        if(err) throw err;
        console.log("file was saved")
    });
}
a(PL_POP,"pop")
a(PL_PYTHON,"python")

