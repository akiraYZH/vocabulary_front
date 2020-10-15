import React, { Component } from "react";
import AccountTabs from "../components/AccountTabs";

import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
class Account extends Component {
  render() {
    const { routes } = this.props.route;
    return (
      <Container>
        <AccountTabs />
      </Container>
    );
  }
}

export default Account;
