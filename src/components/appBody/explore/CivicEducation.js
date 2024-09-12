import React from "react";

function CivicEducation() {
  return (
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Political Knowledge
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            Political knowledge is “the range of factual information about
            politics that is stored in long-term memory” (Delli Carpini &
            Keeter, 1996, p. ... More extensive knowledge about polity,
            politics, and policy is presumed to enable and encourage people to
            participate in politics (Delli Carpini & Keeter, 1996; Galston,
            2001).
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Normative Values
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            Normative generally means relating to an evaluative standard.
            Normativity is the phenomenon in human societies of designating some
            actions or outcomes as good or desirable or permissible and others
            as bad or undesirable or impermissible. <br />
            It is calculated by subtracting the population mean from an
            individual or group raw score and then dividing the difference by
            the population standard deviation.
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Individualistic Civic Behavior
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            is in fact the aspect of developing civic behavior that is based on
            the individualistic perception of citizenship;
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Communal Civic Behavior
          </button>
        </h2>
        <div
          id="collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            regards the behavior that is influenced by the communal citizenship
            school of thought.
          </div>
        </div>
      </div>
      <img
        src="../../../images/iebc.png"
        style={{ backgroundColor: "red", marginTop: 30, width: 400 }}
      />
    </div>
  );
}

export default CivicEducation;
