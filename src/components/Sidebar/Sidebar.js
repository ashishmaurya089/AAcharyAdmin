import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';
import {
	Home as HomeIcon,
	People as UsersIcon,
	SchoolOutlined as InstituteIcon,
	BookOutlined as SubjectIcon,
	PersonTwoTone as TutorIcon,
	Stars as SkillsIcon,
	Event as EventIcon,
	Storefront as WorkShopIcon,
	ArrowBack as ArrowBackIcon,
	PersonPin as Instructor,
	SupervisedUserCircle as Sponsor,
	FilterList as FilterLevel,
	QuestionAnswer as Faq,
	AssistantPhoto as Banner,
	Language as Globa,
	CardMembership as CardMembership,
} from '@material-ui/icons';

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
// styles
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';
import Dot from './components/Dot';

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from '../../context/LayoutContext';
import { useDispatch, useSelector } from 'react-redux';
// import { getLevels } from '../../actions/subjectActions';

const main = [
	{ 
		id: 0, 
		label: 'Dashboard', 
		link: '/app/dashboard', 
		icon: <HomeIcon />, 
	},
	{
		id: 1,
		label: 'Users',
		link: '/app/users',
		icon: <UsersIcon />,
	},
	{ id: 2, label: 'Tutors', link: '/app/tutors', icon: <TutorIcon /> },
	{
		id: 3,
		label: 'Institutions',
		link: '/app/institutions',
		icon: <InstituteIcon />,
	},
	{
		id: 4,
		label: 'Segments',
		link: '/app/segments',
		icon: <CollectionsBookmarkIcon />,
	},
	{
		id: 5,
		label: 'Requirement',
		link: '/app/requirement',
		icon: <Globa />,
	},
	{
		id: 6,
		label: 'Subcription',
		link: '/app/subcription',
		icon: <CardMembership />,
	},
];

const structure = [
	{ id: 5, type: 'divider' },
	// { id: 6, type: 'title', label: 'Events' },
	{
		id: 6,
		label: 'Competitions',
		link: '/app/competitions',
		icon: <EventIcon />,
	},
	{
		id: 7,
		label: 'Skills',
		link: '/app/skills',
		icon: <SkillsIcon />,
	},
	{
		id: 8,
		label: 'Workshops',
		link: '/app/workshops',
		icon: <WorkShopIcon />,
	},
];

const subMenu = [
	{ id: 9, type: 'divider' },
	{
		id: 10,
		label: 'Instructor',
		link: '/app/addInstr',
		icon: <Instructor />,
	},
	{
		id: 11,
		label: 'Sponsor',
		link: '/app/addSponsor',
		icon: <Sponsor />,
	},
	{
		id: 12,
		label: 'Filter Level',
		link: '/app/levelfilter',
		icon: <FilterLevel />,
	},
	{
		id: 13,
		label: 'Faqs',
		link: '/app/faqs',
		icon: <Faq />,
	},
	{ id: 14, type: 'divider' },
	{
		id: 15,
		label: 'Banners',
		link: '/app/banners',
		icon: <Banner />,
	},
	{
		id: 16,
		label: 'Banners',
		link: '/app/newsgallery',
		icon: <Banner />,
	},
];

function Sidebar({ location }) {
	var classes = useStyles();
	var theme = useTheme();
	const dispatch = useDispatch();
	// global
	var { isSidebarOpened } = useLayoutState();
	var layoutDispatch = useLayoutDispatch();
	const tuitionSegments = useSelector((state) => state.tuitionSegments);
	const { levels, loading } = tuitionSegments;
	// local
	var [isPermanent, setPermanent] = useState(false);

	useEffect(
		function () {
			window.addEventListener('resize', handleWindowWidthChange);
			handleWindowWidthChange();
			if (levels.length === 0) {
				// dispatch(getLevels());
			}
			return function cleanup() {
				window.removeEventListener('resize', handleWindowWidthChange);
			};
		},
		[dispatch, levels]
	);

	return (
		<Drawer
			variant={isPermanent ? 'permanent' : 'temporary'}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened,
				}),
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(classes.headerIcon, classes.headerIconCollapse),
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{main.map((link) => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
				{structure.map((link) => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
				{subMenu.map((link) => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
			</List>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		var windowWidth = window.innerWidth;
		var breakpointWidth = theme.breakpoints.values.md;
		var isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
