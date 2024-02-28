import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body {
  background: black;
}
`;

const grid = Array.from({ length: 120 }, (_, i) => i + 1);

export function App() {
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <>
      <GlobalStyle />
      <Header>
        <span>PingWin</span>
        <button>$104.2</button>
      </Header>
      <Navbar scrollDir={scrollDir}>
        <Flex>
          <NavbarButton size="small">S</NavbarButton>
          <NavbarButton size="large">Providers</NavbarButton>
        </Flex>
        <Flex>
          <NavbarButton size="large" accent>
            Categories
          </NavbarButton>
          <NavbarButton size="small">L</NavbarButton>
        </Flex>
        <Flex>
          <Filter>some</Filter>
          <Filter>mega</Filter>
          <Filter>lodon</Filter>
        </Flex>
      </Navbar>
      <Grid>
        {grid.map((a) => (
          <Square key={a} />
        ))}
      </Grid>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 270px;
`;

const Square = styled.div`
  width: 106px;
  height: 106px;
  border-radius: 12px;
  background: #999;
`;

const Header = styled.div`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  height: 72px;
  position: fixed;
  border-bottom: 1px solid #555;

  & span {
    color: white;
    font-weight: bold;
  }

  & button {
    padding: 12px 16px;
    color: white;
    background: blue;
    text-align: center;
    border-radius: 12px;
    border: 0;
  }
`;

const Navbar = styled.div`
  width: 100%;
  padding: 16px 8px;
  box-sizing: border-box;
  display: ${({ scrollDir }) => (scrollDir === "down" ? "none" : "flex")};
  flex-direction: column;
  gap: 8px;
  background: #222;
  position: fixed;
  top: 72px;
  border-bottom: 1px solid #555;
`;

const Filter = styled.div`
  margin-top: 12px;
  border-radius: 100px;
  background: #555;
  color: #ccc;
  padding: 4px 10px;
`;

const Flex = styled.div`
  display: flex;
  gap: 6px;
`;

const NavbarButton = styled.button`
  border: 0;
  background: ${({ accent }) => (accent ? "blue" : "gray")};
  padding: 6px;
  border-radius: 12px;
  height: 48px;
  width: ${({ size }) => (size === "small" ? "48px" : "100%")};
  color: #eee;
`;
