import React from "react";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";

export const socialIcons = {
  instagram: {
    icon: <FaInstagram />,
    name: 'Instagram',
    key: 'instagram',
  },
  telegram: {
    icon: <LiaTelegram />,
    name: 'Telegram',
    key: 'telegram',
  },
  whatsapp: {
    icon: <FaWhatsapp />,
    name: 'Whatsapp',
    key: 'whatsapp',
  },
  github: {
    icon: <FiGithub />,
    name: 'Github',
    key: 'github',
  },
  x: {
    icon: <FaXTwitter />,
    name: 'X',
    key: 'x',
  },
}