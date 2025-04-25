
import { socialIcons } from "@/constants/tree";
import React from "react";
import { FaQuestion } from "react-icons/fa6";

export function SocialIcon({ iconName = "", ...props }) {
  const key = iconName.toLowerCase();
  const iconData = socialIcons[key] || <FaQuestion />;

  return (
    <span {...props}>
      {iconData.icon}
    </span>
  );
};