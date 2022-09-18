import React from "react";
import PageHead from "../src/components/PageHead";
import Amount from "../src/components/Amount";
import Budgeting from "../src/components/Budgeting";
import Categories from "../src/components/Categories";
import axios from "axios";

export default function welcomeWizard({ categories }) {
  const [formStep, setFormStep] = React.useState(0);
  
  return (
    <>
      <PageHead title="Welcome Wizard" />
      <div className="signup container">
        <img
          className="hero-logo"
          src="/images/logo.png"
          alt="coin tracker logo"
        />

        <h1 className="welcoming-title">welcome</h1>

        {formStep == 0 && <Amount nextStep={setFormStep} />}
        {formStep == 1 && (
          <Categories nextStep={setFormStep} categories={categories} />
        )}
        {formStep == 2 && <Budgeting />}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const url = "http://localhost:5001/categories";
  const response = await axios.get(url);
  const categories = await response.data;

  return {
    props: {
      categories,
    },
  };
};
