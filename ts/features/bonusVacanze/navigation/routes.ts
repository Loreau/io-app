const BONUSVACANZE_ROUTES = {
  MAIN: "MAIN",

  // Grouping the "Bonus Eligibility Verification" sub-phase
  ELIGIBILITY: {
    CHECK: "BONUS_ELIGIBILITY_CHECK",
    ISEE_NOT_AVAILABLE: "BONUS_ELIGIBILITY_ISEE_NOT_AVAILABLE",
    ISEE_NOT_ELIGIBLE: "BONUS_ELIGIBILITY_ISEE_NOT_ELIGIBLE",
    ACTIVATE_BONUS: "BONUS_ELIGIBILITY_ISEE_NOT_ELIGIBLE",
    TIMEOUT: "BONUS_ELIGIBILITY_TIMEOUT"
  }
};

export default BONUSVACANZE_ROUTES;
