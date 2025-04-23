// import { socialIcons } from "@/constants/tree";
// import React from "react";
// import { HiQuestionMarkCircle } from "react-icons/hi";

// export function SocialIcon({ iconName , ...props}) {

//   return (
//     <>
//       {socialIcons[iconName.toLowerCase()] ? (
//         React.createElement(socialIcons[iconName.toLowerCase()].icon, props)
//       ) : (
//         <HiQuestionMarkCircle {...props} />
//       )}
//     </>
//   );
//   }

import { socialIcons } from "@/constants/tree";
import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SocialIcon({ iconName, ...props }) {
  const IconComponent = socialIcons[iconName.toLowerCase()] 
    ? FontAwesomeIcon 
    : HiQuestionMarkCircle;

  const iconProps = socialIcons[iconName.toLowerCase()] 
    ? { icon: socialIcons[iconName.toLowerCase()].icon } 
    : {};

  return (
    <IconComponent {...props} {...iconProps} />
  );
}
