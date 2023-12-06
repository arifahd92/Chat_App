import React, { useContext, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { ChatContext } from "../store/chat-context";

const SideList = ({ closeDrawer, modalStatus, setModalStatus }) => {
  const [expanded, setExpanded] = useState(null);
  const {
    adminGroup,
    memberGroup,
    allUser,
    isLoading,
    fetchAllRegisteredUser,
    fetchAdminGroups,
    fetchMemberGroups,
  } = useContext(ChatContext);

  const handleAccordionChange = (panel, type) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded(panel);
    } else {
      setExpanded(null);
    }
  };

  const handleCreateGroup = () => {
    console.log("create a group");
    closeDrawer(false);
    setModalStatus(true);
  };
  const callfetchUser = () => {
    fetchAllRegisteredUser();
  };
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col text-center">
          <div>
            <Accordion
              expanded={expanded === "panel0"}
              onChange={handleAccordionChange("panel0", "YOUR GROUPS")}>
              <AccordionSummary
                onClick={fetchAdminGroups}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel0bh-content"
                id="panel0bh-header">
                <div className="text-center">YOUR GROUPS</div>
              </AccordionSummary>
              <AccordionDetails>
                {!isLoading &&
                  adminGroup.map((itemg, indexg) => (
                    <div
                      className="border border-info-subtle p-2 m-1 pointer"
                      key={itemg.id}>
                      <Link
                        to={`/GROUPS/${itemg.groupName}/${itemg.id}`}
                        style={{ textDecoration: "none" }}>
                        {itemg.groupName}
                      </Link>
                    </div>
                  ))}
                {isLoading && <div>loading...</div>}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1", "FRIENDS GROUP")}>
              <AccordionSummary
                onClick={fetchMemberGroups}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <div className="text-center">FRIENDS GROUP</div>
              </AccordionSummary>
              <AccordionDetails>
                {!isLoading &&
                  memberGroup.map((itemg, indexg) => (
                    <div
                      className="border border-info-subtle p-2 m-1 pointer"
                      key={itemg.id}>
                      <Link
                        to={`/GROUPS/${itemg.groupName}/${itemg.id}`}
                        style={{ textDecoration: "none" }}>
                        {itemg.groupName}
                      </Link>
                    </div>
                  ))}
                {isLoading && <div>loading...</div>}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <div>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleAccordionChange("panel2", "FRIENDS")}>
              <AccordionSummary
                onClick={callfetchUser}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <div className="text-center">FRIENDS </div>
              </AccordionSummary>
              <AccordionDetails>
                {!isLoading &&
                  allUser.map((itemg, indexg) => (
                    <div
                      className="border border-info-subtle p-2 m-1 pointer"
                      key={itemg.id}>
                      <Link
                        to={`/USERS/${itemg.name}/${itemg.id}`}
                        style={{ textDecoration: "none" }}>
                        {itemg.name}
                      </Link>
                    </div>
                  ))}
                {isLoading && <div>loading...</div>}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="rounded-2 bg-success text-white text-center mt-2 p-2">
            <button onClick={() => handleCreateGroup()}>Create Group</button>
          </div>
        </div>
      </div>
      <div className="row" style={{ zIndex: "5" }}></div>
    </div>
  );
};

export default SideList;
