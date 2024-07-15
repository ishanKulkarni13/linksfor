import React from "react";

//icons
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { HiQuestionMarkCircle } from "react-icons/hi";

export function SocialIcon({ iconName }) {

  
 const socialIcons = {
  instagram: FaInstagram,
  'telegram': FaTelegram,
  'snapchat': FaSnapchatGhost,
  'github': FaGithub ,
  'twitter': FaTwitter,
  'whatsapp': IoLogoWhatsapp,
  'facebook': FaFacebook,
  linkedin: FaLinkedin,
  reddit: FaReddit,
  discord: FaDiscord,

}

    return (
      <>
        {        
          (socialIcons[iconName.toLowerCase()] )?
          React.createElement(socialIcons[iconName.toLowerCase()]):
          <HiQuestionMarkCircle/>
        }
      </>
    );
  }