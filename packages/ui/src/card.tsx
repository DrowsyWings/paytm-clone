import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div className=" p-6 bg-gradient-to-r from-indigo-200 to-sky-100 border border-indigo-200 rounded-xl ">
        <h1 className="text-xl border-b pb-2">{title}</h1>
        <p>{children}</p>
      </div>
    </>
  );
}
