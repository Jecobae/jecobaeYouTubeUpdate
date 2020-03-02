
const fetch = require('node-fetch')
const fs = require('fs')
const git = require('simple-git')
let mykey = process.env['YOUTUBEKEY'];
const PL_POP = 'PLkfUwwo13dlVzxFwznkToC11duvhBtyUS';
const PL_PYTHON = 'PLkfUwwo13dlV4qfiZdiI6Ak8HXfhFDwpB';
async function _getPlayList(plId, pageToken) {
    console.log(mykey);
    
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
  
const USER = process.env['GITUSER'];
const PASSWORD = process.env['GITPASSWORD'];
const REPONAME = process.env['GITREPONAME'];
const REPO = process.env['GITREPO']
async function a(plId,listName) {
    const json = await getPlayList(plId);
    const loc = `${__dirname}/../${REPONAME}`
    fs.writeFile(`${loc}/${listName}.json`, JSON.stringify(json), 'utf8', (err) => {
        if(err) throw err;
        console.log("file was saved")
    });
}
async function App() {    
    const remote = `https://${USER}:${PASSWORD}@${REPO}`;
    try {
        await git().silent(true).clone(remote);        
        a(PL_POP,"pop")
        a(PL_PYTHON,"python")
        const databaseGit = git(loc);
        await databaseGit.add(`.`)
        await databaseGit.commit('cron youTubeID')
        await databaseGit.push('origin', 'master')
        console.log("pushed")
    } catch(err) {
        console.error('failed: ', err)
    }
    
}
App()