import React from "react";
import "./style.css";
import CarImg from "./crs.png";
import Layout from "./Layout";
function Home() {
  return (
    <>
      <Layout className="mb-48">
        <section class="home" id="home">
          <h3 data-speed="-2" class="home-parallax">
            Find your favorite car here
          </h3>

          <img data-speed="5" class="home-parallax" src={CarImg} alt="" />
        </section>

        <section class="contact" id="contact">
          <h1 class="heading">
            <span>contact</span> us
          </h1>

          <div class="row">
            <form action="">
              <h3>Get in touch</h3>
              <input type="text" placeholder="Your name" class="box" />
              <input type="email" placeholder="Your email" class="box" />
              <input type="text" placeholder="Subject" class="box" />
              <textarea
                placeholder="Message...."
                class="box"
                cols="30"
                rows="10"
              ></textarea>
              <input type="submit" value="Submit" class="btn" />
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Home;
