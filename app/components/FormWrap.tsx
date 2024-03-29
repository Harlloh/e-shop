import React from "react";

function FormWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-fit h-full flex-center justify-center pb-12 pt-24">
      <div className="max-w-[650px] w-full flex flex-col gap-6 items-center shadow-xl shadow-slate-200 rounded-md p-4 md:p-8 m-auto">
        {children}
      </div>
    </div>
  );
}

export default FormWrap;
