import { NavLink } from "react-router-dom";

import mindscapeCollections from "../media/mindscapeCollections.png";
import mindscapeSignup from "../media/mindscapeSignup.png";
import mindscapeNav from "../media/mindscapeNav.png";
import mindscapeCreate from "../media/mindscapeCreate.png";
import mindscapeAlbum from "../media/mindscapeAlbum.png";
import mindscapeProfile from "../media/mindscapeProfile.png";
import mindscapeAdmin from "../media/mindscapeAdmin.png";
import aiGenerated from "../media/aiGenerated.jpg";
import AboutHero from "./common/aboutHero";

const About = () => {
  return (
    <>
      {/* Scroll to top button */}
      <a href={"#"} id="scroll-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
      <section className="text-center ">
        {/* Introduction */}
        <AboutHero
          reversed
          image={aiGenerated}
          heading={
            <span>
              Welcome to Art Mind<span className="purple">S</span>cape
            </span>
          }
          paragraph={
            <span>
              "We're thrilled you're here to delve deeper into what makes Art
              Mindscape tick! <br />
              In this section, we're offering all the key details to kickstart
              your collaborative journey with us. <br />
              <br />
              And for those who are already part of our creative family, there's
              always something fresh to discover! <br />
              Let's embark on this shared adventure into the fusion of art and
              technology, shaping the mindscape of art together."
            </span>
          }
          id={"intro"}
          nexRefId={"#navigation"}
        />

        {/* Navigating Art Mindscape */}
        <AboutHero
          image={mindscapeNav}
          heading={
            <span>
              Navigating Art Mind<span className="purple">S</span>cape: Your AI
              Art Guide
            </span>
          }
          paragraph={
            <span>
              Welcome to Art Mindscape, your hub for AI-generated art. <br />
              Access our 'Home' for updates and features, and the 'About' page
              for site info. <br />
              As an 'Editor', manage creations in 'Collection' and make art in
              'Art Generator'. <br />
              Visit the 'Album' to view and like public art. Navigate easily via
              the top navbar and access login, sign up, profile edits, and
              project starts via the user dropdown. <br />
              <br />
              Dive into the intersection of technology and creativity with us!
              More about our AI process in the following sections.
            </span>
          }
          id={"navigation"}
          nexRefId={"#getting-started"}
          prevRefId={"#intro"}
        />

        {/* Getting Started */}
        <AboutHero
          id={"getting-started"}
          prevRefId={"#navigation"}
          nexRefId={"#profile"}
          reversed
          image={mindscapeSignup}
          heading={
            <span>
              Getting Started: Your Journey in Art Mind
              <span className="purple">S</span>cape
            </span>
          }
          paragraph={
            <span>
              To fully engage with our platform, we invite you to sign up via
              our registration page. <br /> As a 'Viewer', you can enjoy the
              mesmerizing AI-generated art and express your admiration through
              likes.
              <br />
              <br />
              Want more? Sign up as an 'Editor' and unleash your creativity.{" "}
              <br /> Editors can create their own unique art pieces, curate
              personal collections, and share their passion with the community.
              <br />
              <br />
              Embark on your Art Mindscape journey today for a seamless,
              interactive, and inspiring art experience.
            </span>
          }
          link={
            <NavLink
              to={"/sign-up-plans"}
              type="button"
              className={`btn btn-primary btn-lg px-3 me-md-2 `}
            >
              Sign-up
            </NavLink>
          }
        />

        {/* Profile Page */}
        <AboutHero
          id={"profile"}
          prevRefId={"#getting-started"}
          nexRefId={"#create=art"}
          image={mindscapeProfile}
          heading={
            <span>
              Profile Page: Customize Your Art Mind
              <span className="purple">S</span>cape Identity
            </span>
          }
          paragraph={
            <span>
              The 'Profile' page, accessible via the user dropdown menu in the
              navbar, is your personal space on Art Mindscape. <br />
              Here, you can edit your avatar, username, and email, personalizing
              your presence on our platform. <br />
              <br />
              The 'Edit' option is clearly indicated near the username and email
              fields - simply click the edit button to make changes. To change
              your avatar, click on the 'Change Avatar' button. <br />
              <br />
              On the 'Profile' page, you control how you present yourself to the
              Art Mindscape community.
            </span>
          }
        />

        {/* Art Generator */}
        <AboutHero
          reversed
          id={"create=art"}
          prevRefId={"#profile"}
          nexRefId={"#collection"}
          image={mindscapeCreate}
          heading={
            <span>Art Generator: Crafting AI Art with Your Unique Touch</span>
          }
          paragraph={
            <span>
              Art creation on Art Mindscape is a unique and interactive process
              using our 'Art Generator'. <br /> As an 'Editor', you can select
              from five distinct AI models - 'Epic Diffusion', 'Steampunk
              Diffusion', 'Stable Diffusion 2.1', 'Synthwave Punk v2', and
              'Emoji Diffusion'.
              <br />
              <br />
              To begin the art generation process, you need to provide a
              creative prompt. You can further customize the result by adjusting
              parameters such as 'Guidance', 'Steps', and 'Upscale', giving you
              extensive control over the final piece.
              <br />
              <br />
              After the AI has worked its magic, you can assign a name to your
              creation and save it to your personal collection. This allows you
              to build your portfolio of AI-generated art right here on Art
              Mindscape. Remember, every piece of art is a journey, and ours
              starts with a single prompt. Let's create together!
            </span>
          }
        />

        {/* Collection */}
        <AboutHero
          id={"collection"}
          prevRefId={"#create=art"}
          nexRefId={"#album"}
          image={mindscapeCollections}
          heading={
            <span>Your Collection: Personal AI Art Portfolio & Workspace</span>
          }
          paragraph={
            <span>
              The 'Collection' page on Art Mindscape is your personal AI art
              portfolio. <br /> As an 'Editor', view, rename, and recall the
              creative prompts for your pieces. <br /> <br />
              This dynamic space also allows you to share your art with the
              world. If a creation no longer fits your portfolio, you can delete
              it. <br />
              <br />
              The 'Collection' page is more than a gallery; it's a space that
              mirrors your evolving journey in AI art.
            </span>
          }
        />

        {/* Album */}
        <AboutHero
          reversed
          id={"album"}
          prevRefId={"#collection"}
          nexRefId={"#web-admin"}
          image={mindscapeAlbum}
          heading={
            <span>Album Page: Browse, Like, and Discover Unique AI Art</span>
          }
          paragraph={
            <span>
              The 'Album' page is your gateway to the myriad of AI-generated art
              on Art Mindscape. <br />
              Here, all users, and even non-users, can view the diverse array of
              art pieces and users can express their admiration through likes.{" "}
              <br />
              <br />
              The search bar at the top allows for quick navigation by creator
              name or creation name. Looking for something specific? Use the
              sort option to toggle between all posts and only those you've
              liked. <br />
              <br />
              When you find a creator whose work resonates with you, click on
              their name to view their shared art posts. This takes you to a
              dedicated page where you can immerse yourself in their AI art
              journey.
            </span>
          }
        />

        {/* Web Admin Dashboard */}
        <AboutHero
          id={"web-admin"}
          prevRefId={"#album"}
          image={mindscapeAdmin}
          heading={
            <span>Web Admin Dashboard: Manage User Roles and Access</span>
          }
          paragraph={
            <span>
              The 'Web Admin Dashboard' is a unique space reserved for our web
              admin user. <br />
              From this dashboard, the web admin can adjust user roles,
              switching them between 'Viewer', 'Editor', and 'Web Admin' as
              necessary. <br />
              <br />
              In addition to these administrative functions, the web admin has
              full access to all website functionalities as an 'Editor'. <br />
              <br />
              This space ensures efficient management of Art Mindscape,
              facilitating a smooth and enjoyable user experience for everyone.
            </span>
          }
        />
      </section>
    </>
  );
};

export default About;
