import Navbar from "../Navbar/Navbar";
import SimpleImageSlider from "react-simple-image-slider"

const images = [
    { url: "./Coordinator.jpg" },
    { url: "./ENROLLMENT_old.png" },
    { url: "./NPTELMerchandise.jpg" },
    { url: "./portal.png" },
    { url: "./SpecialLiveSeries.jpg" },
  ];
function Home(){

    return (
        <div>
            <Navbar/>
            <SimpleImageSlider
                width={"100%"}
                height={504}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
    );
}

export default Home;