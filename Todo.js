const { v4: uuidv4 } = require("uuid");

class Todo {
  _id = uuidv4();
  constructor(taske, notee, isCompletedd, frequencyy) {
    this.task = taske;
    this.note = notee;
    this.isCompleted = isCompletedd;
    this.frequency = frequencyy;
  }

  getId() {
    return this._id;
  }

  getTask() {
    return this.task;
  }

  getNote() {
    return this.note;
  }

  getIsCompleted() {
    return this.isCompleted;
  }

  getFrequency() {
    return this.frequency;
  }

  setId(val) {
    this._id = val;
  }

  setTask(val) {
    this.task = val;
  }

  setNote(val) {
    this.note = val;
  }

  setIsCompleted(val) {
    this.isCompleted = val;
  }
}

module.exports = Todo;
