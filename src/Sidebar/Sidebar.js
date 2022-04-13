import React, { Component } from "react";
import PropTypes from "prop-types";
import { Compass, ShoppingCart, Search, Star } from "react-feather";
import { Link,  } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import topIcon from "../assets/icons/headphone.png";
import "./Sidebar.scss";

const initItems = [
	{ id: 0,link:"/", title: "Discover", iconComponent: Compass, active: true },
	{ id: 1,link:"/shop", title: "Shop", iconComponent: ShoppingCart, active: false },
	{ id: 2,link:"/search", title: "Search", iconComponent: Search, active: false },
	{ id: 3,link:"/favorites", title: "Favorites", iconComponent: Star, active: false },
];

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.state = {
			items: initItems,
		};		
	}


	handleItemClick(e, id) {
		const newItems = initItems.map(item => {
			if (item.id === id) item.active = true;
			else item.active = false;
			return item;
		});
		this.setState({
			items: newItems,
		});
	}
	

	render() {
		const leftSidebar = this.props.isOpen?"0":"-180px";
		return (
			<div className="sidebar" style={{left: leftSidebar}}>
				{/* TOP */}
				<div className={"top"}>
					<img alt="logo icon" src={topIcon} />
					<div className="title" style={{ fontWeight: "bolder", color: "whitesmoke" }}>
						Music player
					</div>
				</div>
				{/* BODY */}
				<div className={"body"}>
					{this.state.items.map(item => {
						const { id, title, iconComponent, active, link } = item;
						return (
							<Item
								id={id}
								key={id}
								link={link}
								title={title}
								iconComponent={iconComponent}
								active={window.location.pathname==link}
								onClick={this.handleItemClick}
							></Item>
						);
					})}
				</div>
				{/* BOTTOM */}
				<div className={"bottom"}></div>
				{/* children */}
				{this.props.children}
			</div>
		);
	}
}

Sidebar.propTypes = {
	children: PropTypes.element,
	isOpen: PropTypes.bool,
	location: PropTypes.any
}

function Item({
	link,
	title = "",
	iconComponent,
	iconSize = 25,
	active = false,
	onClick = () => {},
	id,
}) {
	// console.log(<iconComponent/>);
	const IconComponent = iconComponent;
	const handleClick = e => {
		onClick(e, id);
	};
	return (
		<Link
		to={link}
		key={id}
			className={`item ${active == true ? "item-active" : ""}`}
			onClick={handleClick}
		>
			<div className="into">
				<IconComponent className="icon" size={iconSize} />
				<div className="title">{title}</div>
			</div>
		</Link>
	);
}
Item.propTypes = {
	link: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	iconComponent: PropTypes.any.isRequired,
	iconSize: PropTypes.number,
	active: PropTypes.bool,
	onClick: PropTypes.func,
	id: PropTypes.number,
};
