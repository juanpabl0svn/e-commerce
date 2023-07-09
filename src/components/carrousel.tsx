import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
  };

  return (
    <article className="bg-slate-400 w-full h-[21rem] grid place-items-center">
      <Slider {...settings} className="w-[18rem]">
        <img src="http://localhost:3000/images/camera.jpeg" alt="camera" />
        <img src="http://localhost:3000/images/iphone.jpeg" alt="camera" />
        <img src="http://localhost:3000/images/ipad.jpeg" alt="camera" />
      </Slider>
    </article>
  );
}
