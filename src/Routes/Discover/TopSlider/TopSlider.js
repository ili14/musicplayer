import React from "react";
import styles from "./TopSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const sliderList = [
	{
		id: 0,
		title: "محسن چاووشی",
		image: "https://s6.uupload.ir/files/mohsen_chavoshi_to1q.jpg",
		link: "https://s6.uupload.ir/files/mohsen_chavoshi_to1q.jpg",
	},
	{
		id: 1,
		title: "حبیب",
		image:
			"https://www.zibashahr.com/wp-content/uploads/2016/06/Habib-700x430.jpg",
		link: "https://www.zibashahr.com/wp-content/uploads/2016/06/Habib-700x430.jpg",
	},
	{
		id: 2,
		title: "سالار عقیلی",
		image:
			"https://gratomic.ir/tVNUnHFGQEX8mnG3egQ7tQAwzZRCZSgfb9J3c7J6LepkF2YzvDHxvp997ZtKmfcgMjHSPrzqQsr98TGwtGDkeKB5VkSHMK7fcbbSNu6739KPbSrrvvBVVfYnPaVZfsyJ/uploads/2018/01/salar_aghili-20180130_095702-Gratomic.com_.jpg",
		link: "https://gratomic.ir/tVNUnHFGQEX8mnG3egQ7tQAwzZRCZSgfb9J3c7J6LepkF2YzvDHxvp997ZtKmfcgMjHSPrzqQsr98TGwtGDkeKB5VkSHMK7fcbbSNu6739KPbSrrvvBVVfYnPaVZfsyJ/uploads/2018/01/salar_aghili-20180130_095702-Gratomic.com_.jpg",
	},
];

export default function TopSlider() {
	return (
		<Swiper
			slidesPerView={"auto"}
			centeredSlides={true}
			spaceBetween={30}
			pagination={{
				clickable: true,
				bulletActiveClass: styles.paginationBulletActive,
			}}
			modules={[Autoplay, Pagination, Navigation]}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			navigation={true}
			className={styles.swiper}
		>
			{sliderList.map(item => {
				return (
					<SwiperSlide key={item.id} className={styles.swiperSlide}>
						{({ isActive }) => (
							<div
								className={`${styles.into} ${
									isActive ? styles.intoActive : ""
								}`}
								style={{ backgroundImage: `url('${item.image}')` }}
							>
								<a href={""} target="_blank" rel="noreferrer" >{item.title}</a>
							</div>
						)}
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
