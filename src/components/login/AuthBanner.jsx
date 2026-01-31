import HandGrow from '../../assets/image/image.png';

const AuthBanner = () => {
  return (
    <div className="text-center text-white max-w-md">
      <div className="mb-8">
        <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-6 inline-block">
          <img
            src={HandGrow}
            alt="Hand Grow Together"
            className="w-48 h-48 rounded-2xl object-cover"
          />
        </div>
      </div>

      <h1 className="text-5xl font-bold mb-3">Hand Grow Together</h1>
      <p className="text-lg text-teal-50">Cùng nhau phát triển và lớn mạnh</p>
    </div>
  );
};

export default AuthBanner;
