module.exports = {
  default: {
    require: ["tests/steps/**/*.ts", "tests/support/**/*.ts"],
    publishQuiet: true,
    format: ["progress", "html:reports/cucumber-report.html"],
    paths: ["tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    parallel: 1,
  },
};
