import { useSelector } from "react-redux";
import HeroSvg from "./HeroSvg";

const Hero = () => {
  const { title, description } = useSelector((state) => {
    return {
      title: state.languages.titleChange,
      description: state.languages.descriptionChange,
    };
  });

  return (
    <section className="mt-5 text-center">
      <div className="row" style={{ maxWidth: "100%" }}>
        <div className="col">
          <div className="flex justify-center">
            <HeroSvg />
          </div>
          <div className="w-50 mx-auto mt-3">
            <h1 className="text-3xl font-semibold mb-3">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
