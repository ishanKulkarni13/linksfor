// import { socialIcons } from "@/constants/tree";
// import React from "react";
// import { HiQuestionMarkCircle } from "react-icons/hi";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export function SocialIcon({ iconName, ...props }) {
//   const IconComponent = socialIcons[iconName.toLowerCase()] 
//     ? FontAwesomeIcon 
//     : HiQuestionMarkCircle;

//   const iconProps = socialIcons[iconName.toLowerCase()] 
//     ? { icon: socialIcons[iconName.toLowerCase()].icon } 
//     : {};

//   return (
//     <IconComponent {...props} {...iconProps} />
//   );
// }

// -------------------------------------

import { socialIcons } from "@/constants/tree";
import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SocialIcon({ iconName = "", ...props }) {
  const key = iconName.toLowerCase();
  const match = socialIcons[key];

  // Choose component and prop‑shape
  const Component = match ? FontAwesomeIcon : HiQuestionMarkCircle;
  const extra    = match ? { icon: match.icon } : {};

  return <Component {...extra} {...props} />;
}

// --------------------------------

