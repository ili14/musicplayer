import React from "react";
import styles from "./Discover.module.scss";
import TopSlider from "./TopSlider/TopSlider";
import MusicRow from "../../components/MusicRow/MusicRow";
import MusicContext from "../../Contexts/music-context";


const initialList = [
	{
		id: 1,
		image:
			"https://cdnmrtehran.ir/media/mp3s/omid_nemati/omid_nemati_khoda_rahm_kon.jpg",
		musicName: "khoda rahm kone",
		artistsName: "Omid Nemati",
		musicLink: "https://mrtehran.com/mp3/66298/omid-nemati/khoda-rahm-kon",
		artistLink: "https://mrtehran.com/artist/1058",
		playLink:
			"https://cdnmrtehran.ir/media/mp3s_128/omid_nemati/omid_nemati_khoda_rahm_kon.mp3",
	},
	{
		id: 2,
		image:
			"https://cdnmrtehran.ir/media/mp3s/ali_lohrasbi/ali_lohrasbi_ye_baroon_version_.jpg",
		musicName: "ye barone",
		artistsName: "ali lohrasbi",
		musicLink: "https://mrtehran.com/mp3/66678/ali-lohrasbi/ye-baroon-version-2",
		artistLink: "https://mrtehran.com/artist/70",
		playLink:
			"https://cdnmrtehran.ir/media/mp3s_128/ali_lohrasbi/ali_lohrasbi_ye_baroon_version_.mp3",
	},
	{
		id: 3,
		image:
			"https://cdnmrtehran.ir/media/mp3s/reza_yazdani/reza_yazdani_eshghe_bi_zaval.jpg",
		musicName: "eshgh be zaval",
		artistsName: "reza yazdani",
		musicLink: "https://mrtehran.com/mp3/66647/reza-yazdani/eshghe-bi-zaval",
		artistLink: "https://mrtehran.com/artist/46",
		playLink:
			"https://cdnmrtehran.ir/media/mp3s_128/reza_yazdani/reza_yazdani_eshghe_bi_zaval.mp3",
	},
	{
		id: 4,
		image:
			"https://cdnmrtehran.ir/media/mp3s/mehdi_yaghmaei/mehdi_yaghmaei_mahe_mah.jpg",
		musicName: "mahe mah",
		artistsName: "mehdi yaghmaei",
		musicLink: "https://mrtehran.com/mp3/66729/mehdi-yaghmaei/mahe-mah",
		artistLink: "https://mrtehran.com/artist/233",
		playLink:
			"https://cdnmrtehran.ir/media/mp3s_128/mehdi_yaghmaei/mehdi_yaghmaei_mahe_mah.mp3",
	},
	{
		id: 5,
		image:
			"https://cdnmrtehran.ir/media/mp3s/ragheb/ragheb_hamid_hiraad_khosh_be_halam_thumb.jpg",
		musicName: "khoda rahm kone",
		artistsName: ["Omid Nemati", "hamid hirad"],
		musicLink: "https://mrtehran.com/mp3/66681/ragheb-hamid-hiraad/khosh-be-halam",
		artistLink: "https://mrtehran.com/artist/851",
		playLink:
			"https://cdnmrtehran.ir/media/mp3s/ragheb/ragheb_hamid_hiraad_khosh_be_halam.mp3",
	},
];

export default function Discover() {
	const music = React.useContext(MusicContext);
	const handleItemPlayMusic = (e, playLink) => {
		console.log(playLink);
		music.setData(prev=>({...prev,isPlaying: false,musicSrc:playLink}))
		music.setData(prev=>({...prev,isPlaying: true}))
		console.log("...");
	};
	return (
		// * this component implement in a tag <div className="body"> in App.js
		<React.Fragment>
			<TopSlider />
			<MusicRow seeAllLink="https://mrtehran.com/charts/top-songs-week" playList={initialList} headerTitle="Top Music Week" onItemPlayMusic={handleItemPlayMusic} />
		</React.Fragment>
	);
}
