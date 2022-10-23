import React from "react";

export const AddPersonForm = ({
  submitHandler,
  nameHandler,
  numberHandler,
  name,
  number,
  handleNotificationVisibility,
}) => {
  //handleNotificationVisibility(`${name} was added to the phonebook.`);

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameHandler} value={name} />
          <br />
          number: <input onChange={numberHandler} value={number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
