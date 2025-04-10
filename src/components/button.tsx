"use client";
import Link from "next/link";
import React, { useState } from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  const [t, setText] = useState(text);

  const handleClick = () => {
    console.log("Button clicked!");
    setText("clicked!");
  };

  return (
    <>
      <button className="btn bg-amber-300 w-20" onClick={handleClick}>
        {t}
      </button>
      <Link href={"/"}>link</Link>
    </>
  );
};

export default Button;
