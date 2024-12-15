"use client";

import "./file.css";
import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { UploadSimple as UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr/UploadSimple";
import { MicrosoftExcelLogo } from "@phosphor-icons/react/dist/ssr/MicrosoftExcelLogo";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import Typography from "@mui/material/Typography";
import { Modal9 } from "@/components/widgets/modals/modal-9";
import Button from "@mui/material/Button";

export default function FileDrop({ title }) {
  const onFileChange = (files) => {
    // send to firebase
  };

  return (
    <div className="box">
      <Typography
        variant="h4"
        sx={{
          py: { xs: "15px", sm: "20px", md: "25px" },
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
    </div>
  );
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

function DropFileInput(props) {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const isValidFileType = (file) => {
    const validMimeTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return validMimeTypes.includes(file.type) || file.name.endsWith(".csv");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      if (isValidFileType(newFile)) {
        setFileList([newFile]);
        props.onFileChange([newFile]);
      } else {
        setOpenModal(true);
      }
    }
  };

  const fileRemove = () => {
    setFileList([]);
    props.onFileChange([]);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <UploadSimpleIcon />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" onChange={onFileDrop} />
      </div>

      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <div className="drop-file-preview__item">
            <div className="icon-name">
              <MicrosoftExcelLogo />
              <div className="drop-file-preview__item__info">
                <p>{fileList[0].name}</p>
              </div>
            </div>
            <X className="drop-file-preview__item__del" onClick={fileRemove} />
          </div>
        </div>
      )}

      {openModal && <Modal9 setModal={setOpenModal}></Modal9>}
      {openModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            zIndex: 9000,
          }}
          onClick={toggleModal}
        />
      )}
    </>
  );
}
