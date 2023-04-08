import "./landingpage.css";
import heroimg from "./img/hero-img.png.png";
import LandingPageProducts from "../../components/landingpage-products/LandingPageProducts";
import Typewriter from "typewriter-effect";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getProductsByName } from "../../service/api/getProductCustom";
import getProducts from "../../service/api/GetProduct";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const [limitLoad, setLimitLoad] = useState(3);

  const [getSearch, { loading: loadingSearch, data: dataSearch }] =
    useLazyQuery(getProductsByName);

  const [getLoadMore, { loading: loadingLoadMore, data: dataLoadMore }] =
    useLazyQuery(getProducts);

  useEffect(() => {
    handleLoadMore();
  }, [limitLoad]);

  const handleSearch = () => {
    getSearch({
      variables: {
        match: `%${search}%`,
      },
    });
  };

  const handleLoadMore = () => {
    getLoadMore({
      variables: {
        limit: limitLoad,
      },
    });
  };

  return (
    <>
      <div className="container-content">
        <div className="content-tag">
          <div className="content-text">
            <h1 className="font-semibold">
              {" "}
              <Typewriter
                options={{
                  strings: ["Better Solutions For Your Business"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p>
              We are team of talented designers making websites with Bootstrap
            </p>
          </div>
          <div className="content-button">
            <button
              className="btn-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Get Started
            </button>
            <button className="btn-2">Watch Video</button>
          </div>
        </div>
        {/* Image Figma */}
        <div className="img-svg">
          <img src={heroimg} alt="" />
        </div>
      </div>

      <section>
        <h1 className="text-4xl font-semibold text-[#37517E] px-20 mt-16 text-center">
          PRODUCTS LIST
        </h1>
        <div className="flex justify-center mt-10">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="ring-1 ring-gray-200 shadow-md mx-auto w-[34rem] py-2 px-3
             rounded-lg "
              placeholder="Search Product..."
            />

            <MagnifyingGlassIcon
              onClick={handleSearch}
              className="h-6 w-6 absolute right-0 top-0 mt-2 mr-4 text-gray-500 cursor-pointer"
            />
          </div>
        </div>
        <div className="px-20 py-16 mb-14">
          <LandingPageProducts
            searchProduct={dataSearch?.product}
            loadingSearch={loadingSearch}
            dataProduct={dataLoadMore?.product}
          />
          <div className="flex justify-end">
            <button
              onClick={() => setLimitLoad(limitLoad + 3)}
              className="bg-[#37517E] text-white font-semibold px-4 py-2 rounded-lg"
            >
              {loadingLoadMore ? "Loading..." : " Load More"}
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container-newsletter">
          <div className="newsletter-text-1">
            <h2>Join Our Newsletter</h2>
            <p>
              Tamen quem nulla quae legam multos aute sint culpa legam noster
              magna
            </p>
            <form>
              <input className="input-subscribe" type="text" />
              <button className="btn-subscribe">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <div className="info-arsha">
            <div className="info-arsha-text">
              <h1>Arsha</h1>
              <div className="container-alamat">
                <p>A108 Adam Street</p>
                <div style={{ marginTop: "-10px", maxWidth: 1000 }}>
                  <p className="p-alamat">New York, NY 535022</p>
                  <p className="p-alamat" style={{ marginTop: "-10px" }}>
                    United States
                  </p>
                </div>
              </div>
            </div>
            <div className="arsha-contact" style={{ marginTop: 30 }}>
              <p>
                <span>Phone : </span> +1 5589 55488 55
              </p>
              <p style={{ marginTop: "-10px" }}>
                <span>Email : </span>info@example.com
              </p>
            </div>
          </div>
          <div className="for-3-heading">
            <h2>Useful Link</h2>
            <div className="for-3-container">
              <p>Home</p>
              <p>About us</p>
              <p>Services</p>
              <p>Terms of service</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="for-3-heading">
            <h2>Our Services</h2>
            <div className="for-3-container">
              <p>Web Design</p>
              <p>Web Development</p>
              <p>Product Management</p>
              <p>Marketing</p>
              <p>Graphic Design</p>
            </div>
          </div>
          <div className="for-3-container-social">
            <h2>Our Social Networks</h2>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra videa magna
              derita valies
            </p>
            <div className="social-media">
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom ">
          <p className="mt-4">
            © Copyright <b>Arsha</b>. All Rights Reserved
          </p>
          <p id="made" className="mt-3">
            Designed by <span>BootstrapMade</span>
          </p>
        </div>
      </footer>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Selamat Datang
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">Selamat Datang Di webiste kami</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
