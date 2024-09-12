import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import OdmRulesPdf from "../../../assets/ODM-Nomination-Rules-Final.pdf";

function Pdf() {
  const [, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf">
      <Document file={OdmRulesPdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default Pdf;
