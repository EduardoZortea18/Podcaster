import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

export function Player(){
   const audioRef = useRef<HTMLAudioElement>(null);
   
   const { episodeList, currentEpisodeIndex, isPlaying, togglePlay } = useContext(PlayerContext);

   const episode = episodeList[currentEpisodeIndex]

   useEffect(() =>{
      if(!audioRef.current){
         return;
      }

      if(isPlaying){
         audioRef.current.play();
      } else{
         audioRef.current.pause();
      }
   }, [isPlaying]) 
  return(
   <div className={styles.playerContainer}>
     <header>
       <img src="/playing.svg" alt="playing now"/>
       <strong>Playing now</strong>
     </header>

     { episode ? (
        <div className={styles.currentEpisode}>
           <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
           />
           <strong>{episode.title}</strong>
           <span>{episode.members}</span>            
        </div>
     ) : (
      <div className={styles.emptyPlayer}>
         <strong>Choose a podcast</strong>
      </div>
     )}

     <footer className={!episode ? styles.empty : ''}>
       <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
           { episode ? (
              <Slider
               trackStyle = {{ backgroundColor: '#04d361' }}
               railStyle = {{ backgroundColor: '#9f75ff' }}
               handleStyle = {{ backgroundColor: '#04d361', borderWidth: 4}}
              />
           ) : (
               <div className={styles.emptySlider}/>
           ) }
          </div>
          <span>00:00</span>
       </div>

       { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
       ) }

       <div className={styles.buttons}>
         <button type="button" disabled={!episode}>
            <img src="shuffle.svg" alt="shuffle"/>
         </button>

         <button type="button" disabled={!episode}>
            <img src="play-previous.svg" alt="play previous"/>
         </button>

         <button 
            type="button" 
            disabled={!episode} 
            className={styles.playButton}
            onClick={togglePlay}
         >
           { isPlaying 
            ? <img src="pause.svg" alt="pause"/>
            : <img src="play.svg" alt="play"/> }
         </button>

         <button type="button" disabled={!episode}>
            <img src="play-next.svg" alt="play next"/>
         </button>

         <button type="button">
            <img src="repeat.svg" alt="repeat"/>
         </button>
       </div>
     </footer>
   </div>
  );
}

function setPlayingState(arg0: boolean): void {
   throw new Error('Function not implemented.');
}
