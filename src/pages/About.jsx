import React, { Component } from "react";
import { matchRoutes, renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    const { routes } = this.props.route;
    // console.log(matchRoutes("/"));
    return (
      <div>
        About
        <Link to="/about/1">about2</Link>
        {renderRoutes(routes)}
      </div>
    );
  }
}

export default About;
