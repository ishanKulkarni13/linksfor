import { socialIcons } from "@/constants/tree";
import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";

export function SocialIcon({ iconName , ...props}) {

  return (
    <>
      {socialIcons[iconName.toLowerCase()] ? (
        React.createElement(socialIcons[iconName.toLowerCase()].icon, props)
      ) : (
        <HiQuestionMarkCircle {...props} />
      )}
    </>
  );

    // return (
    //   <>
    //     {        
    //       (socialIcons[iconName.toLowerCase()] )?
    //       React.createElement(socialIcons[iconName.toLowerCase()].icon):
    //       <HiQuestionMarkCircle/>
    //     }
    //   </>
    // );
  }