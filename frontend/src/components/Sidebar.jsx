import React from "react";
import styled from "styled-components";
const Sidebar = ({ handleHideSideBar, showSideBar }) => {
  return (
    <Container $showSideBar={showSideBar}>
      <div className="hamburger-container">
        <img src="menu.png" alt="Hamburger" onClick={handleHideSideBar} />
      </div>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  background: var(--darkblue);
  width: ${(props) => (props.$showSideBar ? "15%" : "50px")};
  transition: width 200ms ease;

  .hamburger-container {
    text-align: ${(props) => (props.$showSideBar ? "right" : "center")};

    & img {
      width: 30px;
    }
  }
`;
