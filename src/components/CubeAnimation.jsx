import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .frame {
    transform: rotateX(-36deg);
    transform-style: preserve-3d;
    position: relative;
    width: 100px;
    height: 100px;
    .bigCube,
    .smallCube {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;

      transform-style: preserve-3d;
      transform-origin: center center;
      transform: rotateY(45deg);

      /* position: relative; */
      div {
        width: 100%;
        height: 100%;
        position: absolute;
        border: 2px solid white;
        background: rgba(141, 214, 249, 0.5);
      }
      div:nth-child(1) {
        transform: translateZ(50px);
      }
      div:nth-child(2) {
        transform: rotateY(90deg) translateZ(50px);
      }
      div:nth-child(3) {
        transform: rotateY(180deg) translateZ(50px);
      }
      div:nth-child(4) {
        transform: rotateY(270deg) translateZ(50px);
      }
      div:nth-child(5) {
        transform: rotateX(90deg) translateZ(50px);
      }
      div:nth-child(6) {
        transform: rotateX(-90deg) translateZ(50px);
      }
    }
    .smallCube {
      transform: rotateY(45deg) scale3d(0.5, 0.5, 0.5);
      animation: smallRotate 10s infinite;
      div {
        background: rgba(141, 214, 249, 1);
      }
    }
    .bigCube {
      transform: rotateY(45deg);
      animation: bigRotate 10s infinite;
    }
    @keyframes smallRotate {
      0% {
        transform: rotateY(45deg) scale3d(0.5, 0.5, 0.5);
      }
      20% {
        transform: rotateY(45deg) scale3d(0.5, 0.5, 0.5);
      }
      25% {
        transform: rotateY(-45deg) scale3d(0.5, 0.5, 0.5);
      }
      45% {
        transform: rotateY(-45deg) scale3d(0.5, 0.5, 0.5);
      }
      50% {
        transform: rotateY(-135deg) scale3d(0.5, 0.5, 0.5);
      }
      70% {
        transform: rotateY(-135deg) scale3d(0.5, 0.5, 0.5);
      }
      75% {
        transform: rotateY(-225deg) scale3d(0.5, 0.5, 0.5);
      }
      95% {
        transform: rotateY(-225deg) scale3d(0.5, 0.5, 0.5);
      }
      100% {
        transform: rotateY(-315deg) scale3d(0.5, 0.5, 0.5);
      }
    }

    @keyframes bigRotate {
      0% {
        transform: rotateY(45deg);
      }
      20% {
        transform: rotateY(45deg);
      }
      25% {
        transform: rotateY(135deg);
      }
      45% {
        transform: rotateY(135deg);
      }
      50% {
        transform: rotateY(225deg);
      }
      70% {
        transform: rotateY(225deg);
      }
      75% {
        transform: rotateY(315deg);
      }
      95% {
        transform: rotateY(315deg);
      }
      100% {
        transform: rotateY(405deg);
      }
    }
  }
`;

export default function CubeAnimation() {
  return (
    <Container>
      <div className="frame">
        <div className="bigCube">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="smallCube">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Container>
  );
}
