import React, { useState, useLayoutEffect } from "react";
import "./assets/styles/manifesto.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ref as dbRef, update } from "firebase/database"; // Firebase Realtime Database methods
import { db } from "../../../FirebaseConfig";

const MySwal = withReactContent(Swal);

const ManifestoInput = ({ manifestoText, updateManifesto }) => {
  const [manifesto, setManifesto] = useState(manifestoText);

  const email = useSelector((state) => state.user.email); // Get user's email from Redux state

  const manifestoChange = (ev) => {
    const newManifesto = ev.target.value;
    setManifesto(newManifesto);
  };

  const saveManifestoChanges = () => {
    updateManifesto(manifesto);
  };

  const handleUploadManifesto = async () => {
    try {
      // Update manifesto in Firebase Realtime Database
      const userManifestoRef = dbRef(db, `users/${email}/manifesto`); // Assume users are stored by their email
      await update(userManifestoRef, { manifesto });

      MySwal.fire({
        title: "Manifesto updated",
        icon: "success",
      }).then(() => {
        updateManifesto(manifesto); // Update manifesto state after successful upload
      });
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleUpdateManifesto = (e) => {
    e.preventDefault();
    saveManifestoChanges();
    handleUploadManifesto();
  };

  return (
    <div className="manifesto_update_cont">
      <div className="manifesto_text_cont">
        <span>
          <span>Edit Manifesto</span>
        </span>
      </div>
      <div className="manifesto_input">
        <textarea
          onInput={(e) => manifestoChange(e)}
          className="manifesto_textarea"
          placeholder="How will your governance look like?"
          value={manifesto}
        />
        <button
          onClick={handleUpdateManifesto}
          type="button"
          className="manifesto_submit_btn"
        >
          Save Manifesto
        </button>
      </div>
    </div>
  );
};

const Manifesto = ({ manifestoData, showEditManifesto }) => {
  const [manifesto, setManifesto] = useState();
  const [editManifesto, setEditManifesto] = useState(false);

  useLayoutEffect(() => {
    setManifesto(manifestoData.manifesto);
  }, [manifestoData.manifesto]);

  const enterEditMode = () => {
    setEditManifesto(true);
  };

  const updateManifesto = (newManifesto) => {
    setManifesto(newManifesto);
    setEditManifesto(false);
  };

  return (
    <div className="manifesto_cont">
      {editManifesto ? (
        <ManifestoInput
          manifestoText={manifesto}
          updateManifesto={updateManifesto}
        />
      ) : (
        <div className="manifesto_text_cont">
          <span>
            <span>Manifesto</span>
            {showEditManifesto && (
              <button
                onClick={enterEditMode}
                type="button"
                className="edit_manifesto_btn"
              >
                Edit Manifesto
              </button>
            )}
          </span>
          <div className="manifesto_text">{manifesto}</div>
        </div>
      )}
    </div>
  );
};

export default Manifesto;
