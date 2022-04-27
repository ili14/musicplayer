import logo from "./logo.svg";
import "./App.scss";
import Sidebar from "./Sidebar/Sidebar";
import BottomBar from "./bottomBar/BottomBar";
import React from "react";
import SidebarButton from "./SidebarButton/SidebarButton";
import { Outlet } from "react-router-dom";
import MusicContext from "./Contexts/music-context";
import PlayerQueue from "./PlayerQueue/PlayerQueue";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(
		window.innerWidth >= 500
	);
	/**
	 * @type {import("./Contexts/music-context").MusicContextDataType}
	 */
	const initialMusicData = { playList: [], isPlaying: false, playMode: "playCurrent" };
	const [musicData, setMusicData] = React.useState(initialMusicData);

	const handleClickBtnPlay = React.useCallback(
		(e,canPlay) => {
			if(canPlay) setMusicData(prev=>({...prev,isPlaying:!prev.isPlaying}));
			console.log(musicData.playList);
		},
		[musicData.isPlaying]
	);

	const handleClickSidebarButton = () => {
		setIsSidebarOpen(!isSidebarOpen)
	};

	const handlePlayerPlay = React.useCallback(() => {
		if (!musicData.isPlaying) {
			setMusicData(prev=>({...prev,isPlaying:true}));
		}
	}, [musicData.isPlaying]);
	return (
		<MusicContext.Provider value={{ data: musicData, setData: setMusicData }}>
			<div className="App">
				<div className="container">
					<SidebarButton
						isOpen={isSidebarOpen}
						onClick={handleClickSidebarButton}
					/>
					<Sidebar isOpen={isSidebarOpen} />
					<PlayerQueue  />

					<div
						className="body"
						style={{
							left: isSidebarOpen && window.innerWidth >= 740 ? "180px" : 0,
						}}
					>
						<Outlet />
					</div>
					<BottomBar
						isSidebarOpen={isSidebarOpen}
						isPlaying={musicData.isPlaying}
						onClickBtnPlay={handleClickBtnPlay}
						onPlayerPlay={handlePlayerPlay}
					/>
				</div>
			</div>
		</MusicContext.Provider>
	);
}

export default App;
