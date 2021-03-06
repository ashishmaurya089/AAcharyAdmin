import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Fab,
} from "@material-ui/core";
import {
	Menu as MenuIcon,
	MailOutline as MailIcon,
	NotificationsNone as NotificationsIcon,
	Person as AccountIcon,
	Search as SearchIcon,
	Send as SendIcon,
	ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";



export default function Header(props) {
	var classes = useStyles();

	// global
	var layoutState = useLayoutState();
	var layoutDispatch = useLayoutDispatch();
	var userDispatch = useUserDispatch();

	// local
	var [mailMenu, setMailMenu] = useState(null);
	var [isMailsUnread, setIsMailsUnread] = useState(true);
	var [notificationsMenu, setNotificationsMenu] = useState(null);
	var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
	var [profileMenu, setProfileMenu] = useState(null);
	var [isSearchOpen, setSearchOpen] = useState(false);

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					onClick={() => toggleSidebar(layoutDispatch)}
					className={classNames(
						classes.headerMenuButton,
						classes.headerMenuButtonCollapse
					)}
				>
					{layoutState.isSidebarOpened ? (
						<ArrowBackIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					) : (
						<MenuIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					)}
				</IconButton>
				<Typography variant="h6" weight="medium" className={classes.logotype}>
					Aacharya Admin Panel
				</Typography>
				<div className={classes.grow} />
				<div className={classes.profileMenuUser}>
					<Typography
						className={classes.profileMenuLink}
						color='secondary'
						onClick={() => signOut(userDispatch, props.history)}
					>
						Sign Out
					</Typography>
				</div>
				{/* <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search???"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}
				{/* <IconButton
					color='inherit'
					aria-haspopup='true'
					aria-controls='mail-menu'
					onClick={(e) => {
						setNotificationsMenu(e.currentTarget);
						setIsNotificationsUnread(false);
					}}
					className={classes.headerMenuButton}
				>
					<Badge
						badgeContent={isNotificationsUnread ? notifications.length : null}
						color='secondary'
					>
						<NotificationsIcon classes={{ root: classes.headerIcon }} />
					</Badge>
				</IconButton> */}
				{/* <IconButton
					color='inherit'
					aria-haspopup='true'
					aria-controls='mail-menu'
					onClick={(e) => {
						setMailMenu(e.currentTarget);
						setIsMailsUnread(false);
					}}
					className={classes.headerMenuButton}
				>
					<Badge
						badgeContent={isMailsUnread ? messages.length : null}
						color='secondary'
					>
						<MailIcon classes={{ root: classes.headerIcon }} />
					</Badge>
				</IconButton> */}
				{/* <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton> */}
				{/* 
				<Menu
					id='profile-menu'
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{ paper: classes.profileMenu }}
					disableAutoFocusItem
				>
					<div className={classes.profileMenuUser}>
						<Typography variant='h4' weight='medium'>
							John Smith
						</Typography>
						<Typography
							className={classes.profileMenuLink}
							component='a'
							color='primary'
							href='https://flatlogic.com'
						>
							Flalogic.com
						</Typography>
					</div>
					<MenuItem
						className={classNames(
							classes.profileMenuItem,
							classes.headerMenuItem
						)}
					>
						<AccountIcon className={classes.profileMenuIcon} /> Profile
					</MenuItem>
					<MenuItem
						className={classNames(
							classes.profileMenuItem,
							classes.headerMenuItem
						)}
					>
						<AccountIcon className={classes.profileMenuIcon} /> Tasks
					</MenuItem>
					<MenuItem
						className={classNames(
							classes.profileMenuItem,
							classes.headerMenuItem
						)}
					>
						<AccountIcon className={classes.profileMenuIcon} /> Messages
					</MenuItem>
	
				</Menu>
				 */}
			</Toolbar>
		</AppBar>
	);
}
