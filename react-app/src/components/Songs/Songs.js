import React, {useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AudioListProvider, {AudioListContext} from '../../context/audioList';
import { getSongs } from '../../store/songs';
import Artists from '../Artists/Artists';
import Albums from '../Albums/Albums';
import EditSongModal from '../EditSongModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import playSongButton from '../assets/play_button.png';
import addToPlaylistButton from '../assets/addtoPlaylist.png';
import circleLogo from '../assets/circleLogo.jpeg';

import './Songs.css'

function Songs({songPage}) {
    const songs = useSelector(state => state?.songs);
    const dispatch = useDispatch();
    const history = useHistory();
    const songsArr = Object.values(songs);
    console.log('songs: ', songs)

    const {audioList, setAudioList, clearAudioList, setClearAudioList} = useContext(AudioListContext)

    const sessionUser = useSelector((state) => state.session.user);


    const [playButton, setPlayButton] = useState(false);

    const [audios, setAudios] = useState([])
    console.log('audios: ', audios)

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    useEffect(() => {
        setAudios(Object.values(songs))
    }, [songs])

    const handlePlaySong = async(e) => {
        e.preventDefault();
        setClearAudioList(true)
        const audioArr = e.target.value.split(',')
        console.log('audioArr: ', audioArr)
        setAudioList([])
        await setAudioList([{name: audioArr[0], singer: audioArr[1], cover: circleLogo, musicSrc: audioArr[2]}])
    }
     const handleAddToQueue = async(e) => {
        e.preventDefault();
        setClearAudioList(false)
        const audioArr = e.target.value.split(',')
        console.log('audioArr: ', audioArr)
        console.log(audioList !== null)
        console.log('audioListinQueueFunc: ', audioList)
        if(audioList){
            setAudioList([{name: audioArr[0], singer: audioArr[1], cover: circleLogo, musicSrc: audioArr[2]}])
        }
    }

    console.log('audioList:', audioList)
    return (
        <>
            <NavLink id='add-song-navlink' to='/add-song' >
                <button id='add-song-button' type='button'>+</button>
                <label id='add-song-label'>Add Song</label>
            </NavLink>
            {songPage === 'artists' && <Artists songsArr={songsArr}/>}
            {songPage === 'albums' && <Albums songsArr={songsArr}/>}
            {songPage === '' && <ul id='songs'>
                {songsArr && songsArr.map(song => (
                            <div id='song-page-song-info-container'>
                                <li id='song' key={song.id}>
                                    { sessionUser && sessionUser.id === song.userId.id &&
                                    <>
                                        <EditSongModal songId={song.id} />
                                        <ConfirmDeleteModal song={song} />
                                    </>
                                    }

                                    <p>{song.name}</p>
                                    <p>{song.artist}</p>
                                    <p>{song.album}</p>
                                    <p>{song.genre}</p>
                                    <input className='song-buttons' id='user-profile-play-button' type='image' src={playSongButton} value={[song.name, song.artist, song.source]} onClick={handlePlaySong}/>
                                    <input className='song-buttons' id='user-profile-queue-button' value={[song.name, song.artist, song.source]} type='image' src={addToPlaylistButton} onClick={handleAddToQueue}/>
                                </li>
                            </div>
                ))}
            </ul>}

        </>
    )
}

// (e) => console.log(e.target.value)

export default Songs;
