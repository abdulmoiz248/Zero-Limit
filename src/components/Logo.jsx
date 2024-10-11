import Image from 'next/image';

const LogoComponent = () => {
  return (
    <div className="flex justify-center items-center ">
      <Image 
        src="/images/logo 2.png" 
        width={250} 
        height={250} 
        alt="Logo" 
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default LogoComponent;
