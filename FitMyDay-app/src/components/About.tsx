import classes from "./About.module.css";

import aboutImage from "../assets/about-image.jpg";
import ourMission from "../assets/our-mission-image.jpg";
import setsUsApart from "../assets/sets-us-apart-image.jpeg";
import ourApproach from "../assets/our-approach.jpg";
import community from "../assets/community.jpg";

export default function About() {
  return (
    <section className={classes.aboutSection}>
      <div className={classes.aboutDiv}>
        <div className={classes.aboutText}>
          <h1 className={classes.h1}>About us</h1>
          <h1 className={classes.bgHeading}>ABOUT US</h1>

          <p>
            Welcome to FitMyDay, where our passion for health and fitness drives
            everything we do. Established with the aim of empowering individuals
            to lead healthier, happier lives, we are dedicated to providing you
            with the tools, knowledge, and inspiration to reach your fitness
            goals.
          </p>
        </div>

        <img src={aboutImage} alt="man lifting weights" />
      </div>
      <div className={classes.aboutDiv}>
        <img src={ourMission} alt="women stretching" />
        <div className={classes.aboutText}>
          <h1 className={classes.h1}>Our Mission</h1>
          <h1 className={classes.bgHeading}>OUR MISSION</h1>

          <p>
            At FitMyDay, our mission is simple: to make fitness accessible to
            everyone. We believe that everyone deserves the opportunity to live
            a healthy lifestyle, regardless of their background, fitness level,
            or resources. Through our comprehensive resources, personalized
            guidance, and supportive community, we strive to remove barriers and
            make fitness a sustainable and enjoyable part of your life.
          </p>
        </div>
      </div>
      <div className={classes.aboutDiv}>
        <div className={classes.aboutText}>
          <h1 className={classes.h1}>What Sets Us Apart</h1>
          <h1 className={classes.bgHeading}>WHAT SETS US APART</h1>

          <p>
            We understand that embarking on a fitness journey can be
            overwhelming, which is why we're here to guide you every step of the
            way. Unlike other fitness platforms, we prioritize individualized
            support and tailored solutions. Our team of experienced fitness
            professionals and certified trainers are committed to helping you
            achieve your unique goals.
          </p>
        </div>

        <img src={setsUsApart} alt="two people talking in the gym" />
      </div>
      <div className={classes.aboutDiv}>
        <img src={ourApproach} alt="women eating healthy" />
        <div className={classes.aboutText}>
          <h1 className={classes.h1}>Our Approach</h1>
          <h1 className={classes.bgHeading}>OUR APPROACH</h1>

          <p>
            At FitMyDay, we believe in a holistic approach to fitness that
            encompasses not only physical exercise but also nutrition, mental
            health, and lifestyle factors. We offer a wide range of resources,
            including workout plans, meal plans, educational articles, and
            motivational content, to support you in every aspect of your
            journey. Whether you prefer to work out at home, in the gym, or
            outdoors, we provide flexible options that fit your lifestyle and
            preferences.
          </p>
        </div>
      </div>
      <div className={classes.aboutDiv}>
        <div className={classes.aboutText}>
          <h1 className={classes.h1}>Our Community</h1>
          <h1 className={classes.bgHeading}>OUR COMMUNITY</h1>

          <p>
            One of the greatest strengths of FitMyDay is our vibrant and
            supportive community. We believe that accountability, encouragement,
            and camaraderie are essential components of a successful fitness
            journey. Our online community platform allows you to connect with
            like-minded individuals, share experiences, celebrate achievements,
            and find inspiration when you need it most.
          </p>
        </div>

        <img src={community} alt="people taking a picture" />
      </div>
    </section>
  );
}
