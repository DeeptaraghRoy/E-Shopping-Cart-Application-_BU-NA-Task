import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Product from "./Product";
import Row from "react-bootstrap/Row";

const Home = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <Carousel variant="dark" style={{ height: "350px" }}>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://blog.woodenstreet.com/images//data/blog_upload/images/inside-radhika-aptes-simple-contemporary-mumbai-apartment-6.jpg"
                alt="Home Furnishings"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://images.squarespace-cdn.com/content/v1/596cdc3af7e0abe97259bb93/1509124881316-76N3IKKOODQDH70VI0H0/Sophie+sectional+by+Sam+Moore.jpg?format=1000w"
                alt="Home Furnishings"
                height="300px"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://hips.hearstapps.com/hmg-prod/images/spring-2022-trends-1642786776.jpg?crop=1xw:0.999000999000999xh;center,top&resize=640:*"
                alt="Fashion"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://i.ytimg.com/vi/gjrYcDf73cU/maxresdefault.jpg"
                alt="Fashion"
                height="300px"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://www.seasonsway.com/pub/media/catalog/category/mobile_1.jpg"
                alt="Mobiles And Tablets"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://image.pngaaa.com/17/1291017-middle.png"
                alt="Mobiles And Tablets"
                height="300px"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://namrong.com/public/userfiles/services/Electronic-Appliances.jpg"
                alt="Consumer Electronics"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://ace.electronicsforu.com/wp-content/uploads/2018/02/consumer-electronic-products-880x362.jpg"
                alt="Consumer Electronics"
                height="300px"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://bookmafiya.com/wp-content/uploads/2019/11/Buy-Books-upto-90off-.jpg"
                alt="Books"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://s2982.pcdn.co/wp-content/uploads/2022/07/q-2-panorama-picks-2022.jpg.optimal.jpg"
                alt="Books"
                height="300px"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex">
              <img
                className="d-block w-100"
                src="https://www.johnsonsbaby.com.ph/sites/jbaby_ph/files/slide-images/homepage-carousel-banner-1.jpg"
                alt="Baby Product"
                height="300px"
              />
              <img
                className="d-block w-100"
                src="https://m.media-amazon.com/images/I/81xkbcTfyaL._SL1500_.jpg"
                alt="Baby Product"
                height="300px"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </Row>
      <Product />
    </div>
  );
};

export default Home;