const itemsArray = [];
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursor.offsetWidth / 2,
    y: e.clientY - cursor.offsetHeight / 2,
    duration: 0.5,
    ease: "power2.out",
  });
});

document.addEventListener("click", function (event) {
  const clickSound = new Audio("./assets/click-sfx.mp3");
  clickSound.play();

  const itemType = Math.random() < 0.5 ? "video" : "image";
  let container = document.createElement("div");
  let elementWidth = 700;

  if (itemType === "video") {
    const videoNumber = Math.floor(Math.random() * 7) + 1;
    container.innerHTML = `<div class="video-container">
                                 <video autoplay loop>
                                   <source src="./assets/vid-${videoNumber}.mp4" type="video/mp4"/>
                                 </video>
                               </div>`;
  } else {
    const imgNumber = Math.floor(Math.random() * 6) + 1;
    container.innerHTML = `<div class="img-container">
                                 <img src="./assets/img-${imgNumber}.jpg" alt="" />
                               </div>`;
  }

  const appendedElement = container.firstChild;
  document.querySelector(".items-container").appendChild(appendedElement);

  appendedElement.style.left = `${event.clientX - elementWidth / 2}px`;
  appendedElement.style.top = `${event.clientY}px`;
  const randomRotation = Math.random() * 10 - 5;

  gsap.set(appendedElement, {
    scale: 0,
    rotation: randomRotation,
    transformOrigin: "center",
  });

  const tl = gsap.timeline();

  const randomScale = Math.random() * 0.5 + 0.5;
  tl.to(appendedElement, {
    scale: randomScale,
    duration: 0.5,
    delay: 0.1,
  });

  tl.to(
    appendedElement,
    {
      y: () => `-=500`,
      opacity: 1,
      duration: 4,
      ease: "none",
    },
    "<"
  ).to(
    appendedElement,
    {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        appendedElement.parentNode.removeChild(appendedElement);
        const index = itemsArray.indexOf(appendedElement);
        if (index > -1) {
          itemsArray.splice(index, 1);
        }
      },
    },
    "-=0.5"
  );
});
