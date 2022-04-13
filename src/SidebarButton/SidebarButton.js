import PropTypes from "prop-types";
import React from "react";
import { ChevronRight, ChevronLeft } from "react-feather";
import styles from "./SidebarButton.module.scss";

function SidebarButton({ isOpen, onClick }) {
	const handleClick = e => {
		onClick(e);
	};


	return (
		<div
			className={styles.container}
			style={{ left: isOpen ? "180px" : 0 }}
			onClick={handleClick}
		>
			{isOpen ? (
				<ChevronLeft color="#fff" size={18} />
			) : (
				<ChevronRight color="#fff" size={18} />
			)}
		</div>
	);
}

SidebarButton.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default SidebarButton;
