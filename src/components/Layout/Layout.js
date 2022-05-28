import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Dashboard from "../../pages/dashboard";
import Users from "../../pages/users/Users";
import Tutors from "../../pages/tutors/Tutors";
import Institutions from "../../pages/institutions/Institutions";
import Subjects from "../../pages/subjects/Subjects";
import AddSubject from "../../pages/subjects/AddSubject";
import AddCategory from "../../pages/subjects/AddCategory";
import AddStream from "../../pages/subjects/AddStream";
import AddLevel from "../../pages/subjects/AddLevel";
import AddSegment from "../../pages/subjects/AddSegment";
import Charts from "../../pages/home/Home";
import Levels from "../../pages/levels/Index";
import Segments from "../../pages/segments/index";
import Events from "../../pages/events/AllEvents";
import Skills from "../../pages/skills/Skills";
import Workshops from "../../pages/workshops/Workshops";
import Requirement from "../../pages/Requirement/Requirement";
import Subcription from "../../pages/subcription/Subcription";

// context
import { useLayoutState } from "../../context/LayoutContext";
import Instructors from "../../pages/Instructor/Instructors";
import Sponsers from "../../pages/sponsor/Sponsers";
import LevelFilter from "../../pages/LevelFilter";
import Faqs from "../../pages/Faqs/Faqs";
import Banners from "../../pages/Banners/Banners";
import NewsGallery from "../../pages/NewsGallery/NewsGallery";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Charts} />
            <Route path="/app/users" component={Users} />
            <Route path="/app/addSub" component={AddSubject} />
            <Route path="/app/addStream" component={AddStream} />
            <Route path="/app/addCat" component={AddCategory} />
            <Route path="/app/addLevel" component={AddLevel} />
            <Route path="/app/addSegement" component={AddSegment} />
            <Route path="/app/tutors" component={Tutors} />
            <Route path="/app/institutions" component={Institutions} />
            <Route path="/app/edulevels/:level" component={Subjects} />
            <Route path="/app/edulevels" component={Levels} />
            <Route path="/app/segments" component={Segments} />
            <Route path="/app/competitions" component={Events} />
            <Route path="/app/skills" component={Skills} />
            <Route path="/app/workshops" component={Workshops} />
            <Route path="/app/addInstr" component={Instructors} />
            <Route path="/app/addSponsor" component={Sponsers} />
            <Route path="/app/levelfilter" component={LevelFilter} />
            <Route path="/app/faqs" component={Faqs} />
            <Route path="/app/banners" component={Banners} />
            <Route path="/app/newsgallery" component={NewsGallery} />
            <Route path="/app/requirement" component={Requirement} />
            <Route path="/app/subcription" component={Subcription} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
