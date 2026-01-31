const AuthLayout = ({ left, right }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {left}
      <div className="w-full lg:w-1/2 bg-[#3CC18E] flex flex-col items-center justify-center p-8 relative rounded-tl-[50px] rounded-bl-[50px]">
        {right}
      </div>
    </div>
  );
};

export default AuthLayout;
