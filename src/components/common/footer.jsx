import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="pt-6 pb-8 text-white bg-neutral-900 ">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Services
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-300 hover:text-gray-300">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-300 hover:text-gray-300">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-300 hover:text-gray-300">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-300 hover:text-gray-300">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
          <div className="text-xs text-center text-neutral-500">
            &copy; 2021 All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
