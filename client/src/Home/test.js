import React from "react";
import "./PrivacyPolicy.css"; // You can create a PrivacyPolicy.css file for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy</h2>
      <p>
        <strong>EFFECTIVE: FEBRUARY 1, 2022</strong>
      </p>
      <p>
        At Loupe, we take your privacy seriously. Please read this Privacy
        Policy to learn how we treat your personal data. By using or accessing
        our Services in any manner, you acknowledge that you accept the
        practices and policies outlined below, and you hereby consent that we
        will collect, use and share your information as described in this
        Privacy Policy.
      </p>
      <p>
        Remember that your use of Loupe's Services is at all times subject to
        our Terms of Use, which incorporates this Privacy Policy. Any terms we
        use in this Policy without defining them have the definitions given to
        them in the Terms of Use.
      </p>
      {/* Add the rest of the content here */}
    </div>
  );
};

export default PrivacyPolicy;
