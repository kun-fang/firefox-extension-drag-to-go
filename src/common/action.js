export class Action {

  constructor(name, action_function) {
    this.name = name;
    this.action_function = action_function;
    this.element = null;
  }

  setTarget(target) {
    this.element = target;
    return this;
  }

  action() {
    return this.action_function();
  }
}
