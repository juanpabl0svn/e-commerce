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
    <article className="bg-black w-60 grid place-items-center">
      <Slider {...settings} className="w-40">
        <img src="http://localhost:3000/images/camera.jpeg" alt="camera" />
        <img src="http://localhost:3000/images/iphone.jpeg" alt="camera" />
        <img src="http://localhost:3000/images/ipad.jpeg" alt="camera" />
      </Slider>
    </article>
  );
}
