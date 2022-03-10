import React from "react";
import "./aboutSection.css";
import { LinkedIn, GitHub } from "@mui/icons-material"
import { Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom"
import me from "../../../images/me.jpg"
const About = () => {

      return (
            <div className="aboutSection">
                  <div></div>
                  <div className="aboutSectionGradient"></div>
                  <div className="aboutSectionContainer">
                        <Typography component="h1">About Us</Typography>

                        <div>
                              <div>
                                    <Avatar
                                          style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                                          src={me}
                                          alt="Founder"
                                    />
                                    <h3 >Sandeep Shrestha</h3>

                                    <span>
                                          I am very delightful to complete this MERN website. I learned so many things, thanks to <Link to="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw" target="blank">6 Pack Programmer</Link>.
                                    </span>
                              </div>
                              <div className="aboutSectionContainer2">
                                    <Typography component="h2">My Links</Typography>
                                    <a
                                          href="https://github.com/sandeepShr1"
                                          target="blank"
                                    >
                                          <GitHub className="youtubeSvgIcon" />
                                    </a>

                                    <a href="https://www.linkedin.com/in/sandeep-shrestha-1b8504176/" target="blank">
                                          <LinkedIn className="instagramSvgIcon" />
                                    </a>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default About;