import React from "react";
import styled from "styled-components";
import Image from "next/image"; 


const Card = () => {


  return (
    <StyledWrapper>
      <div className="card">
        <div className="border" />
        <div className="content">
          <div className="logo">
            <div className="logo1">
           
              <Image
                src="/images/Lion.JPG"
                alt="lion logo"
                width={100}
                height={100}
                objectFit="contain"
               // priority={true} 
              />
              <Image
                src="/images/logo.png"
                alt="Zero Limit logo"
                width={200}
                height={200}
                objectFit="contain"
                className="zero-limit bg-white"
              />
            </div>
            <span className="trail" />
          </div>
        </div>
        <span className="bottom-text text-center">Beyond boundaries Wear your freedom</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 200px;
    background: #ffffff;
    position: relative;
    display: grid;
    place-content: center;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .border {
    position: absolute;
    inset: 0;
    border: 2px solid black;
    opacity: 0;
    transform: rotate(10deg);
    transition: all 0.5s ease-in-out;
  }

  .bottom-text {
    position: absolute;
    left: 50%;
    bottom: 13px;
    transform: translateX(-50%);
    font-size: 6px;
    text-transform: uppercase;
    padding: 0 5px;
    color: white;
    background: #243137;
    opacity: 0;
    letter-spacing: 7px;
    transition: all 0.5s ease-in-out;
  }

  .content {
    transition: all 0.5s ease-in-out;
  }

  .content .logo {
    height: 100px;
    width: 100px;
    position: relative;
    overflow: hidden;
    transition: all 1s ease-in-out;
  }

  .content .logo .logo1 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .zero-limit {
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .card:hover {
    border-radius: 0;
    transform: scale(1.1);
  }

  .card:hover .zero-limit {
    opacity: 1;
  }

  .card:hover .border {
    inset: 15px;
    opacity: 1;
    transform: rotate(0);
  }

  .card:hover .bottom-text {
    letter-spacing: 3px;
    opacity: 1;
  }

  .card:hover .trail {
    animation: trail 1s ease-in-out;
  }

  @keyframes trail {
    0% {
      background: linear-gradient(
        90deg,
        rgba(189, 159, 103, 0) 90%,
        rgb(189, 159, 103) 100%
      );
      opacity: 0;
    }
    30% {
      background: linear-gradient(
        90deg,
        rgba(189, 159, 103, 0) 70%,
        rgb(189, 159, 103) 100%
      );
      opacity: 1;
    }
    70% {
      background: linear-gradient(
        90deg,
        rgba(189, 159, 103, 0) 70%,
        rgb(189, 159, 103) 100%
      );
      opacity: 1;
    }
    95% {
      background: linear-gradient(
        90deg,
        rgba(189, 159, 103, 0) 90%,
        rgb(189, 159, 103) 100%
      );
      opacity: 0;
    }
  }
`;

export default Card;
