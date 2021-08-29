const Department = require("../department.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

after(() => {
  mongoose.models = {};
});

describe("Department", () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" is too short or too long', () => {
    const cases = ["Abc", "abcd", "Lorem Ipsum, Lorem Ip"];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw no error if "name" correct', () => {
    const cases = ["Abcde", "abcde", "LoremIpsumIp"];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});