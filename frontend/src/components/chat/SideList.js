import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const SideList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <div>
            {/* Replace this with your list data */}
            {[
              { title: "GROUPS", details: ["sihoriya", "badganwa"] },
              { title: "USERS", details: ["bakatu", "rizwan"] },
            ].map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}>
                  {/* Render your list item content here */}
                  <div className="text-center">{item.title}</div>
                </AccordionSummary>
                <AccordionDetails>
                  {item.details.map((itemg, indexg) => (
                    <div className="border border-info-subtle p-2 m-1 pointer">
                      <Link
                        to={`/${item.title}/${itemg}/6`}
                        key={indexg}
                        style={{ textDecoration: "none" }}>
                        {itemg}
                      </Link>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div class="rounded-2 bg-success text-white text-center mt-2  p-2">
            <button>Create A Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideList;
