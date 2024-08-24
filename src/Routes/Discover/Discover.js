import React from "react";
import styles from "./Discover.module.scss";
import TopSlider from "./TopSlider/TopSlider";
import MusicRow from "../../components/MusicRow/MusicRow";
import MusicContext from "../../Contexts/music-context";

const initialList = [
  {
    id: 1,
    image: "https://cdnmrtehran.ir/media/mp3s/01/cd7ed492ff_55ddae90bc1204ef15deaa476e12e428.jpg",
    musicName: "Bezan Deleto Be Darya",
    artistsName: "Garsha Rezaei",
    musicLink: "https://mrtehran.com/mp3/66298/omid-nemati/khoda-rahm-kon",
    artistLink: "https://mrtehran.com/artist/1058",
    playLink: "https://cdnmrtehran.ir/media/mp3s/01/cd7ed492ff_a4eb1b66e9ccc9c2fc714aed9387dbb1.mp3",
  },
  {
    id: 2,
    image: "https://cdnmrtehran.ir/media/mp3s/01/e3b7bd5579_c8026dc7c28d7b9982ebb3a437b90121.jpg",
    musicName: "Darya Darya",
    artistsName: "Garsha Rezaei",
    musicLink: "https://mrtehran.com/mp3/66678/ali-lohrasbi/ye-baroon-version-2",
    artistLink: "https://mrtehran.com/artist/70",
    playLink: "https://cdnmrtehran.ir/media/mp3s/01/e3b7bd5579_9348c0377f3d2d452ec5c8d54d5a9486.mp3",
  },
  {
    id: 3,
    image: "https://cdnmrtehran.ir/media/mp3s/01/1edc3cc0c0_33d8b207d9cce804e2da73d609340c66.jpg",
    musicName: "Sedaye Baroon",
    artistsName: "Garsha Rezaei",
    musicLink: "https://mrtehran.com/mp3/66647/reza-yazdani/eshghe-bi-zaval",
    artistLink: "https://mrtehran.com/artist/46",
    playLink: "https://cdnmrtehran.ir/media/mp3s/01/1edc3cc0c0_a7b36c6315d09fa40145ae581888a8a4.mp3",
  },
  {
    id: 4,
    image: "https://cdnmrtehran.ir/media/mp3s/01/4333010a6f_20b5851790165294b0fb6b2afeb8bb01.jpg",
    musicName: "Ghermez",
    artistsName: "Garsha Rezaei",
    musicLink: "https://mrtehran.com/mp3/66729/mehdi-yaghmaei/mahe-mah",
    artistLink: "https://mrtehran.com/artist/233",
    playLink: "https://cdnmrtehran.ir/media/mp3s/01/4333010a6f_174d7d7ee474532ef85ec108586529a6.mp3",
  },
  {
    id: 5,
    image: "https://cdnmrtehran.ir/media/mp3s/01/fcd94c0211_157f1fe9effd121741ca9f090a5f0099.jpg",
    musicName: "Mesle Mah",
    artistsName: ["Garsha Rezaei", "Garsha Rezaei"],
    musicLink: "https://mrtehran.com/mp3/66681/ragheb-hamid-hiraad/khosh-be-halam",
    artistLink: "https://mrtehran.com/artist/851",
    playLink: "https://cdnmrtehran.ir/media/mp3s/01/fcd94c0211_300b3a2cd9164eb193a1374aa292680b.mp3",
  },
];

export default function Discover() {
  const music = React.useContext(MusicContext);
  const handleItemPlayMusic = (e, musicItem) => {
    let playList = music.data.playList;
    musicItem.isPlaying = true;

    const newPlayList = playList.map((item) => {
      item.isPlaying = false;
      return item;
    });
    const foundMusic = playList.some((cuMusic) => {
      return cuMusic.id === musicItem.id;
    });
    if (!foundMusic) {
      newPlayList.push(musicItem);
    } else {
      playList = playList.filter((item) => {
        if (item.id === musicItem.id) {
          item.isPlaying = true;
        }
        return item;
      });
    }
    console.log(playList);

    music.setData((prev) => ({ ...prev, isPlaying: true, playList: newPlayList }));
    // music.setData(prev => ({ ...prev, isPlaying: true }))
    console.log("...");
  };

  /**
   ** get MusicRow playlist and set to generally playlist
   * @param {*} e
   * @param {*} playList
   */
  const handlePlayAll = (e, playList) => {
    playList = playList.map((item) => {
      item.isPlaying = false;
      return item;
    });
    playList[0].isPlaying = true;
    music.setData((prev) => ({ ...prev, isPlaying: true, playList }));
  };
  return (
    // * this component implement in a tag <div className="body"> in App.js
    <React.Fragment>
      <TopSlider />
      <MusicRow seeAllLink="https://mrtehran.com/charts/top-songs-week" onPlayAll={handlePlayAll} playList={initialList} headerTitle="Top Music Week" onItemPlayMusic={handleItemPlayMusic} />
    </React.Fragment>
  );
}
