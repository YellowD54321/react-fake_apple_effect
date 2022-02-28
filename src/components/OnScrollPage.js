import React, { useState } from "react";

function OnScrollPage() {
  const containerTopBackgroundImgList = [];
  for (let i = 0; i < 10; i++) {
    containerTopBackgroundImgList.push(`yes-then-dispear-${i}.png`);
  }
  const [containerTopBackgroundImg, setContainerTopBackgroundImg] = useState(
    containerTopBackgroundImgList[0]
  );
  const containerTopBackgroundImgById = document.getElementById(
    "container-top-background-img"
  );
  const containerTopFeature1 = document.getElementsByClassName(
    "container-top-feature1"
  );
  const containerTopFeature2 = document.getElementsByClassName(
    "container-top-feature2"
  );
  const containerTopFeature3 = document.getElementsByClassName(
    "container-top-feature3"
  );
  const containerTopFeature4 = document.getElementsByClassName(
    "container-top-feature4"
  );
  const containerMiddleBackgroundImg = {
    original: "luffy-poster-changed.png",
    colored: "luffy-poster.png",
  };
  const containerMiddleBackgroundImgById = document.getElementById(
    "container-middle-background-img"
  );
  if (
    !containerTopFeature1 ||
    !containerTopFeature2 ||
    !containerTopFeature3 ||
    !containerTopFeature4
  ) {
    return false;
  }
  containerTopFeature1.scrollPoint = {
    demarcation: 1100,
    scrollUp: 500,
    scrollDown: 1300,
  };
  containerTopFeature2.scrollPoint = {
    demarcation: 1700,
    scrollUp: 1200,
    scrollDown: 1900,
  };
  containerTopFeature3.scrollPoint = {
    demarcation: 2300,
    scrollUp: 1800,
    scrollDown: 2500,
  };
  containerTopFeature4.scrollPoint = {
    demarcation: 2900,
    scrollUp: 2400,
    scrollDown: 3100,
  };

  let allFeatureParagraph = [
    containerTopFeature1,
    containerTopFeature2,
    containerTopFeature3,
    containerTopFeature4,
  ];

  window.addEventListener("scroll", (event) => {
    console.log(window.scrollY);
    const containerSwitchPoint1 = 3400;
    const containerSwitchPoint2 = 4000;
    //top container
    let imgBrightness = 100;
    if (window.scrollY < 1000) {
      //change every image of gif before it finished.
      setContainerTopBackgroundImg(
        containerTopBackgroundImgList[Math.floor(window.scrollY / 100)]
      );
      if (containerTopBackgroundImgById) {
        containerTopBackgroundImgById.style.filter = "brightness(100%)";
      }
    } else {
      //show the last image of gif after it finished.
      setContainerTopBackgroundImg(containerTopBackgroundImgList[9]);
      //decrease brightness and totally black before switching to next container.
      if (window.scrollY < containerSwitchPoint1) {
        imgBrightness = Math.max((-1 * (window.scrollY - 2500)) / 15, 15);
      } else {
        imgBrightness = (-1 * (window.scrollY - containerSwitchPoint1)) / 15;
      }
      if (containerTopBackgroundImgById) {
        containerTopBackgroundImgById.style.filter = `brightness(${imgBrightness}%)`;
      }
    }
    allFeatureParagraph.forEach((eachFeature) => {
      //control opacity when scrolling up or down
      if (window.scrollY < eachFeature.scrollPoint.demarcation) {
        //opacity increasing
        eachFeature[0].style.opacity =
          (window.scrollY - eachFeature.scrollPoint.scrollUp) * 0.005;
      } else {
        //opacity decreasing
        eachFeature[0].style.opacity =
          -(window.scrollY - eachFeature.scrollPoint.scrollDown) * 0.0025;
      }
    });
    //middle container
    if (containerMiddleBackgroundImgById) {
      const fulFillPercent = (window.scrollY - containerSwitchPoint2) / 25;
      //fulfill left to right
      // containerMiddleBackgroundImgById.style.clipPath = `polygon(${fulFillPercent}% 0%, ${fulFillPercent}% 100%, 0% 100%, 0% 0%)`;
      // fulfill top to bottom
      containerMiddleBackgroundImgById.style.clipPath = `polygon(100% ${fulFillPercent}%, 100% 0%, 0% 0%, 0% ${fulFillPercent}%)`;
    }
  });
  return (
    <div>
      <div id="container-top1" className="container container-top">
        <h2 className="container-top-topic">Let's test onScroll</h2>
        <img
          id="container-top-background-img"
          className="background-img"
          src={`./images/${containerTopBackgroundImg}`}
          alt=""
        ></img>
        <div className="feature container-top-feature1">
          <p>Active Noise Cancellation</p>
          <p>for immersive sound.</p>
        </div>
        <div className="feature container-top-feature2">
          <p>Transparency mode for hearing</p>
          <p>what's happening around you.</p>
        </div>
        <div className="feature container-top-feature3">
          <p>A customizable fit</p>
          <p>for all-day comfort.</p>
        </div>
        <div className="feature container-top-feature4">
          <p>Magic like you've never heard.</p>
        </div>
      </div>
      <div className="container container-middle">
        <img
          // id="container-middle-background-img"
          className="poster-img behind-poster-img"
          src={`./images/${containerMiddleBackgroundImg.original}`}
          alt=""
        ></img>
        <img
          id="container-middle-background-img"
          className="poster-img front-poster-img"
          src={`./images/${containerMiddleBackgroundImg.colored}`}
          alt=""
        ></img>
        {/* <h2>Let's test onScroll</h2> */}
      </div>
      <div className="container container-bottom">
        <h2>Let's test onScroll</h2>
      </div>
      <div className="container container-footer">
        <h2>Let's test onScroll</h2>
      </div>
    </div>
  );
}
export default OnScrollPage;
