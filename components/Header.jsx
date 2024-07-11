import { useState } from "react";
import {
  faGithub,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import OpenModal from "./Modal";

const socialLinks = [
  { icon: faXTwitter, href: "https://x.com/CBitoye82981" },
  { icon: faGithub, href: "https://github.com/PtradeLLC" },
  { icon: faLinkedinIn, href: "https://www.linkedin.com/in/chrisbit/" },
];

const infoList = [
  { label: "Lives in", value: "New York City" },
  { label: "Experience", value: "seasoned" },
  { label: "More about me?", value: "Ask my AI" },
];

const ProfileKeyInfo = ({ onAskAI }) => (
  <div>
    {infoList.map((info, i) => (
      <p className="text-xl mb-0" key={i}>
        <span className="opacity-50 mr-2 font-light">{info.label}</span>
        {info.value === "Ask my AI" ? (
          <button type="button" onClick={onAskAI}>
            <strong className="underline cursor-pointer">{info.value}</strong>
          </button>
        ) : (
          <strong>{info.value}</strong>
        )}
      </p>
    ))}
  </div>
);

const SocialLinks = ({ links }) => (
  <ul className="inline-flex mt-6">
    {links.map((link, i) => (
      <li className="mr-5" key={i}>
        <a
          href={link.href}
          className="text-xl opacity-70 hover:opacity-100 transition duration-300"
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      </li>
    ))}
  </ul>
);

SocialLinks.propTypes = {
  links: PropTypes.array.isRequired,
};

const Hero = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleAskAI = () => {
    setOpenModal(true);
  };

  return (
    <header className="ezy__header8 light md:pb-24 md:pt-8 bg-white text-[#373572]">
      <div className="container px-4 relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 lg:order-2 mb-6 lg:mb-0 text-center lg:text-start">
            <img
              src="/images/profImageTwo.png"
              alt="my image"
              className="max-w-full h-auto border-[20px] border-white shadow-xl dark:border-gray-700 rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30%] rounded-bl-[30%] mx-auto"
            />
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6 xl:pl-12">
            <p className="text-xl leading-normal mb-2 opacity-50">Hello, I'm</p>
            <h2 className="text-3xl leading-none md:text-7xl font-bold mb-6">
              Chris Bitoye
            </h2>
            <p className="text-xl leading-normal opacity-75 mb-2">
              I'm a dynamic Full Stack Engineer with a passion for the NERDS
              stack (Node.js, Express, React, SQL/NoSQL Databases), crafting
              robust, scalable web applications that drive business success.
            </p>
            <div className="mt-12 lg:ml-12 p-4 md:px-12 lg:py-6 border-l">
              <ProfileKeyInfo onAskAI={handleAskAI} />
              <SocialLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <OpenModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </header>
  );
};

export default Hero;
