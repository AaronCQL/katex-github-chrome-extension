import { Messages } from "../../src/utils/constants";

test("Messages object should be immutable", () => {
  function changeExistingKeys() {
    Messages.ROUTE_CHANGED = "changed!";
  }

  function addNewKeys() {
    Messages.NEWLY_ADDED_CONSTANT = "new constant!";
  }

  expect(changeExistingKeys).toThrow(TypeError);
  expect(addNewKeys).toThrow(TypeError);
});
