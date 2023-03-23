import React from 'react';
export default function Contact() {
  const reg = {
    type: "text",
    required: true,
  }
  const inputs = [
    {
      name: "Name",
      placeholder: "Thelonious Coltrane",
      ...reg,
    },
    {
      name: "Email Address",
      placeholder: "thanks@forTheEmail",
      ...reg,
    },
    {
      ...reg,
      name: "Message For Me",
      placeholder: "Let Me Know anything about you!",
      required: false,
    },
    {
      ...reg,
      type: "checkbox",
      name: "updates",
      label: "Get Summary update emails from me as I post more content",
    },
  ]

  /*
  
     <div>
        <label for="name-input">Name</label>
        <input
          id="name-input"
          type="text"
          name="name"
          placeholder="Jane Doe"
          required
        />
      </div>

  */

  return (
    <form action="" method="POST">
      {inputs.map(({ type, name, label, placeholder, required }) => (
        <div key={`input-${name}`}>
          {type !== "checkbox" && (
            <label htmlFor={`${name}-input`}>{label || name}</label>
          )}
          <input
            id={`${name}-input`}
            type={type}
            name={name}
            placeholder={placeholder || ""}
            required={required}
          />
          {type == "checkbox" && (
            <label htmlFor={`${name}-input`}>{label || name}</label>
          )}
        </div>
      ))}
      <input type="submit" value="Send" />
    </form>
  )
}